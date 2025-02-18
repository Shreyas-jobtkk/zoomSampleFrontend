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
import SelectOption from "../../components/LV1/SelectOption/SelectOption";

// Connect to the socket.io server
const socket = io(apiUrl);

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const Sample: React.FC = () => {
  const [meetingNumber, setMeetingNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options = [
    { label: "None", value: "" },
    { label: "Saitama TC", value: 1 },
    { label: "Shreyas PA", value: 2 },
  ];

  const {
    register,
    formState: { isSubmitted },
  } = useForm<any>();

  useEffect(() => {
    // Listen for 'streamMessage' events from the server
    const handleStreamMessage = (data: string) => {
      showOverlayMessage(data);
      console.log(1445, data);
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

  const getZoomSDKKey = (index: number) => {
    return import.meta.env[`VITE_ZOOM_MEETING_SDK_KEY_${index}`];
  };

  const zoomSDKKey = getZoomSDKKey(Number(selectedOption)); // Example usage
  const sdkKey = zoomSDKKey;

  console.log(2557, sdkKey?.slice(0, 5));

  const role = 1;
  const userName = "Host";
  const leaveUrl = import.meta.env.VITE_REACT_APP_URL;

  const getSignature = async () => {
    try {
      const { data: zoomData } = await axios.post(
        `${authEndpoint}/zoom`,
        {
          meetingNumber: meetingNumber,
          role: role,
          SDKAccount: selectedOption,
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

    // Set position to absolute for left property to work
    // submitButton.style.position = "absolute";
    // submitButton.style.left = "50px";

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

    // else {
    //   submitButton.onclick = () => {
    //     hideInputFieldOverlay(); // Hide the input field overlay
    //     // hideEmojiPicker();        // Hide the emoji picker
    //   };
    // }

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
        <SelectOption
          label="Select Account:"
          options={options}
          width={"calc(10vw - 15px)"}
          value={selectedOption}
          onChange={setSelectedOption}
          labelWidth={"125px"}
        />
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
