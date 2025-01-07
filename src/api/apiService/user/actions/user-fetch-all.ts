// user-fetch-all.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

export const fetchUsersAll = async () => {
  try {
    const response = await api.get(USER_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching user data");
    }
  }
};
