// types.ts

export type CompanyCreateFormValues = {
  company_name: string;
  company_note: string;
  company_name_furigana: string;
};

export interface CompanyInfo {
  company_no: string;
  company_name: string;
  company_name_furigana: string;
  company_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  company_deleted: Boolean;
}
