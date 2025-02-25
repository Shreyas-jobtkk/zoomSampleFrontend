export function convertToJST(date: string | Date | null): string | null {
  if (date === null || date === undefined) return null;

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return null; // Handle invalid date cases

  return dateObj.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

export function deleteStatus(isDeleted: Boolean): string {
  if (isDeleted === true) {
    return "ON";
  } else {
    return "OFF";
  }
}
