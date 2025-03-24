import {
  useEffect,
  useState,
  // useRef
} from "react";
import io from "socket.io-client";
import { ZoomMtg } from "@zoom/meetingsdk";
// import ringtoneFile from "../../ringtone.mp3";
import { useLocation } from "react-router-dom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
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

  const startMeeting = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: `${import.meta.env.VITE_REACT_APP_URL}/Interpreter/Menu`,
      loginWindow: {
        width: "100", // Set your desired width as a string
        height: "380", // Set your desired height as a string
      },
      patchJsMedia: true,
      leaveOnPageUnload: true,
      isSupportChat: false,
      success: (success: unknown) => {
        // sendActivityStatus("inactive");
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
    socket.on("cancelCallRequestFromServer", (data) => {
      setCallRequest(false);
      if (contractorNo == data.contractorNo) {
        console.log(189, data, contractorNo, new Date().toISOString());
        sendActivityStatus("active");
      }
    });
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      sendActivityStatus("inactive");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getSignature = async () => {
    console.log(21897, meetingNo);
    {
      const data = {
        contractorNo: contractorNo,
        meetingNumber: meetingNo,
        interpreterNumber: interpreterNo,
        response: "accepted",
      };

      socket.emit("interpreterResponse", data);
      startMeeting(signature);
    }
  };

  const rejectCall = () => {
    const data = {
      contractorNo: contractorNo,
      meetingNumber: meetingNo,
      interpreterNumber: interpreterNo,
      response: "rejected",
    };

    setStatus("inactive");
    setCallRequest(false);

    socket.emit("interpreterResponse", data);
  };

  const navigateToInterpreterEvaluationList = () => {
    navigate("InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("MeetingInvitationList");
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
              onClick={rejectCall}
              label="拒否"
              width="20vw"
              padding="5vh 5vw 5vh 2vw"
              margin="2vh 2vw"
              disabled={!callRequest}
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
