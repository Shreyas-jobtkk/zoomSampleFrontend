import * as React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { Box, Typography, Button, Container, TextField } from "@mui/material";

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

  // Function to show overlay message
  const showOverlayMessage = (message: string) => {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "100px"; // Position it at the top of the screen
    overlay.style.left = "100%"; // Start from the right side of the screen
    overlay.style.transform = "translateX(-100%)"; // Initially hidden
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.color = "#fff";
    overlay.style.padding = "10px";
    overlay.style.borderRadius = "5px";
    overlay.style.fontSize = "18px";
    overlay.style.zIndex = "9999"; // Make sure it appears above other content
    overlay.innerText = message;

    // Append the message overlay to the Zoom container
    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.appendChild(overlay);

      // Animate the overlay to move from right to left
      let start = Date.now();
      const duration = 15000; // Duration for the animation
      const moveOverlay = () => {
        const elapsed = Date.now() - start;
        const progress = elapsed / duration;
        if (progress < 1) {
          overlay.style.left = `calc(100% - ${progress * 100}%)`;
          requestAnimationFrame(moveOverlay);
        } else {
          // After the animation finishes, remove the overlay
          zoomContainer.removeChild(overlay);
        }
      };
      moveOverlay();
    }
  };

  // Function to show input field overlay
  const showInputFieldOverlay = () => {
    const inputContainer = document.createElement("div");
    inputContainer.style.position = "absolute";
    inputContainer.style.bottom = "100px"; // Position it below the message
    inputContainer.style.right = "50px";
    inputContainer.style.transform = "translateX(-50%)";
    inputContainer.style.zIndex = "9999"; // Make sure it appears above other content

    // Create the input field
    const inputField = document.createElement("input");
    inputField.style.padding = "10px";
    inputField.style.fontSize = "16px";
    inputField.style.borderRadius = "5px";
    inputField.style.border = "1px solid #ccc";
    inputField.placeholder = "Enter your message";

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.padding = "10px 20px";
    submitButton.style.fontSize = "16px";
    submitButton.style.marginLeft = "10px";
    submitButton.style.cursor = "pointer";
    submitButton.style.borderRadius = "5px";
    submitButton.style.backgroundColor = "#4CAF50";
    submitButton.style.color = "#fff";
    submitButton.style.border = "none";

    // Handle form submission
    submitButton.onclick = (event) => {
      event.preventDefault(); // Prevent page refresh

      // Get the input value
      const inputValue = inputField.value;
      if (inputValue) {
        console.log("Submitted value:", inputValue); // Here you can handle the submitted value
        showOverlayMessage(` ${inputValue}`); // Show a confirmation message
      } else {
        console.log("Input is empty");
        showOverlayMessage("Please enter a message before submitting."); // Show an error message
      }

      // Optionally, you can reset the input field or remove the overlay
      inputField.value = ""; // Clear the input field
    };

    // Add the input field and submit button to the container
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);

    // Append the input container to the Zoom container
    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.appendChild(inputContainer);
    }
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
