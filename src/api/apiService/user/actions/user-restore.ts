import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

export const restoreUsers = async (user_nos: number[]) => {
  try {
    const response = await api.put(`/${USER_ENDPOINT}/restore`, {
      user_nos, // Pass the array of user IDs in the request body
    });
    alert("Users restored successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to restore users: " + error.message);
    } else {
      throw new Error("An unknown error occurred while restoring users");
    }
  }
};
