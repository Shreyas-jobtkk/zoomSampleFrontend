import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ZoomMtg } from "@zoom/meetingsdk";
import { useLocation } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader/MenuHeader";
import ButtonAtom from "../../components/LV1/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { UserApiService } from "../../api/apiService/user/user-api-service";
import classes from "../../styles/InterpreterMenu.module.scss";
import { apiUrl } from "../../apiUrl";

// Connect to the socket.io server
const socket = io(apiUrl);

function InterpreterLogin() {
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

  const [status, setStatus] = useState("inactive"); // State to hold the selected status

  // Send API request when user is active or inactive
  const sendActivityStatus = async (status: any) => {
    UserApiService.updateInterpreterStatus(interpreterNo, status);
  };

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
    navigate("/Interpreter/InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/Interpreter/MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/Interpreter/MeetingInvitationList");
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
