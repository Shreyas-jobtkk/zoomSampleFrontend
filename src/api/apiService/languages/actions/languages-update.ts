// language-update.ts
import { LANGUAGE_ENDPOINT } from "../languages-api-definitions";
import api from "../../../index";

export const updateLanguage = async (
  id: string,
  languageName: string,
  languageNameFurigana: string,
  note: string
) => {
  try {
    const response = await api.put(`/${LANGUAGE_ENDPOINT}/${id}`, {
      language_name: languageName,
      language_name_furigana: languageNameFurigana,
      language_note: note,
    });
    alert("Language updated successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to update language: " + error.message);
    } else {
      throw new Error("An unknown error occurred while updating the language");
    }
  }
};
