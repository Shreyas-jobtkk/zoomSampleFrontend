// language-fetch.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

export const fetchLanguage = async (id: number) => {
  try {
    const response = await api.get(`/${LANGUAGE_ENDPOINT}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch language: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the language");
    }
  }
};
