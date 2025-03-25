// language-create.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

/**
 * Creates a new language by sending a POST request to the API.
 */
export const createLanguage = async (
  languageName: string,
  languageNameFurigana: string,
  note: string
) => {
  console.log(189);
  try {
    const response = await api.post(LANGUAGE_ENDPOINT, {
      language_name: languageName,
      language_name_furigana: languageNameFurigana,
      language_note: note,
    });
    alert("Language created successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to create language: " + error.message);
    } else {
      throw new Error("An unknown error occurred while creating the language");
    }
  }
};
