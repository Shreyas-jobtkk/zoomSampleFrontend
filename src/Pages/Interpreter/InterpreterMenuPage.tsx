import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
// import "../../App.css";
import ringtoneFile from "../../components/ringtone.mp3";
import { useLocation } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader";
import ButtonAtom from "../../components/LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { UserApiService } from "../../api/apiService/user/user-api-service";

// import axios from 'axios';

// let apiUrl = "https://zoomsamplebackend.onrender.com"
// let apiUrl = "http://localhost:4000"

import { apiUrl } from "../../apiUrl";

// Connect to the socket.io server
const socket = io(apiUrl);
let zoomStartURL: string;
let uniqueId: string;

function InterpreterLogin() {
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(ringtoneFile));
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { message } = location.state || {}; // Safely access state
  const terminal_id = message.terminal_id;

  console.log(144, message);

  const [status, setStatus] = useState("inactive"); // State to hold the selected status

  // Send API request when user is active or inactive
  const sendActivityStatus = async (status: any) => {
    UserApiService.updateInterpreterStatus(message, status);
  };

  const handleRingtoneStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback to the start
      setIsPlaying(false); // Set state to indicate ringtone has stopped
      // ringing = false
    }
  };
  // const timeoutRef = useRef(null);

  const isAudioPlaying = () => {
    return audioRef.current && !audioRef.current.paused;
  };

  const handleRingtoneStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      // ringing = true
      setTimeout(() => {
        // handleRingtoneStop();
        console.log(144, isAudioPlaying());

        // if (ringing && !callReceived) {
        if (isAudioPlaying()) {
          setIsPlaying(false);
          const data = {
            dial: "forcible disconnect", // Replace with actual value
            uniqueId: uniqueId,
          };

          const now = new Date();
          const formattedDate =
            now.toLocaleString() +
            "." +
            String(now.getMilliseconds()).padStart(3, "0");
          console.log(123, formattedDate);

          socket.emit("dataFromFrontend", data);
          // notResponded = true
          // console.log(143, notResponded)
          // handleRingtoneStop();
          alert("you missed a call");
        }
        // handleDisconnect();
      }, 10000);
    }
  };

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

  useEffect(() => {
    // Add path to your ringtone file
    // if (message.status == "active") {
    // Listen for messages from the server when notifications are enabled
    socket.on("message", (data) => {
      console.log(141, data);
      console.log(111, data.terminal_id);
      console.log(211, message.terminal_id);
      if (message.terminal_id == data.terminal_id) {
        if (data.connectingLink === "calling") {
          uniqueId = data.uniqueId;
          // console.log(2457, status);
          console.log(21, data, uniqueId);
          // Play ringtone when there is an incoming call
          handleRingtoneStart();
          setStatus("inactive");
          sendActivityStatus("inactive");
          // console.log(189, status)
        }
      }
      if (data.connectingLink === "disconnected" && data.uniqueId == uniqueId) {
        console.log(31, data, uniqueId);
        // Stop the ringtone if the call is disconnected
        handleRingtoneStop();
        // console.log(243, notResponded)
        // if (notResponded == false) {
        setStatus("active");
        sendActivityStatus("active");
        // }
      }
      if (
        data.connectingLink === "terminal joined" &&
        data.terminal_id == message.terminal_id
      ) {
        console.log(111, data.terminal_id);
        console.log(211, message.terminal_id);
        console.log(411, data);
        // console.log(3357, data.connectingLink);
        handleRingtoneStop();
        setStatus("inactive");
        sendActivityStatus("inactive");
      }
      // setStatus('inactive');
    });

    socket.on("startUrl", (meetingData) => {
      if (meetingData.uniqueId == uniqueId) {
        console.log(136, meetingData, uniqueId);
        zoomStartURL = meetingData.url;
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
    };
  }, [status]);

  // useEffect(() => {
  //   if (message) {
  //     console.log(155, message.status); // Log the message to the console
  //   }
  // }, [message]);

  // const toggleNotifications = () => {
  //   setNotificationsEnabled((prev) => !prev); // Toggle notifications state
  // };

  const getSignature = async () => {
    try {
      startMeeting();
      setIsPlaying(false);

      // setStatus('inactive');

      const date = new Date()
        .toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
          hour12: false,
        })
        .replace(/\//g, "-")
        .replace(",", "");

      const data = {
        dial: "terminal joined", // Replace with actual value
        terminal_id: message.terminal_id, // Replace with actual value
        date: date,
        uniqueId: uniqueId,
      };

      console.log(158, data);
      // Emit the 'dataFromFrontend' event to the server
      socket.emit("dataFromFrontend", data);

      // // Emit data to the server
      // socket.emit('dataFromFrontend', { username: 'admin', action: 'startMeeting' });
    } catch (e) {
      console.log(e);
    }
  };

  function startMeeting() {
    console.log(137);

    // const zoomLink = `https://zoom.us/j/7193586721?pwd=OUcLui5QIHATeQ0B0JCzl11RbRQVCO.1`;

    // Set a fallback in case the Zoom app doesn't open immediately
    setTimeout(() => {
      window.open(zoomStartURL, "_blank");
    }, 1000); // 1 second delay
  }

  const navigateToAdministratorList = () => {};

  const navigateToInterpreterEvaluationList = () => {
    navigate("/InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/MeetingInvitationList");
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
    <Box className="App">
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

      <Box className="interpreter-menu-button-container">
        <Box className="navigate-buttons">
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
          <Box className="row">
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

          <Box className="row">
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
              disabled={!isPlaying}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InterpreterLogin;
