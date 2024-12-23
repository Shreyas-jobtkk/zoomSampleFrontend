import "emoji-picker-element";

export const showEmojiPicker = () => {
  // Create the emoji picker element
  const picker = document.createElement("emoji-picker");
  picker.id = "emoji-picker-overlay"; // Set a unique ID for easy selection

  // Style the picker for overlay positioning
  picker.style.position = "absolute";
  picker.style.top = "250px";
  picker.style.right = "50px";
  picker.style.zIndex = "99999";

  // Append the emoji picker to the container
  const zoomContainer = document.getElementById("zmmtg-root");
  if (zoomContainer) {
    zoomContainer.appendChild(picker);

    // Handle emoji selection
    picker.addEventListener("emoji-click", (event: any) => {
      const selectedEmoji = event.detail.unicode;

      // Append the selected emoji to an input field
      const inputField = document.querySelector("#your-input-field-id");
      if (inputField instanceof HTMLInputElement) {
        inputField.value += selectedEmoji;
      }

      // Create an emoji reaction animation
      createEmojiReactionAnimation(selectedEmoji, zoomContainer);
    });
  } else {
    console.error("Zoom container not found.");
  }
};

export const hideEmojiPicker = () => {
  const zoomContainer = document.getElementById("zmmtg-root");
  if (zoomContainer) {
    // Find the emoji picker using the unique ID
    const picker = zoomContainer.querySelector("#emoji-picker-overlay");
    if (picker) {
      zoomContainer.removeChild(picker); // Remove the emoji picker
    }
  }
};

// Function to create emoji reaction animation
const createEmojiReactionAnimation = (
  emoji: string,
  container: HTMLElement
) => {
  // Create a new element for the emoji reaction
  const emojiElement = document.createElement("div");
  emojiElement.textContent = emoji;

  // Style the emoji element
  emojiElement.style.position = "absolute";
  emojiElement.style.bottom = "0"; // Start from the bottom
  emojiElement.style.left = `${50 + getRandomOffset()}%`; // Randomize horizontal position
  emojiElement.style.transform = "translateX(-50%)"; // Center adjust
  emojiElement.style.fontSize = "2rem"; // Adjust size
  emojiElement.style.zIndex = "100000"; // Ensure it's above other elements
  emojiElement.style.animation = "moveUp 2s ease-out"; // Attach animation
  emojiElement.style.willChange = "transform, bottom, opacity"; // Optimize performance

  // Append the emoji to the container
  container.appendChild(emojiElement);

  // Remove the emoji after the animation ends
  emojiElement.addEventListener("animationend", () => {
    emojiElement.remove();
  });
};

// Utility function to generate a random horizontal offset
const getRandomOffset = (): number => {
  // Generate a random offset between -10 and +10
  return Math.random() * 20 - 10;
};

// Add CSS animation to the document
const style = document.createElement("style");
style.textContent = `
  @keyframes moveUp {
    0% {
      bottom: 0;
      transform: translateX(-50%);
      opacity: 1;
    }
    100% {
      bottom: 200px; /* Move upward by 200px */
      transform: translateX(-50%);
      opacity: 0; /* Fade out at the end */
    }
  }
`;
document.head.appendChild(style);
