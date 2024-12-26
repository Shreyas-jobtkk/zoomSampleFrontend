import io from "socket.io-client";
import { homePage } from "../../components/constants";

const socket = io(homePage);

const messageQueue: string[] = [];
const activeOverlays: HTMLElement[] = [];

export const showOverlayMessage = (message: string) => {
  const processMessage = (message: string) => {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.left = "100%"; // Start from the right side of the screen
    overlay.style.transform = "translateX(-100%)"; // Initially hidden
    overlay.style.backgroundColor = "transparent";
    overlay.style.color = "#fff";
    overlay.style.padding = "10px";
    overlay.style.borderRadius = "5px";
    overlay.style.fontSize = "50px";
    overlay.style.zIndex = "1000"; // Appear above other content
    // overlay.style.whiteSpace = "nowrap"; // Display text in one line
    overlay.innerText = message;
    const randomTopValue = Math.floor(Math.random() * window.innerHeight); // Generates a random number between 0 and screen height
    overlay.style.top = `${randomTopValue * 0.8}px`;

    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.appendChild(overlay);
      activeOverlays.push(overlay);

      // Animate the overlay
      let start = Date.now();
      const duration = 5000; // Duration for the animation
      const moveOverlay = () => {
        const elapsed = Date.now() - start;
        const progress = elapsed / duration;
        if (progress < 1) {
          overlay.style.left = `calc(100% - ${progress * 100}%)`;
          requestAnimationFrame(moveOverlay);
        } else {
          // Remove overlay after animation
          zoomContainer.removeChild(overlay);
          activeOverlays.splice(activeOverlays.indexOf(overlay), 1);
          // updateOverlayPositions(); // Update remaining overlays
        }
      };
      moveOverlay();
    }
  };

  // Add the message to the queue
  messageQueue.push(message);
  console.log(166667, messageQueue);
  processMessage(message);
};

export const showInputFieldOverlay = () => {
  const inputContainer = document.createElement("div");
  inputContainer.id = "input-field-overlay"; // Set a unique ID for easy selection
  inputContainer.style.position = "absolute";
  inputContainer.style.top = "150px"; // Position it below the message
  inputContainer.style.right = "-200px";
  inputContainer.style.transform = "translateX(-50%)";
  inputContainer.style.zIndex = "9999"; // Make sure it appears above other content

  // Create the input field
  const inputField = document.createElement("input");
  inputField.style.padding = "10px";
  inputField.style.fontSize = "16px";
  inputField.style.borderRadius = "5px";
  inputField.style.border = "1px solid #ccc";
  inputField.placeholder = "Enter your message";
  inputField.style.width = "400px";

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.innerHTML = "&#10148;"; // HTML entity for check mark
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
      socket.emit("zoomMessage", inputValue);
    } else {
      console.log("Input is empty");
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

export const hideInputFieldOverlay = () => {
  const zoomContainer = document.getElementById("zmmtg-root");
  if (zoomContainer) {
    // Find the input container using the unique ID
    const inputContainer = zoomContainer.querySelector("#input-field-overlay");
    if (inputContainer) {
      zoomContainer.removeChild(inputContainer); // Remove the input container
    }
  }
};
