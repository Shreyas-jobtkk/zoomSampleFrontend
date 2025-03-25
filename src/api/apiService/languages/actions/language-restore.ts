import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

/**
 * Restores multiple languages by sending their company numbers to the API.
 */
export const restoreLanguages = async (language_nos: number[]) => {
  try {
    const response = await api.put(`/${LANGUAGE_ENDPOINT}/restore`, {
      language_nos, // Send the array of language IDs
    });
    alert("Languages restored successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to restore languages: " + error.message);
    } else {
      throw new Error("An unknown error occurred while restoring languages.");
    }
  }
};
