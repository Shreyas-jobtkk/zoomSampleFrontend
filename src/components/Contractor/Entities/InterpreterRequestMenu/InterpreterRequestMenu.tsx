import { useEffect, useState, useRef, MutableRefObject } from "react";
import io from "socket.io-client";
import ringtone from "../../../ringtone.mp3";
import { apiUrl } from "../../../../apiUrl.js";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader.js";
import RadioButtonGroupRound from "../../../LV1/RadioButton/RadioButtonGroupRound.js";
import { useTranslation } from "react-i18next";
import "../../../../i18n/i18n.js";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom.js";
import { Box } from "@mui/material";
import classes from "../styles/ContractorEntities.module.scss";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { ZoomMtg } from "@zoom/meetingsdk";
import { CallLogApiService } from "../../../../api/apiService/callLog/callLog-api-service";

const socket = io(apiUrl);

function UserMenu() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const callDialRef = useRef<Date | null>(null);
  let callStartRef = useRef<Date | null>(null);
  const isCallEndedRef = useRef<boolean>(false);
  const isCallAcceptedRef = useRef<boolean>(false);
  const isCallRejectedRef = useRef<boolean>(false);
  const isCallCanceledRef = useRef<boolean>(false);
  const contractorNo = Number(sessionStorage.getItem("contractorNo"));
  const interpreterNoRef = useRef<number | null>(null);
  // const [interpreterNo, setInterpreterNo] = useState<number | null>(null);
  const [selectedLanguageNo, setSelectedLanguageNo] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "1";
  });
  let meetingEnded = false;

  const startMeeting = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    // let zoomCallStart: null | Date;
    // let interpreterNo: null | number = interpreterNoRef.current;

    ZoomMtg.init({
      leaveUrl: `${import.meta.env.VITE_REACT_APP_URL}/ContractorCallingMenu`,
      loginWindow: {
        width: "100", // Set your desired width as a string
        height: "380", // Set your desired height as a string
      },
      patchJsMedia: true,
      leaveOnPageUnload: true,
      isSupportChat: false,
      success: (success: unknown) => {
        // alert("You have successfully joined the meeting!");
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
          meetingNumber: "7193586721",
          passWord: "B0h6vX",
          userName: "join",

          success: (success: unknown) => {
            console.log(success);
            console.log(189, ZoomMtg.inMeetingServiceListener.toString());
            console.log(133, Object.keys(ZoomMtg.inMeetingServiceListener));
            console.log(
              144,
              sessionStorage.getItem("s3.pg.isSupportInMeetingListener")
            );

            ZoomMtg.inMeetingServiceListener("onUserJoin", function () {
              // zoomCallStart = new Date();
              // setCallStart(new Date());
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

              console.log(2787, interpreterNoRef.current);

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
                // setCallDial(null);
                // callDialRef.current = null;
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

  const fetchLanguageNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAll();

      console.log(102177, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name, // Map 'language_name' to 'label'
        value: String(item.languages_support_no), // Map 'languages_support_no' to 'value'
      }));

      setSelectLanguage(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(18999, event.target.value);
    setSelectedLanguageNo(event.target.value);
    if (event.target.value === "1") {
      i18n.changeLanguage("ja"); // Change to Japanese
    } else if (event.target.value === "2") {
      i18n.changeLanguage("en"); // Change to Japanese
    } else {
      i18n.changeLanguage("jaKana"); // Change to English
    }
    localStorage.setItem("selectedLanguage", event.target.value); // Save to localStorage
  };

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
          "callAccepted3",
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

  useEffect(() => {
    fetchLanguageNames();
  }, []);

  useEffect(() => {
    // Retrieve the selected value from localStorage on mount
    const savedValue = localStorage.getItem("selectedLanguage");
    if (savedValue) {
      setSelectedLanguageNo(savedValue);
    }
  }, []);

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

  useEffect(() => {
    socket.on("interpreterServerResponse", (data) => {
      if (data.contractorNo == contractorNo && data.response == "accepted") {
        isCallAcceptedRef.current = true;
        // setInterpreterNo(data.interpreterNumber);
        interpreterNoRef.current = Number(data.interpreterNumber);
        console.log(1787, interpreterNoRef.current);
        startMeeting(data.signature.signature);
      }
    });
  }, [contractorNo]); // Only re-run if contractorNo changes

  const [ringingTime, setRingingTime] = useState(0);
  const intervalRef: MutableRefObject<number | null> = useRef(null);

  // Function to handle button press
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
    }, 3000); // 10 seconds (10,000 ms)
  };

  const stopRingtone = () => {
    // setCallCancel(new Date());
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
    console.log(15589, new Date());

    callDialRef.current = new Date();

    const data = {
      meetingNumber: "7193586721",
      contractorNo: contractorNo,
      languageSupportNo: Number(selectedLanguageNo),
    };
    // Emit the 'dataFromFrontend' event to the server
    socket.emit("callRequest", data);
  };

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

      <Box className={classes.userMessage}>{t("UserMessage")}</Box>
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
