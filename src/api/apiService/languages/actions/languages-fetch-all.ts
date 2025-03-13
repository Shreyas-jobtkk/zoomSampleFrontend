// language-fetch-all.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

export const fetchLanguagesAll = async (
  page: number,
  limit: number,
  language_no_min: number | string,
  language_no_max: number | string,
  language_name: string,
  language_name_furigana: string
) => {
  try {
    const response = await api.get(LANGUAGE_ENDPOINT, {
      params: {
        page,
        limit,
        language_no_min,
        language_no_max,
        language_name,
        language_name_furigana,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch languages: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching languages");
    }
  }
};
