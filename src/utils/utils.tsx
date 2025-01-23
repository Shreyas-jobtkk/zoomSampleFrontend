// import { useNavigate } from "react-router-dom";

export function convertToJST(date: string | Date): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

export function deleteStatus(isDeleted: Boolean): string {
  if (isDeleted === true) {
    return "ON";
  } else {
    return "OFF";
  }
}

export function isManualUrl(): boolean {
  // const navigate = useNavigate();
  const navigationEntries = window.performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];

  console.log(1589, navigationEntries);

  // Check if the navigation type is 'navigate' (which indicates the user manually typed the URL)
  if (
    navigationEntries.length > 0 &&
    navigationEntries[0].type === "navigate"
  ) {
    return true;
  } else return false;
}
