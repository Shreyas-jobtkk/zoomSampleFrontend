// user-fetch.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

/**
 * Fetches a single user details by sending a GET request to the API.
 */
export const fetchUser = async (id: number) => {
  try {
    const response = await api.get(`/${USER_ENDPOINT}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the user");
    }
  }
};
