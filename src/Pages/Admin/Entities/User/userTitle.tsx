export const userTitles = {
  interpreter: "通訳者",
  administrator: "管理者",
  contractor: "契約",
};

export const getUserTitle = (userType: string): string => {
  return userTitles[userType as keyof typeof userTitles] || "未定義";
};
