import { ZoomMtg } from "@zoom/meetingsdk";
import ValidationInputField from "../../../components/LV1/ValidationInputField/ValidationInputField";
import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import {
  showInputFieldOverlay,
  hideInputFieldOverlay,
  showOverlayMessage,
} from "./showInputFieldOverlay"; // Import the function
import {
  showEmojiPicker,
  hideEmojiPicker,
  createEmojiReactionAnimation,
} from "./showEmojiPicker"; // Import the function
import { apiUrl } from "../../../apiUrl";
import io from "socket.io-client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Connect to the socket.io server
const socket = io(apiUrl);

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const Sample: React.FC = () => {
  const [hostName, setHostName] = useState("");
  // const [meetingNumber, setMeetingNumber] = useState("");
  // const [password, setPassword] = useState("");

  let meetingNumber: number;
  let password: any;

  const {
    register,
    formState: { isSubmitted },
  } = useForm<any>();

  useEffect(() => {
    // Listen for 'streamMessage' events from the server
    const handleStreamMessage = (data: string) => {
      showOverlayMessage(data);
    };

    const handleZoomStreamEmoji = (data: any) => {
      createEmojiReactionAnimation(data);
    };

    socket.on("streamMessage", handleStreamMessage);
    socket.on("zoomStreamEmoji", handleZoomStreamEmoji);

    // Clean up the event listeners on component unmount
    return () => {
      socket.off("streamMessage", handleStreamMessage);
      socket.off("zoomStreamEmoji", handleZoomStreamEmoji);
    };
  }, []);

  const isButtonDisabled = !hostName;

  const authEndpoint = import.meta.env.VITE_REACT_APP_API_URL;
  const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_KEY;

  const role = 0;
  const userName = hostName;
  const leaveUrl = import.meta.env.VITE_REACT_APP_URL;

  const getSignature = async () => {
    try {
      // Using GET instead of POST for data retrieval
      const response = await axios.get(`${authEndpoint}/get-meeting-data`, {
        headers: { "Content-Type": "application/json" }, // Optional: headers, but not needed for a GET request unless required
      });

      meetingNumber = response.data.meetingNumber;
      password = response.data.password;

      console.log(15589, meetingNumber);
      if (!meetingNumber) {
        alert("not hosted meeting");
        return;
      }

      // console.log("Fetched Data:", response.data); // response.data contains the actual response from the server

      // Assuming you're handling the fetched meeting data here
      // startMeeting(response.data);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }

    try {
      const { data: zoomData } = await axios.post(
        `${authEndpoint}/zoom`,
        {
          meetingNumber: meetingNumber,
          role: role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const signature = zoomData.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.error(e);
    }
  };

  const showInputField = () => {
    const submitButton = document.createElement("button");
    submitButton.textContent = "button"; // HTML entity for check mark
    // submitButton.style.padding = "10px 20px";
    submitButton.style.fontSize = "16px";
    // submitButton.style.marginLeft = "10px";
    submitButton.style.cursor = "pointer";
    submitButton.style.borderRadius = "5px";
    submitButton.style.backgroundColor = "#4CAF50";
    submitButton.style.color = "#fff";

    // Positioning the button at the extreme right
    submitButton.style.position = "absolute"; // or 'fixed' if you want it to stay when scrolling
    submitButton.style.top = "50px"; // Adjust the vertical position
    submitButton.style.right = "10px"; // Adjust the distance from the right edge
    submitButton.style.width = "70px";

    let visible = false;

    submitButton.onclick = () => {
      if (!visible) {
        showInputFieldOverlay(); // Show the input field overlay
        showEmojiPicker(); // Show the emoji picker
        visible = true;
      } else {
        hideInputFieldOverlay(); // Hide the input field overlay.
        hideEmojiPicker();
        visible = false; // Set visible to false when hiding
      }
    };

    // Append the button to the body or another container
    document.body.appendChild(submitButton);
  };

  const startMeeting = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
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
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: password,
          userName: userName,

          // zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
            // console.log(189, ZoomMtg.inMeetingServiceListener.toString());
            // console.log(133, Object.keys(ZoomMtg.inMeetingServiceListener));
            // console.log(
            //   144,
            //   sessionStorage.getItem("s3.pg.isSupportInMeetingListener")
            // );

            showInputField();

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

  return (
    <Container maxWidth="sm">
      <Box component="main" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Zoom Meeting SDK Sample React Join
        </Typography>

        <ValidationInputField
          isSubmitted={isSubmitted}
          label="Host Name"
          width="250px" // Uncomment to set a custom width
          labelWidth="150px"
          name="mail_address"
          value={hostName}
          onChange={(e: any) => setHostName(e.target.value)} // Update mail_address state on change
          register={register}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={getSignature}
          disabled={isButtonDisabled}
          sx={{ mt: 2 }}
        >
          Host Meeting
        </Button>
      </Box>
    </Container>
  );
};

export default Sample;
