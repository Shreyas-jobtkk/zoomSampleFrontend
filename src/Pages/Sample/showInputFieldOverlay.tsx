import { showOverlayMessage } from "./OverlayMessage"; // Import the function

export const showInputFieldOverlay = () => {
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
      showOverlayMessage("Please enter a message"); // Show an error message
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
