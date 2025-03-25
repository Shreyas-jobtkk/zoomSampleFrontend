// language-delete.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

/**
 * Deletes languages by sending a DELETE request to the API.
 */
export const deleteLanguages = async (language_nos: number[]) => {
  try {
    const response = await api.delete(`/${LANGUAGE_ENDPOINT}`, {
      data: { language_nos },
    });
    alert("Languages deleted successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete languages: " + error.message);
    } else {
      throw new Error("An unknown error occurred while deleting languages");
    }
  }
};
