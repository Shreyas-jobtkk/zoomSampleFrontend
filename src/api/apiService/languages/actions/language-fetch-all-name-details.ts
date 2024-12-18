import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

export const fetchLanguageNames = async () => {
  try {
    // Use the /names endpoint to fetch only language_name and languages_support_no
    const response = await api.get(`${LANGUAGE_ENDPOINT}/names`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch language names: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while fetching language names"
      );
    }
  }
};
