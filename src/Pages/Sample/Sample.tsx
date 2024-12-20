import * as React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { Box, Typography, Button, Container } from "@mui/material";
import { showOverlayMessage } from "./OverlayMessage"; // Import the function
import { showInputFieldOverlay } from "./showInputFieldOverlay"; // Import the function

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const Sample: React.FC = () => {
  let message: string = "";
  let meetingNumber = "";
  let passWord = "";

  const authEndpoint = "http://localhost:4000";
  const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_KEY;
  meetingNumber = import.meta.env.VITE_MEETING_NUMBER;
  passWord = import.meta.env.VITE_MEETING_PASSWORD;
  const role = 1;
  const userName = "Shreyas";
  const zakToken = "";
  const leaveUrl = "http://localhost:5173";

  const getSignature = async () => {
    console.log(155, import.meta.env.VITE_ZOOM_MEETING_SDK_KEY);
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      const res = await req.json();
      const signature = res.signature as string;
      startMeeting(signature);
    } catch (e) {
      console.log(e);
    }
  };

  const startMeeting = (signature: string) => {
    document.getElementById("zmmtg-root")!.style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: (success: unknown) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          zak: zakToken,
          success: (success: unknown) => {
            console.log(success);
            // Show notification when meeting is successfully joined

            // alert("success");

            // Show message overlay after joining the meeting
            showOverlayMessage("Welcome to the Zoom meeting!");

            // Show input field overlay after meeting success
            showInputFieldOverlay();

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
    <Container className="App" maxWidth="sm">
      <Box component="main" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Zoom Meeting SDK Sample React3
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={getSignature}>
          Join Meeting
        </Button>
      </Box>
    </Container>
  );
};

export default Sample;
