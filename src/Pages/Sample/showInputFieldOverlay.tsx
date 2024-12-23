const messageQueue: { message: string; topOffset: number }[] = [];
const activeOverlays: HTMLElement[] = [];
const baseTopOffset = 200; // Initial top offset
const verticalSpacing = 100; // Spacing between messages

const showOverlayMessage = (message: string) => {
  const calculateBottomOffset = (topOffset: number): number => {
    const zoomContainer = document.getElementById("zmmtg-root");
    const containerHeight = zoomContainer
      ? zoomContainer.offsetHeight
      : window.innerHeight; // Fallback to window height if no container
    return containerHeight - topOffset;
  };

  const bottomOffset = calculateBottomOffset(baseTopOffset);
  console.log(255, bottomOffset);

  // const updateOverlayPositions = () => {
  //   let currentTopOffset = baseTopOffset; // Start from the base top offset

  //   // Loop through all active overlays and reposition them
  //   activeOverlays.forEach((overlay, index) => {
  //     let newTopOffset = currentTopOffset; // Position for this overlay
  //     let bottomOffset = calculateBottomOffset(newTopOffset); // Calculate bottom offset for this position

  //     // If the bottomOffset is less than 100px, reset the top to start from 100px
  //     while (bottomOffset < 100) {
  //       newTopOffset = 100; // Reset to minimum top offset
  //       bottomOffset = calculateBottomOffset(newTopOffset); // Recalculate the bottom offset
  //     }

  //     // Set the overlay's top position
  //     overlay.style.top = `${newTopOffset}px`;

  //     // Update the currentTopOffset for the next overlay
  //     currentTopOffset = newTopOffset + verticalSpacing; // Increment for next overlay
  //     console.log(255, bottomOffset);
  //   });
  // };

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
    overlay.style.zIndex = "100"; // Appear above other content
    // overlay.style.whiteSpace = "nowrap"; // Display text in one line
    overlay.innerText = message;
    const randomTopValue = Math.floor(Math.random() * 500); // Generates a random number between 0 and 499
    overlay.style.top = `${randomTopValue}px`;
    // overlay.style.top = "250px";

    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.appendChild(overlay);
      activeOverlays.push(overlay);

      // Update positions of all overlays
      // updateOverlayPositions();

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
  messageQueue.push({
    message,
    topOffset: baseTopOffset + activeOverlays.length * verticalSpacing,
  });

  // Process all messages in the queue
  while (messageQueue.length > 0) {
    const { message } = messageQueue.shift()!;
    processMessage(message);
  }
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
