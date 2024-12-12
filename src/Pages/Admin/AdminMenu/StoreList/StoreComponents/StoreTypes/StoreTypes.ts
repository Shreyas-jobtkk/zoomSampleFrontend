// types.ts

export type StoreCreateFormValues = {
  company_no: string;
  store_name: string;
  store_name_furigana: string;
  zip1: string | number;
  zip2: string | number;
  pref: string;
  city: string;
  street: string;
  building_name: string;
  tel1: string | number;
  tel2: string | number;
  tel3: string | number;
  fax1: string | number;
  fax2: string | number;
  fax3: string | number;
  note: string;
};

export interface CompanyInfoFormValues {
  company_no: string;
  company_name: string;
  company_name_furigana: string;
  company_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  company_deleted: Boolean;
}
