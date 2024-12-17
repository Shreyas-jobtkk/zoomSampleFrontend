// language-fetch-all.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

export const fetchLanguagesAll = async () => {
  try {
    const response = await api.get(LANGUAGE_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch languages: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching languages");
    }
  }
};
