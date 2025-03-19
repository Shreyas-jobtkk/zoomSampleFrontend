import { ZoomMtg } from "@zoom/meetingsdk";
// import { Box, Typography, Button, Container } from "@mui/material";
import ValidationInputField from "../../components/LV1/ValidationInputField/ValidationInputField";
import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
// import { showOverlayMessage } from "./OverlayMessage"; // Import the function
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
import { apiUrl } from "../../apiUrl";
import io from "socket.io-client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Connect to the socket.io server
const socket = io(apiUrl);

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const Sample: React.FC = () => {
  const [meetingNumber, setMeetingNumber] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    formState: { isSubmitted },
  } = useForm<any>();

  useEffect(() => {
    // Listen for 'streamMessage' events from the server
    const handleStreamMessage = (data: string) => {
      let streamData: any = [];
      streamData.push(data);
      function processStreamData() {
        if (streamData.length > 0) {
          showOverlayMessage(streamData[0]);
          streamData.shift(); // Remove the first item to process next
          setTimeout(processStreamData, 50); // Wait 100 ms before continuing the loop
        }
      }

      // Start processing the stream data with a delay
      processStreamData();
    };

    const handleZoomStreamEmoji = (data: any) => {
      createEmojiReactionAnimation(data);
      console.log(1445, data);
    };

    socket.on("streamMessage", handleStreamMessage);
    socket.on("zoomStreamEmoji", handleZoomStreamEmoji);

    // Clean up the event listeners on component unmount
    return () => {
      socket.off("streamMessage", handleStreamMessage);
      socket.off("zoomStreamEmoji", handleZoomStreamEmoji);
    };
  }, []);

  const isButtonDisabled = !meetingNumber || !password;

  const authEndpoint = import.meta.env.VITE_REACT_APP_API_URL;
  const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_KEY;

  console.log(import.meta.env.VITE_ZOOM_MEETING_SDK_KEY?.slice(0, 5));
  // console.log(2557, import.meta.env.VITE_SAMPLE_2);

  // for (let i = 1; i <= 2; i++) {
  //   console.log(155, import.meta.env[`VITE_SAMPLE_${i}`]);
  // }

  const role = 1;
  const userName = "Host";
  const leaveUrl = import.meta.env.VITE_REACT_APP_URL;

  const getSignature = async () => {
    try {
      const { data: zoomData } = await axios.post(
        `${authEndpoint}/zoomForCS`,
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
      console.log(e);
    }
  };

  const showInputField = () => {
    const MessageButton = document.createElement("button");
    const emojiButton = document.createElement("button");
    // const hideButtons = document.createElement("button");

    MessageButton.innerHTML = "&#128172;"; // HTML entity for check mark
    MessageButton.style.fontSize = "16px";
    MessageButton.style.cursor = "pointer";
    MessageButton.style.borderRadius = "5px";
    MessageButton.style.backgroundColor = "#4CAF50";
    MessageButton.style.color = "#fff";

    // Positioning the button at the extreme right
    MessageButton.style.position = "absolute"; // or 'fixed' if you want it to stay when scrolling
    MessageButton.style.top = "50px"; // Adjust the vertical position
    MessageButton.style.right = "10px"; // Adjust the distance from the right edge
    MessageButton.style.width = "25px";

    emojiButton.innerHTML = "&#128512;"; // HTML entity for check mark
    emojiButton.style.fontSize = "16px";
    emojiButton.style.cursor = "pointer";
    emojiButton.style.borderRadius = "5px";
    emojiButton.style.backgroundColor = "#4CAF50";
    emojiButton.style.color = "#fff";

    // Positioning the button at the extreme right
    emojiButton.style.position = "absolute"; // or 'fixed' if you want it to stay when scrolling
    emojiButton.style.top = "80px"; // Adjust the vertical position
    emojiButton.style.right = "10px"; // Adjust the distance from the right edge
    emojiButton.style.width = "25px";

    let inputFieldVisible = false;
    let emojiVisible = false;

    MessageButton.onclick = () => {
      if (!inputFieldVisible) {
        showInputFieldOverlay(); // Show the input field overlay
        hideEmojiPicker();
        emojiVisible = false;
        inputFieldVisible = true;
      } else {
        hideInputFieldOverlay(); // Hide the input field overlay.
        // hideEmojiPicker();
        inputFieldVisible = false; // Set visible to false when hiding
      }
    };

    emojiButton.onclick = () => {
      if (!emojiVisible) {
        // showInputFieldOverlay(); // Show the input field overlay
        showEmojiPicker(); // Show the emoji picker
        emojiVisible = true;
        hideInputFieldOverlay();
        inputFieldVisible = false;
      } else {
        // hideInputFieldOverlay(); // Hide the input field overlay.
        hideEmojiPicker();
        emojiVisible = false; // Set visible to false when hiding
      }
    };

    // else {
    //   MessageButton.onclick = () => {
    //     hideInputFieldOverlay(); // Hide the input field overlay
    //     // hideEmojiPicker();        // Hide the emoji picker
    //   };
    // }

    // Append the button to the body or another container
    document.body.appendChild(MessageButton);
    document.body.appendChild(emojiButton);
    // document.body.appendChild(hideButtons);
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
        console.log(113, success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: password,
          userName: userName,

          // zak: zakToken,
          success: (success: unknown) => {
            console.log(114, success);

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
          Zoom Meeting SDK Sample React Host
        </Typography>
        {/* <TextField
          label="Meeting Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={meetingNumber}
          onChange={(e) => setMeetingNumber(e.target.value)}
        /> */}
        <ValidationInputField
          isSubmitted={isSubmitted}
          label="Meeting Number"
          width="250px" // Uncomment to set a custom width
          labelWidth="150px"
          name="mail_address"
          value={meetingNumber}
          onChange={(e: any) => setMeetingNumber(e.target.value)} // Update mail_address state on change
          register={register}
        />
        {/* <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <ValidationInputField
          isSubmitted={isSubmitted}
          label="Password"
          width="250px" // Uncomment to set a custom width
          labelWidth="150px"
          name="user_password"
          value={password} // Use state value for user_password
          onChange={(e: any) => setPassword(e.target.value)} // Update user_password state on change
          register={register}
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={getSignature}
          disabled={isButtonDisabled}
          sx={{ mt: 2 }}
        >
          Join Meeting
        </Button>
      </Box>
    </Container>
  );
};

export default Sample;
