// types.ts

export type LanguageCreateFormValues = {
  language_name: string;
  language_note: string;
  language_name_furigana: string;
};

export interface LanguageInfo {
  languages_support_no: string | number;
  language_name: string;
  language_name_furigana: string;
  language_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  language_deleted: Boolean;
}
