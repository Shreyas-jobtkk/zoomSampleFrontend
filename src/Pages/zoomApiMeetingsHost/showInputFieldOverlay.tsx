import io from "socket.io-client";
import { apiUrl } from "../../apiUrl";

const socket = io(apiUrl);

const messageQueue: string[] = [];
const activeOverlays: HTMLElement[] = [];

export const showOverlayMessage = (message: string) => {
  const processMessage = (message: string) => {
    // Calculate the animation duration based on the queue length
    const duration = Math.max(2000, 5000 - messageQueue.length * 200); // Slower for fewer messages, faster for more messages

    // Create a new overlay div element
    const overlay = document.createElement("div");

    // Function to generate a random text color
    const getRandomColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random hex color
      return `#${randomColor}`; // Return the color in hex format
    };

    // Set initial styles for the overlay
    overlay.style.position = "absolute"; // Position it absolutely within the container
    overlay.style.left = "100%"; // Start from the right side of the screen
    overlay.style.transform = "translateX(-100%)"; // Initially hidden outside the screen
    overlay.style.backgroundColor = "transparent"; // Transparent background
    overlay.style.color = getRandomColor(); // Random text color
    overlay.style.padding = "10px"; // Add padding for better readability
    overlay.style.borderRadius = "5px"; // Rounded corners for better appearance
    overlay.style.fontSize = "50px"; // Large font size for visibility
    overlay.style.zIndex = "1000"; // Ensure it appears above other content
    overlay.innerText = message; // Set the message text

    // Initialize the top value
    let newTopValue = 100; // Start at 100px

    // If there's a previous overlay, increment the top value by 100px, or reset if it's over 80% of the screen height
    if (activeOverlays.length > 0) {
      newTopValue = activeOverlays[activeOverlays.length - 1].offsetTop + 100;
    }

    // If the new top value exceeds 80% of the viewport height, reset to 100px
    if (newTopValue > window.innerHeight * 0.8) {
      newTopValue = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
    }

    overlay.style.top = `${newTopValue}px`; // Set the new top value

    // Get the Zoom Meeting container element
    const zoomContainer = document.getElementById("zmmtg-root");

    if (zoomContainer) {
      // Append the overlay to the Zoom container
      zoomContainer.appendChild(overlay);
      activeOverlays.push(overlay); // Track active overlays

      // Animation settings
      let start = Date.now();

      // Function to animate the overlay moving from right to left
      const moveOverlay = () => {
        const elapsed = Date.now() - start; // Calculate elapsed time
        const progress = elapsed / duration; // Normalize progress (0 to 1)

        if (progress < 1) {
          // Move overlay gradually from right to left
          overlay.style.left = `calc(100% - ${progress * 100}%)`;
          requestAnimationFrame(moveOverlay); // Continue animation
        } else {
          // Remove overlay after animation is complete
          zoomContainer.removeChild(overlay);
          activeOverlays.splice(activeOverlays.indexOf(overlay), 1); // Remove from active list

          // Remove the processed message from the queue
          const index = messageQueue.indexOf(message);
          if (index !== -1) {
            messageQueue.splice(index, 1);
          }

          console.log("Updated messageQueue:", messageQueue);
        }
      };

      moveOverlay(); // Start the animation
    }
  };

  // Add the message to the queue
  messageQueue.push(message);
  console.log("MessageQueue before processing:", messageQueue);
  processMessage(message);
};

export const showInputFieldOverlay = () => {
  const inputContainer = document.createElement("div");
  inputContainer.id = "input-field-overlay"; // Set a unique ID for easy selection
  inputContainer.style.position = "absolute";
  inputContainer.style.top = "150px"; // Position it below the message
  inputContainer.style.right = "-120px";
  inputContainer.style.transform = "translateX(-50%)";
  inputContainer.style.zIndex = "9999"; // Make sure it appears above other content

  // Create the input field
  const inputField = document.createElement("textarea");
  inputField.style.padding = "10px";
  inputField.style.fontSize = "16px";
  inputField.style.borderRadius = "5px";
  inputField.style.border = "1px solid #ccc";
  inputField.placeholder = "Enter your message";
  inputField.style.width = "200px";
  inputField.style.scale = "1.1";

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.innerHTML = "&#10148;"; // HTML entity for check mark
  submitButton.style.padding = "10px 20px";
  submitButton.style.fontSize = "16px";
  submitButton.style.marginLeft = "-32px";
  submitButton.style.cursor = "pointer";
  submitButton.style.borderRadius = "5px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "#fff";
  submitButton.style.border = "none";
  submitButton.style.scale = "0.5";

  // Function to handle input submission
  const handleSubmit = () => {
    const inputValue = inputField.value.trim();
    if (inputValue) {
      console.log("Submitted value:", inputValue); // Handle the submitted value
      socket.emit("zoomMessage", inputValue);
      inputField.value = ""; // Clear the input field
    } else {
      console.log("Input is empty");
    }
  };

  // Handle click event on submit button
  submitButton.onclick = (event) => {
    event.preventDefault(); // Prevent page refresh
    handleSubmit();
  };

  // Handle Enter key press in the input field
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line in input
      handleSubmit();
    }
  });

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
