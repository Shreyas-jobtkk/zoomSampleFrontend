const messageQueue: { message: string; topOffset: number }[] = [];
const activeOverlays: HTMLElement[] = [];
const baseTopOffset = 200; // Initial top offset
const verticalSpacing = 100; // Spacing between messages

export const showOverlayMessage = (message: string) => {
  const calculateBottomOffset = (topOffset: number): number => {
    const zoomContainer = document.getElementById("zmmtg-root");
    const containerHeight = zoomContainer
      ? zoomContainer.offsetHeight
      : window.innerHeight; // Fallback to window height if no container
    return containerHeight - topOffset;
  };

  const bottomOffset = calculateBottomOffset(baseTopOffset);
  console.log(255, bottomOffset);

  const updateOverlayPositions = () => {
    let currentTopOffset = baseTopOffset; // Start from the base top offset

    // Loop through all active overlays and reposition them
    activeOverlays.forEach((overlay, index) => {
      let newTopOffset = currentTopOffset; // Position for this overlay
      let bottomOffset = calculateBottomOffset(newTopOffset); // Calculate bottom offset for this position

      // If the bottomOffset is less than 100px, reset the top to start from 100px
      while (bottomOffset < 100) {
        newTopOffset = 100; // Reset to minimum top offset
        bottomOffset = calculateBottomOffset(newTopOffset); // Recalculate the bottom offset
      }

      // Set the overlay's top position
      overlay.style.top = `${newTopOffset}px`;

      // Update the currentTopOffset for the next overlay
      currentTopOffset = newTopOffset + verticalSpacing; // Increment for next overlay
      console.log(255, bottomOffset);
    });
  };

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
    overlay.style.whiteSpace = "nowrap"; // Display text in one line
    overlay.innerText = message;

    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.appendChild(overlay);
      activeOverlays.push(overlay);

      // Update positions of all overlays
      updateOverlayPositions();

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
          updateOverlayPositions(); // Update remaining overlays
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
