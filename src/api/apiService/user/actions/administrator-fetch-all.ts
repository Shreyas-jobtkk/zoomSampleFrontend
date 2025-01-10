// user-fetch-all.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";
import axios from "axios";

export const fetchAdministratorAll = async () => {
  console.log(1567);
  try {
    const response = await api.get(`${USER_ENDPOINT}/administrator`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching user data");
    }
  }
};

export const administratorAuth = async (email: string, password: string) => {
  console.log(1567777);
  try {
    const response = await api.post(`${USER_ENDPOINT}/administrator/auth`, {
      mail_address: email,
      user_password: password,
    });
    console.log("Response status:", response.status);
    return response.data;
  } catch (error: unknown) {
    console.error("Error during authentication:", error);

    // Handle Axios errors specifically
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status outside the 2xx range
        console.error("Server Error:", {
          status: error.response.status,
          data: error.response.data,
        });
        return {
          success: false,
          message: `Authentication failed. Status: ${error.response.status}`,
          data: error.response.data,
        };
      } else {
        console.log(12567, error.request);
        // No response was received
        console.error("Network Error: No response received.", error.request);
        return {
          success: false,
          message: "Network error: Unable to reach the server.",
        };
      }
    }
  }
};
