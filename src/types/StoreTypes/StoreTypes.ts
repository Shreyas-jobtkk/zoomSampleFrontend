// types.ts

export type StoreCreateFormValues = {
  company_no: string;
  company_name: string;
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
  store_note: string;
};

export interface StoreInfo {
  company_no: string;
  company_name: string;
  store_no: string;
  store_name: string;
  store_name_furigana: string;
  zip: string | number;
  pref: string;
  city: string;
  street: string;
  building_name: string;
  tel: string | number;
  fax: string | number;
  store_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  store_delete: Boolean;
}

export type StoreInfoFormValues = {
  company_no: string;
  company_name: string;
  store_no: string;
  store_name: string;
  store_name_furigana: string;
  zip1: string;
  zip2: string;
  pref: string;
  city: string;
  street: string;
  building_name: string;
  tel1: string;
  tel2: string;
  tel3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  store_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  store_delete: Boolean;
};
