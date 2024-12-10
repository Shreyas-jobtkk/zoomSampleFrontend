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
