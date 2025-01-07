// types.ts

export type UserCreateFormValues = {
  company_no: string;
  company_name: string;
  store_no: string;
  store_name: string;
  user_name_last: string;
  user_name_last_furigana: string;
  user_name_first: string;
  user_name_first_furigana: string;
  mail_address: string;
  tel1: string | number;
  tel2: string | number;
  tel3: string | number;
  tel_extension: string | number;
  translate_languages: any;
  password_expire: Date | string;
  user_password: string;
  user_password_confirm: string;
  meeting_id: string;
  meeting_passcode: string;
  user_note: string;
};

export interface UserInfo {
  user_no: string;
  company_no: string;
  company_name: string;
  store_no: string;
  store_name: string;
  user_name_last: string;
  user_name_last_furigana: string;
  user_name_first: string;
  user_name_first_furigana: string;
  mail_address: string;
  tel1: string | number;
  tel2: string | number;
  tel3: string | number;
  tel_extension: string | number;
  translate_languages: any;
  password_expire: Date | string;
  user_password: string;
  user_password_confirm: string;
  meeting_id: string;
  meeting_passcode: string;
  user_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  user_deleted: Boolean;
}

export type UserInfoFormValues = {
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
