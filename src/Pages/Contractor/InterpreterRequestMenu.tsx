import { useEffect, useState, useRef, MutableRefObject } from "react";
import io from "socket.io-client";
import ringtone from "../../components/ringtone.mp3";
import { apiUrl } from "../../apiUrl.js";
import MenuHeader from "../../components/LV3/Header/MenuHeader/MenuHeader.js";
import RadioButtonGroupRound from "../../components/LV1/RadioButton/RadioButtonGroupRound.js";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n.js";
import ButtonAtom from "../../components/LV1/ButtonAtom/ButtonAtom.js";
import { Box } from "@mui/material";
import classes from "../../styles/ContractorEntities.module.scss";
import { LanguageApiService } from "../../api/apiService/languages/languages-api-service.js";
import { LanguageInfo } from "../../types/LanguageTypes.js";
import { ZoomMtg } from "@zoom/meetingsdk";
import { CallLogApiService } from "../../api/apiService/callLog/callLog-api-service.js";

const socket = io(apiUrl);

function UserMenu() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const callDialRef = useRef<Date | null>(null);
  const callStartRef = useRef<Date | null>(null);
  const isCallEndedRef = useRef<boolean>(false);
  const isCallAcceptedRef = useRef<boolean>(false);
  const isCallRejectedRef = useRef<boolean>(false);
  const isCallCanceledRef = useRef<boolean>(false);
  const interpreterNoRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const contractorNo = Number(sessionStorage.getItem("contractorNo"));
  const [ringingTime, setRingingTime] = useState(0);
  const intervalRef: MutableRefObject<number | null> = useRef(null);

  const [selectedLanguageNo, setSelectedLanguageNo] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "1";
  });
  let meetingEnded = false;

  // Function to start a Zoom meeting
  const startMeeting = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: `${
        import.meta.env.VITE_REACT_APP_URL
      }/Contractor/InterpretRequest`,
      loginWindow: {
        width: "100", // Set your desired width as a string
        height: "380", // Set your desired height as a string
      },
      patchJsMedia: true,
      leaveOnPageUnload: true,
      isSupportChat: false,
      success: (success: unknown) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
          meetingNumber: "7193586721",
          passWord: "B0h6vX",
          userName: "join",

          success: (success: unknown) => {
            console.log(success);
            ZoomMtg.inMeetingServiceListener("onUserJoin", function () {
              callStartRef.current = new Date();
            });

            // Adding event listener for when the meeting ends
            ZoomMtg.inMeetingServiceListener("onUserLeave", function () {
              if (meetingEnded) {
                return;
              }
              meetingEnded = true;

              let rating: number | null = null;
              let input = prompt("Enter a number between 1 and 5:");

              rating =
                input !== null && !isNaN(Number(input)) && input.trim() !== ""
                  ? Number(input)
                  : null;

              // Create a call log entry when the user leaves the meeting
              try {
                CallLogApiService.createCallLog(
                  interpreterNoRef.current,
                  Number(selectedLanguageNo),
                  contractorNo,
                  callDialRef.current,
                  null,
                  callStartRef.current,
                  new Date(),
                  "callAccepted",
                  rating
                );
                isCallEndedRef.current = true;
              } catch (error) {
                console.error("Error saving callLog:", error);
              }
            });
          },

          error: (error: unknown) => {
            console.log(error);
          },
        });
      },
      error: (error: unknown) => {
        console.log(error);
      },
    });
  };

  const { t, i18n } = useTranslation();
  const [selectLanguage, setSelectLanguage] = useState<
    { label: string; value: string | number }[]
  >([]);

  // Function to fetch all available languages
  const fetchLanguagesAllNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAllNames();
      response = response.sort(
        (a: any, b: any) => a.languages_support_no - b.languages_support_no
      );
      response = response.map((item: LanguageInfo) => ({
        label: item.language_name, // Map 'language_name' to 'label'
        value: String(item.languages_support_no), // Map 'languages_support_no' to 'value'
      }));

      setSelectLanguage(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const languageMap: Record<string, string> = Object.fromEntries(
    ["1", "2", "3"].map((num) => [num, num])
  );

  // Handle radio button changes to select language
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(18999, event.target.value);
    setSelectedLanguageNo(event.target.value);

    // Get the corresponding language from the map, default to "ja" if not found
    const selectedLanguage = languageMap[event.target.value] || "ja";

    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", event.target.value); // Save to localStorage
  };

  // Cleanup before unloading the page, saving call logs if necessary
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isCallEndedRef.current && callStartRef.current) {
        CallLogApiService.createCallLog(
          interpreterNoRef.current,
          Number(selectedLanguageNo),
          contractorNo,
          callDialRef.current,
          null,
          callStartRef.current,
          new Date(),
          "callAccepted",
          null
        );
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callStartRef.current]);

  // Fetch languages on component mount
  useEffect(() => {
    fetchLanguagesAllNames();
  }, []);

  // Retrieve the selected language from localStorage on mount
  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
      setSelectedLanguageNo(selectedLanguage);
    }
  }, []);

  // Handle rejected interpreter response
  useEffect(() => {
    const handleInterpreterResponseReject = (data: any) => {
      if (data.contractorNo === contractorNo && data.response === "rejected") {
        isCallRejectedRef.current = true;
        stopRingtone();
        try {
          CallLogApiService.createCallLog(
            data.interpreterNumber,
            Number(selectedLanguageNo),
            contractorNo,
            new Date(),
            null,
            null,
            null,
            "rejected",
            null
          );
        } catch (error) {
          console.error("Error saving callLog:", error);
        }
      }
    };

    socket.on("interpreterServerResponse", handleInterpreterResponseReject);

    return () => {
      socket.off("interpreterServerResponse", handleInterpreterResponseReject);
    };
  }, [contractorNo]);

  // Handle accepted interpreter response
  useEffect(() => {
    socket.on("interpreterServerResponse", (data) => {
      if (data.contractorNo == contractorNo && data.response == "accepted") {
        isCallAcceptedRef.current = true;
        interpreterNoRef.current = Number(data.interpreterNumber);
        stopRingtone();
        startMeeting(data.signature.signature);
      }
    });
  }, [contractorNo]); // Only re-run if contractorNo changes

  // Function to handle button press for playing the ringtone
  const playRingtone = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true); // Set state to indicate ringtone is playing
    }

    // Start the interval to count ringing time in milliseconds
    intervalRef.current = window.setInterval(() => {
      setRingingTime((prevTime) => prevTime + 10); // Increment by 10 ms
    }, 10);

    // Automatically stop ringtone after 10 seconds
    setTimeout(() => {
      console.log(155, callDialRef.current);
      if (
        !isCallAcceptedRef.current &&
        !isCallRejectedRef.current &&
        !isCallCanceledRef.current
      ) {
        stopRingtone();
        callTimeUp();
      }
    }, 10000); // 10 seconds (10,000 ms)
  };

  // Function to stop the ringtone
  const stopRingtone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback to the start
      setIsPlaying(false); // Set state to indicate ringtone has stopped
    }

    // Stop the interval and reset ringing time
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRingingTime(0);
  };

  // Function to handle call time-out scenario
  const callTimeUp = () => {
    const data = {
      contractorNo: contractorNo,
    };
    socket.emit("cancelCallRequest", data);
    try {
      CallLogApiService.createCallLog(
        interpreterNoRef.current,
        Number(selectedLanguageNo),
        contractorNo,
        callDialRef.current,
        null,
        null,
        null,
        "callTimeUp",
        null
      );
    } catch (error) {
      console.error("Error saving callLog:", error);
    }
    stopRingtone();
  };

  // Function to cancel the call
  const callCancel = () => {
    console.log("Call terminated", new Date().toISOString());
    const data = {
      contractorNo: contractorNo,
    };
    socket.emit("cancelCallRequest", data);
    isCallCanceledRef.current = true;
    try {
      CallLogApiService.createCallLog(
        interpreterNoRef.current,
        Number(selectedLanguageNo),
        contractorNo,
        callDialRef.current,
        new Date(),
        null,
        null,
        "callCanceled",
        null
      );
    } catch (error) {
      console.error("Error saving callLog:", error);
    }
    stopRingtone();
  };

  // Function to handle the call request process
  const callRequest = async () => {
    if (!selectedLanguageNo) {
      alert("Please select a language before joining a meeting.");
      return;
    }
    isCallCanceledRef.current = false;
    isCallAcceptedRef.current = false;
    isCallEndedRef.current = false;
    isCallRejectedRef.current = false;
    callStartRef.current = null;
    interpreterNoRef.current = null;
    playRingtone();
    callDialRef.current = new Date();

    const data = {
      meetingNumber: "7193586721",
      contractorNo: contractorNo,
      languageSupportNo: Number(selectedLanguageNo),
    };
    // Emit the 'dataFromFrontend' event to the server
    socket.emit("callRequest", data);
  };

  // Function to format the time in minutes, seconds, and milliseconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // Display only two digits for milliseconds

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <Box>
      <MenuHeader title="通訳希望者メニュー" />
      <RadioButtonGroupRound
        options={selectLanguage}
        selectedValue={selectedLanguageNo}
        onChange={handleRadioChange}
        name="options"
      />

      <Box className={classes.userMessage}>
        {t("InterpretationRequestMessage")}
      </Box>
      <Box className={classes.userCallRow}>
        <ButtonAtom
          onClick={() => {
            callRequest();
          }}
          label="Call"
          width="50px"
          disabled={isPlaying}
          padding="16px"
        />
        <ButtonAtom
          onClick={() => {
            callCancel();
          }}
          label="Terminate"
          width="100px"
          disabled={!isPlaying}
          padding="16px"
        />
        <p className={classes.timer}>{formatTime(ringingTime)}</p>

        {/* Hidden audio element that plays the ringtone */}
        <audio ref={audioRef} src={ringtone} />
      </Box>
    </Box>
  );
}

export default UserMenu;
