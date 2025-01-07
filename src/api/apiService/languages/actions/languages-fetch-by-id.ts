import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

// Fetch multiple languages by an array of IDs
export const fetchLanguagesById = async (ids: number[]) => {
  try {
    const response = await api.post(`/${LANGUAGE_ENDPOINT}/batch`, { ids });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch languages: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the languages");
    }
  }
};
