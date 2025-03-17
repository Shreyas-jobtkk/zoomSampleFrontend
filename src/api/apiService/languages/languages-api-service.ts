// todo-api-service.ts
import { fetchLanguage } from "../languages/actions/languages-fetch";
import { createLanguage } from "../languages/actions/languages-create";
import { updateLanguage } from "../languages/actions/languages-update";
import { deleteLanguages } from "../languages/actions/languages-delete";
import { restoreLanguages } from "../languages/actions/language-restore";
import { fetchLanguagesAll } from "../languages/actions/languages-fetch-all";
import { fetchLanguagesAllNames } from "../languages/actions/language-fetch-all-name-details";

export const LanguageApiService = {
  fetchLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguages,
  fetchLanguagesAll,
  fetchLanguagesAllNames,
  restoreLanguages,
};
