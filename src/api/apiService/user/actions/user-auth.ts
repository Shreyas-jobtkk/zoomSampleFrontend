import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";
import axios from "axios";

/**
 *Function to authenticate a Administrator using email and password
 */
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

/**
 *Function to authenticate a contractor using email and password
 */
export const contractorAuth = async (email: string, password: string) => {
  try {
    const response = await api.post(`${USER_ENDPOINT}/contractor/auth`, {
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
        console.log(1567, error.response);
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

/**
 *Function to authenticate a Interpreters using email and password
 */
export const interpreterAuth = async (email: string, password: string) => {
  console.log(1567777);
  try {
    const response = await api.post(`${USER_ENDPOINT}/interpreter/auth`, {
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
