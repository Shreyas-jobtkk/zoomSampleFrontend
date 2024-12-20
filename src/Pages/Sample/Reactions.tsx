import "emoji-picker-element";

export const showInputFieldOverlayWithEmojiPicker = () => {
  const input = document.querySelector("input");
  const picker = document.createElement("emoji-picker");
  input?.after(picker);

  if (input) {
    input.style.position = "absolute";
    input.style.bottom = "200px"; // Position it below the message
    input.style.right = "50px";
    input.style.transform = "translateX(-50%)";
    input.style.zIndex = "9999"; // Make sure it appears above other content
  }

  const zoomContainer = document.getElementById("zmmtg-root");
  if (zoomContainer && input) {
    zoomContainer.appendChild(input);
  }
};
