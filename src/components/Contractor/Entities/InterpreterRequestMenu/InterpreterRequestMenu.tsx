import { useEffect, useState, useRef, MutableRefObject } from "react";
import io from "socket.io-client";
import ringtone from "../../../ringtone.mp3";
// import { v4 as uuidv4 } from "uuid";
// import { useLocation } from "react-router-dom";
import { apiUrl } from "../../../../apiUrl.js";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader.js";
import RadioButtonGroupRound from "../../../LV1/RadioButton/RadioButtonGroupRound.js";
import { useTranslation } from "react-i18next";
import "../../../../i18n.js";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom.js";
import { Box } from "@mui/material";
import classes from "../styles/Entities.module.scss";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { ZoomMtg } from "@zoom/meetingsdk";
import { CallLogApiService } from "../../../../api/apiService/callLog/callLog-api-service";

const socket = io(apiUrl);
// let zoomJoinURL: string;

function UserMenu() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [callDial, setCallDial] = useState<null | Date>(null);
  const [callCancel, setCallCancel] = useState<null | Date>(null);
  // const [callStart, setCallStart] = useState<null | Date>(null);
  let callStart: Date | null = null;
  const [callEnd, setCallEnd] = useState<null | Date>(null);
  const [callStatus, setCallStatus] = useState<null | string>(null);
  const [feedback, setFeedback] = useState<null | number>(null);
  const [signature, setSignature] = useState<string>("");
  const contractorNo = Number(sessionStorage.getItem("contractorNo"));
  const [interpreterNo, setInterpreterNo] = useState<number | null>(null);
  // const [meetingNo, setMeetingNo] = useState<any>("");
  const [selectedLanguageNo, setSelectedLanguageNo] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "1";
  });
  let meetingEnded = false;

  const startMeeting2 = (signature: string) => {
    console.log(15589, interpreterNo);
    document.getElementById("zmmtg-root")!.style.display = "block";

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
        console.log(21897, interpreterNo);

        ZoomMtg.join({
          signature: signature,
          sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
          meetingNumber: "7193586721",
          passWord: "B0h6vX",
          userName: "join",

          // zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
            console.log(189, ZoomMtg.inMeetingServiceListener.toString());
            console.log(133, Object.keys(ZoomMtg.inMeetingServiceListener));
            console.log(
              144,
              sessionStorage.getItem("s3.pg.isSupportInMeetingListener")
            );

            // showInputField();

            ZoomMtg.inMeetingServiceListener("onUserJoin", function () {
              // setCallStart(new Date());
              callStart = new Date();
            });

            // Adding event listener for when the meeting ends
            ZoomMtg.inMeetingServiceListener("onUserLeave", function () {
              if (meetingEnded) {
                return;
              }
              meetingEnded = true;
              setCallEnd(new Date());
              alert(475);

              let rating: number | null = null;
              let input = prompt("Enter a number between 1 and 5:");

              rating =
                input !== null && !isNaN(Number(input)) && input.trim() !== ""
                  ? Number(input)
                  : null;

              try {
                CallLogApiService.createCallLog(
                  Number(interpreterNo),
                  Number(selectedLanguageNo),
                  contractorNo,
                  callDial,
                  callCancel,
                  callStart,
                  new Date(),
                  "callCanceled",
                  rating
                );
              } catch (error) {
                console.error("Error saving callLog:", error);
              }
              // return;

              // // Send the rating to the backend
              // fetch("https://your-backend-api.com/feedback", {
              //   method: "POST",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({ rating: finalRating }),
              // })
              //   .then(response => response.json())
              //   .then(data => console.log("Feedback submitted:", data))
              //   .catch(error => console.error("Error submitting feedback:", error));
            });
            console.log(155, callEnd);
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

  useEffect(() => {
    fetchLanguageNames();
  }, []);

  useEffect(() => {
    if (callCancel) {
      console.log(
        8971,
        "callCancel",
        callDial,
        callCancel,
        selectedLanguageNo,
        contractorNo
      );

      try {
        CallLogApiService.createCallLog(
          Number(interpreterNo),
          Number(selectedLanguageNo),
          contractorNo,
          callDial,
          callCancel,
          callStart,
          callEnd,
          "callCanceled",
          feedback
        );
      } catch (error) {
        console.error("Error saving callLog:", error);
      }
    }
  }, [callCancel]);

  useEffect(() => {
    if (callStart) {
      console.log(28971, callStart, callEnd);
    }
  }, [callStart]);

  useEffect(() => {
    if (callEnd) {
      console.log(38971, callStart, callEnd);
    }
  }, [callEnd]);

  const fetchLanguageNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAll();

      console.log(102177, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name, // Map 'language_name' to 'label'
        value: String(item.languages_support_no), // Map 'languages_support_no' to 'value'
      }));

      // radioOptions = response;

      setSelectLanguage(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguageNo(event.target.value);
    if (event.target.value === "2") {
      i18n.changeLanguage("ja"); // Change to Japanese
    } else if (event.target.value === "4") {
      i18n.changeLanguage("jaKana"); // Change to Japanese
    } else {
      i18n.changeLanguage("en"); // Change to English
    }
    localStorage.setItem("selectedLanguage", event.target.value); // Save to localStorage
  };

  useEffect(() => {
    // Retrieve the selected value from localStorage on mount
    const savedValue = localStorage.getItem("selectedLanguage");
    if (savedValue) {
      setSelectedLanguageNo(savedValue);
    }
  }, []);

  // let radioOptions = [
  //   { label: "日本語", value: "japanese" },
  //   { label: "English", value: "english" },
  //   { label: "ひらがな", value: "hiragana" },
  //   { label: "हिन्दी", value: "hindi" },
  //   { label: "नेपाली", value: "nepali" },
  //   { label: "Tiếng Việt", value: "vietnamese" },
  //   { label: "汉语", value: "chinese" },
  //   { label: "한국어", value: "korean" },
  // ];

  useEffect(() => {
    // socket.on("meetingJoinData", (meetingJoinData) => {
    //   console.log(1289, contractorNo);
    //   if (meetingJoinData.contractorNo == contractorNo) {
    //     console.log(189, meetingJoinData, meetingJoinData.signature.signature);
    //     setSignature(meetingJoinData.signature.signature);
    //     // startMeeting2(meetingJoinData.signature.signature);
    //   }
    // });
    // // Handle browser/tab close
    // const handleBeforeUnload = () => {
    //     //   sendActivityStatus("inactive"); // User is closing the page (inactive)
    //     // event.preventDefault();
    //     if (typeof uniqueId == 'string') {
    //         const data = {
    //             dial: 'disconnected', // Replace with actual value
    //             institutionid: 'institutionid',
    //             uniqueId: uniqueId,
    //         };
    //         console.log(3443, data)
    //         // Emit the 'dataFromFrontend' event to the server
    //         // socket.emit('dataFromFrontend', data);
    //     }
    // };
    // // Send initial API call to mark user as active when component mounts
    // // sendActivityStatus("active");
    // // Add event listener to detect when the browser or tab is closed
    // window.addEventListener('beforeunload', handleBeforeUnload);
    // // Cleanup event listener when component unmounts
    // return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
  }, []);

  useEffect(() => {
    socket.on("interpreterServerResponse", (data) => {
      if (data.contractorNo == contractorNo) {
        setInterpreterNo(data.interpreterNumber);
        setSignature(data.signature.signature);
        console.log(1787, data.signature.signature);
      }
    });
  }, [contractorNo]); // Only re-run if contractorNo changes

  // Watch for changes in interpreterNo and call startMeeting2
  useEffect(() => {
    if (signature) {
      startMeeting2(signature);
    }
  }, [signature]); // Trigger startMeeting2 when interpreterNo changes

  // socket.on("url", (meetingData) => {
  //   // zoomJoinURL = meetingData.url;
  //   // setTimeout(() => {
  //   //     window.location.href = zoomJoinURL;
  //   //     // window.open(zoomJoinURL, '_blank');
  //   //   }, 1000);  // 1 second delay
  // });

  const [ringingTime, setRingingTime] = useState(0);
  const intervalRef: MutableRefObject<number | null> = useRef(null);

  // Function to handle button press
  const playRingtone = () => {
    if (!selectedLanguageNo) {
      alert("Please select a language before joining a meeting.");
      return;
    }
    // uniqueId = uuidv4()
    // uniqueId = uuidv4();

    console.log("playing");

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true); // Set state to indicate ringtone is playing
    }

    // Start the interval to count ringing time in milliseconds
    intervalRef.current = window.setInterval(() => {
      setRingingTime((prevTime) => prevTime + 10); // Increment by 10 ms
    }, 10);
  };

  const stopRingtone = () => {
    console.log("Call terminated", new Date().toISOString());
    const data = {
      contractorNo: contractorNo,
    };

    socket.emit("cancelCallRequest", data);
    setCallCancel(new Date());
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

    // console.log(144, uniqueId)
    // // const data = "disconnected"
    // const data = {
    //     dial: 'disconnected', // Replace with actual value
    //     institutionid: 'institutionid2',
    //     uniqueId: uniqueId,
    // };

    // console.log(1443, data)
    // // Emit the 'dataFromFrontend' event to the server
    // socket.emit('dataFromFrontend', data);
  };

  // const emitDisconnectInfo = () => {
  //   console.log(144, uniqueId);
  //   // const data = "disconnected"
  //   const data = {
  //     dial: "disconnected", // Replace with actual value
  //     institutionid: "institutionid2",
  //     uniqueId: uniqueId,
  //   };

  //   // Emit the 'dataFromFrontend' event to the server
  //   socket.emit("dataFromFrontend", data);
  // };
  // const [socketResponse, setSocketResponse] = useState(null);

  // useEffect(() => {
  //     // Listen for server response
  //     socket.on('serverResponse', (data) => {
  //         setSocketResponse(data);
  //     });

  //     // Cleanup on component unmount
  //     return () => {
  //         socket.off('serverResponse');
  //     };
  // }, []);
  // let meetingNumber = ""
  // let passWord = ""

  // const fetchData = async () => {
  //     try {
  //         // alert(language)
  //         const response = await fetch(`${apiUrl}/api/users`);
  //         // const userData: User[] = await response.json();
  //         // console.log('Fetched user data:', userData);

  //         // // Find an available user who speaks the selected language
  //         // const availableUser = userData.find((user: User) =>
  //         //     user.languages.includes(language!) && user.status === 'available'
  //         // );

  //         if (availableUser) {
  //             // alert(availableUser)
  //             // meetingNumber = availableUser.meetingNumber
  //             // passWord = availableUser.password
  //             // alert(meetingNumber)
  //             // alert(availableUser.meetingNumber)
  //         } else {
  //             alert('No matching users available. Please wait.');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching users:', error);
  //         alert('Error fetching users. Please try again.');
  //     }
  // };

  const getSignature = async () => {
    if (!selectedLanguageNo) {
      alert("Please select a language before joining a meeting.");
      return;
    }

    setCallDial(new Date());

    console.log(11, "Call dial", new Date().toISOString());
    console.log(22, "langNumber", Number(selectedLanguageNo));
    console.log(
      33,
      "contractorNo",
      Number(sessionStorage.getItem("contractorNo"))
    );

    // console.log(118, signature);

    // startMeeting2(signature);

    // try {
    //   const { data: zoomData } = await axios.post(
    //     `${authEndpoint}/zoom`,
    //     {
    //       meetingNumber: "7193586721",
    //       role: 0,
    //       contractorNo: contractorNo,
    //       languageSupportNo: selectedLanguageNo,
    //     },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );

    //   const signature = zoomData.signature as string;
    //   console.log(144, signature);
    //   startMeeting2(signature);
    // } catch (e) {
    //   console.log(e);
    // }

    // const data = {
    //   dial: "calling", // Replace with actual value
    //   institutionid: "institutionid", // Replace with actual value
    //   name_of_institution: "userData.name_of_institution", // Replace with actual value
    //   translateLanguage: selectedLanguageNo,
    //   uniqueId: uniqueId,
    //   // terminal_id:userData.terminal_id
    // };

    const data = {
      meetingNumber: "7193586721",
      contractorNo: contractorNo,
      languageSupportNo: Number(selectedLanguageNo),
      // uniqueCallingId: uniqueId,
    };
    // Emit the 'dataFromFrontend' event to the server
    socket.emit("callRequest", data);

    // // await fetchData();

    // // Ensure this code only runs once by removing previous listeners
    // socket.off("message").on("message", (data) => {
    //   console.log(135, data, uniqueId);

    //   if (
    //     data.connectingLink === "terminal joined" &&
    //     uniqueId === data.uniqueId
    //   ) {
    //     stopRingtone();
    //     startMeeting();
    //   }

    //   if (
    //     data.connectingLink === "no active terminal" &&
    //     uniqueId === data.uniqueId
    //   ) {
    //     console.log(155123);
    //     stopRingtone();
    //     alert("no active terminal");
    //   }

    //   if (
    //     data.connectingLink === "forcible disconnect" &&
    //     uniqueId === data.uniqueId
    //   ) {
    //     const now = new Date();
    //     const formattedDate =
    //       now.toLocaleString() +
    //       "." +
    //       String(now.getMilliseconds()).padStart(3, "0");
    //     console.log(2123, formattedDate, data.connectingLink);
    //     stopRingtone();
    //     alert(
    //       "通訳者 が応答できない状態です。しばらくお待ちいただき、もう一度、Call ボタンを押してください。"
    //     );
    //   }
    // });
  };

  // function startMeeting() {
  //   // const zoomAppLink = `zoommtg://zoom.us/join?confno=${meetingNumber}&pwd=${passWord}`;
  //   // const zoomWebLink = `https://zoom.us/j/${meetingNumber}?pwd=${passWord}`;

  //   // Try to open Zoom app protocol
  //   // window.location.href = zoomAppLink;
  //   // const zoomLink = `https://zoom.us/j/7193586721?pwd=OUcLui5QIHATeQ0B0JCzl11RbRQVCO.1`;

  //   // Set a fallback in case it doesn't work
  //   console.log(155, zoomJoinURL);

  //   setTimeout(() => {
  //     window.location.href = zoomJoinURL;
  //     // window.open(zoomJoinURL, '_blank');
  //   }, 1000); // 1 second delay
  // }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // Display only two digits for milliseconds

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  // function startMeeting() {
  //     // alert(meetingNumber)
  //     if (meetingNumber && passWord) {
  //         const zoomAppLink = `zoommtg://zoom.us/join?confno=${meetingNumber}&pwd=${passWord}`;
  //         // window.location.href = zoomAppLink;
  //         setTimeout(() => {
  //             window.open(zoomAppLink, '_blank');
  //         }, 1000);  // 1 second delay to allow the app to open first
  //     } else {
  //         alert("Meeting information is not available.");
  //     }
  // }

  return (
    <Box>
      <MenuHeader title="通訳希望者メニュー" />
      <RadioButtonGroupRound
        options={selectLanguage}
        selectedValue={selectedLanguageNo}
        onChange={handleRadioChange}
        name="options"
      />

      <Box className={classes.userMessage}>{t("User message")}</Box>
      <Box className={classes.userCallRow}>
        <ButtonAtom
          onClick={() => {
            playRingtone();
            getSignature();
          }}
          label="Call"
          width="50px"
          disabled={isPlaying}
          padding="16px"
        />
        <ButtonAtom
          onClick={() => {
            stopRingtone();
            // emitDisconnectInfo();
          }}
          label="Terminate"
          width="100px"
          disabled={!isPlaying}
          padding="16px"
        />
        <p className={classes.timer}>{formatTime(ringingTime)}</p>

        {/* Hidden audio element that plays the ringtone */}
        <audio ref={audioRef} src={ringtone} />

        {/* <p>{selectedLanguageNo ? `Selected Language: ${selectedLanguageNo}` : 'No language selected'}</p>
                <p>{userData?.name_of_institution}</p> */}

        {/* <button onClick={getSignature}>Join Meeting</button> */}
      </Box>
    </Box>
  );
}

export default UserMenu;
