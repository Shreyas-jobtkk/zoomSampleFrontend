// todo-api-service.ts
import { fetchLanguage } from "../languages/actions/languages-fetch";
import { createLanguage } from "../languages/actions/languages-create";
import { updateLanguage } from "../languages/actions/languages-update";
import { deleteLanguages } from "../languages/actions/languages-delete";
import { fetchLanguagesAll } from "../languages/actions/languages-fetch-all";
import { fetchLanguageNames } from "../languages/actions/language-fetch-all-name-details";
import { fetchLanguagesById } from "../languages/actions/languages-fetch-by-id";

export const LanguageApiService = {
  fetchLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguages,
  fetchLanguagesAll,
  fetchLanguageNames,
  fetchLanguagesById,
};
