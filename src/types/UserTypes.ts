// types.ts

export interface UserCreateFormValues {
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
  password_expire: Date | string;
  user_password: string;
  user_password_confirm: string;
  user_note: string;
  translate_languages: any;
}

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
  password_expire: Date | string;
  user_password: string;
  user_password_confirm: string;
  user_note: string;
  updated_at: Date | string;
  created_at: Date | string;
  user_deleted: Boolean;
  translate_languages: any;
}

export interface UserAuth {
  mail_address: string;
  user_password: string;
}
