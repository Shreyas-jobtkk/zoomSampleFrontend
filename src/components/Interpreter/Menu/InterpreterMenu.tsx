import {
  useEffect,
  useState,
  // useRef
} from "react";
import io from "socket.io-client";
import { ZoomMtg } from "@zoom/meetingsdk";
// import ringtoneFile from "../../ringtone.mp3";
import { useLocation } from "react-router-dom";
import MenuHeader from "../../LV3/Header/MenuHeader/MenuHeader";
import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { UserApiService } from "../../../api/apiService/user/user-api-service";
import classes from "./InterpreterMenu.module.scss";
import { apiUrl } from "../../../apiUrl";

// Connect to the socket.io server
const socket = io(apiUrl);

// let uniqueId: string;

function InterpreterLogin() {
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(new Audio(ringtoneFile));
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [callRequest, setCallRequest] = useState<boolean>(false);
  const navigate = useNavigate();
  const interpreterNo = sessionStorage.getItem("interpreterNo");
  const [signature, setSignature] = useState<string>("");
  const [contractorNo, setContractorNo] = useState<any>("");
  const [meetingNo, setMeetingNo] = useState<any>("");
  const location = useLocation();
  const { message } = location.state || {}; // Safely access state

  console.log(144, message);

  const startMeeting2 = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: `${import.meta.env.VITE_REACT_APP_URL}/InterpreterMenu`,
      loginWindow: {
        width: "100", // Set your desired width as a string
        height: "380", // Set your desired height as a string
      },
      patchJsMedia: true,
      leaveOnPageUnload: true,
      isSupportChat: false,
      success: (success: unknown) => {
        sendActivityStatus("inactive");
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: import.meta.env.VITE_ZOOM_MEETING_SDK_KEY,
          // meetingNumber: meetingNumber,
          // passWord: password,
          meetingNumber: "7193586721",
          passWord: "B0h6vX",
          userName: "Host",

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

            ZoomMtg.inMeetingServiceListener("onUserLeave", function () {});
            ZoomMtg.inMeetingServiceListener("onUserJoin", function () {});
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

  console.log(
    33,
    "interpreterNo",
    Number(sessionStorage.getItem("interpreterNo"))
  );

  const [status, setStatus] = useState("inactive"); // State to hold the selected status

  // Send API request when user is active or inactive
  const sendActivityStatus = async (status: any) => {
    UserApiService.updateInterpreterStatus(interpreterNo, status);
  };

  // const handleRingtoneStop = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0; // Reset playback to the start
  //     setIsPlaying(false); // Set state to indicate ringtone has stopped
  //     // ringing = false
  //   }
  // };
  // const timeoutRef = useRef(null);

  // const isAudioPlaying = () => {
  //   return audioRef.current && !audioRef.current.paused;
  // };

  // const handleRingtoneStart = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     // ringing = true
  //     setTimeout(() => {
  //       // handleRingtoneStop();
  //       console.log(144, isAudioPlaying());

  //       // if (ringing && !callReceived) {
  //       if (isAudioPlaying()) {
  //         setIsPlaying(false);
  //         const data = {
  //           dial: "forcible disconnect", // Replace with actual value
  //           uniqueId: uniqueId,
  //         };

  //         const now = new Date();
  //         const formattedDate =
  //           now.toLocaleString() +
  //           "." +
  //           String(now.getMilliseconds()).padStart(3, "0");
  //         console.log(123, formattedDate);

  //         socket.emit("dataFromFrontend", data);
  //         // notResponded = true
  //         // console.log(143, notResponded)
  //         // handleRingtoneStop();
  //         alert("you missed a call");
  //       }
  //       // handleDisconnect();
  //     }, 10000);
  //   }
  // };

  useEffect(() => {
    socket.on("meetingHostData", (meetingHostData) => {
      console.log(189, meetingHostData, meetingHostData.signature.signature);
      if (meetingHostData.interpreterNo == interpreterNo) {
        setSignature(meetingHostData.signature.signature);
        setCallRequest(true);
        setContractorNo(meetingHostData.contractorNo);
        setMeetingNo(meetingHostData.meetingNumber);
      }
    });
  });

  useEffect(() => {
    // Handle browser/tab close
    const handleBeforeUnload = () => {
      alert(145);
      sendActivityStatus("inactive"); // User is closing the page (inactive)
      // event.preventDefault();
    };

    // Send initial API call to mark user as active when component mounts
    // sendActivityStatus("active");

    // Add event listener to detect when the browser or tab is closed
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // useEffect(() => {
  //   socket.on("callRequestFromServer", (data) => {
  //     // setCallRequest(true);
  //     console.log(112, "Call dial", new Date().toISOString());
  //     console.log(458, data);
  //   });

  //   socket.on("cancelCallRequestFromServer", (data) => {
  //     // setCallRequest(false);
  //     console.log(1458, data);
  //   });
  //   // Add path to your ringtone file
  //   // if (message.status == "active") {
  //   // Listen for messages from the server when notifications are enabled
  //   socket.on("message", (data) => {
  //     console.log(141, data);
  //     console.log(111, data.terminal_id);

  //     if (message.terminal_id == data.terminal_id) {
  //       if (data.connectingLink === "calling") {
  //         uniqueId = data.uniqueId;
  //         // console.log(2457, status);
  //         console.log(21, data, uniqueId);
  //         // Play ringtone when there is an incoming call
  //         handleRingtoneStart();
  //         setStatus("inactive");
  //         sendActivityStatus("inactive");
  //         // console.log(189, status)
  //       }
  //     }
  //     if (data.connectingLink === "disconnected" && data.uniqueId == uniqueId) {
  //       console.log(31, data, uniqueId);
  //       // Stop the ringtone if the call is disconnected
  //       handleRingtoneStop();
  //       // console.log(243, notResponded)
  //       // if (notResponded == false) {
  //       setStatus("active");
  //       sendActivityStatus("active");
  //       // }
  //     }
  //     if (
  //       data.connectingLink === "terminal joined" &&
  //       data.terminal_id == message.terminal_id
  //     ) {
  //       console.log(111, data.terminal_id);
  //       console.log(211, message.terminal_id);
  //       console.log(411, data);
  //       // console.log(3357, data.connectingLink);
  //       handleRingtoneStop();
  //       setStatus("inactive");
  //       sendActivityStatus("inactive");
  //     }
  //     // setStatus('inactive');
  //   });

  //   socket.on("startUrl", (meetingData) => {
  //     if (meetingData.uniqueId == uniqueId) {
  //       console.log(136, meetingData, uniqueId);
  //     }
  //   });

  //   // Clean up the socket connection on component unmount
  //   return () => {
  //     socket.off("message");
  //   };
  // }, [status]);

  // useEffect(() => {
  //   if (message) {
  //     console.log(155, message.status); // Log the message to the console
  //   }
  // }, [message]);

  // const toggleNotifications = () => {
  //   setNotificationsEnabled((prev) => !prev); // Toggle notifications state
  // };

  const getSignature = async () => {
    console.log(21897, meetingNo);
    {
      const data = {
        contractorNo: contractorNo,
        meetingNumber: meetingNo,
        interpreterNumber: interpreterNo,
      };

      socket.emit("interpreterResponse", data);
      startMeeting2(signature);
    }
    // try {
    //   startMeeting();
    //   setIsPlaying(false);

    //   // setStatus('inactive');

    //   const date = new Date()
    //     .toLocaleString("ja-JP", {
    //       timeZone: "Asia/Tokyo",
    //       hour12: false,
    //     })
    //     .replace(/\//g, "-")
    //     .replace(",", "");

    //   const data = {
    //     dial: "terminal joined", // Replace with actual value
    //     terminal_id: message.terminal_id, // Replace with actual value
    //     date: date,
    //     uniqueId: uniqueId,
    //   };

    //   console.log(158, data);
    //   // Emit the 'dataFromFrontend' event to the server
    //   socket.emit("dataFromFrontend", data);

    //   // // Emit data to the server
    //   // socket.emit('dataFromFrontend', { username: 'admin', action: 'startMeeting' });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // function startMeeting() {
  //   console.log(137);

  //   // const zoomLink = `https://zoom.us/j/7193586721?pwd=OUcLui5QIHATeQ0B0JCzl11RbRQVCO.1`;

  //   // Set a fallback in case the Zoom app doesn't open immediately
  //   setTimeout(() => {
  //     window.open(zoomStartURL, "_blank");
  //   }, 1000); // 1 second delay
  // }

  const navigateToAdministratorList = () => {};

  const navigateToInterpreterEvaluationList = () => {
    navigate("/InterpretersInterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/InterpreterMeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/InterpreterMeetingInvitationList");
  };

  const setStatusToActive = () => {
    setStatus("active");
    sendActivityStatus("active");
  };
  const setStatusToInactive = () => {
    setStatus("inactive");
    sendActivityStatus("inactive");
  };

  return (
    <Box>
      <MenuHeader title="通訳者メニュー" />
      {/* <Box>
        {isPlaying && (
          <ButtonAtom
            onClick={getSignature}
            label="Ringing"
            width="100px"
          />
        )}
      </Box> */}
      {/* {!isPlaying && ( // Hide the Box if isPlaying is true

          <Box>
            <label htmlFor="status">Select Status:</label>
            <select id="status" value={status} onChange={handleChange}>
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>    
          </Box>
        )} */}
      {status && <p>Selected Status: {status}</p>}

      {/* <Box>languages:{message.languages_known}</Box>
        <Box>terminal_id:{message.terminal_id}</Box> */}

      <Box className={classes.interpreterMenuContainer}>
        <Box className={classes.navigateButtons}>
          <ButtonAtom
            onClick={navigateToInterpreterEvaluationList}
            label="通訳評価一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToMeetingHistoryList}
            label="ミーティング履歴一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToMeetingInvitationList}
            label="ミーティング招待一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
        </Box>
        <Box>
          <Box className={classes.activeStatusButtons}>
            <ButtonAtom
              onClick={setStatusToInactive}
              label="準備中"
              width="20vw"
              padding="5vh 5vw 5vh 2vw"
              margin="2vh 2vw"
              disabled={status === "inactive"}
            />
            <ButtonAtom
              onClick={setStatusToActive}
              label="受付"
              width="20vw"
              padding="5vh 5vw 5vh 2vw"
              margin="2vh 2vw"
              disabled={status === "active"}
            />
          </Box>

          <Box className={classes.activeStatusButtons}>
            <ButtonAtom
              onClick={navigateToAdministratorList}
              label="拒否"
              width="20vw"
              padding="5vh 5vw 5vh 2vw"
              margin="2vh 2vw"
            />
            <ButtonAtom
              onClick={getSignature}
              label="承諾"
              width="20vw"
              padding="5vh 5vw 5vh 2vw"
              margin="2vh 2vw"
              disabled={!callRequest}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InterpreterLogin;
