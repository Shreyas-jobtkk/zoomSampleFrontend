// user-update.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

export const updateUser = async (
  userNo: string,
  userNameLast: string,
  userNameLastFurigana: string, // New parameter
  userNameFirst: string,
  userNameFirstFurigana: string, // New parameter
  mailAddress: string,
  password: string,
  tel1: string | number, // Telephone part 1
  tel2: string | number, // Telephone part 2
  tel3: string | number, // Telephone part 3
  telExtension: string | number, // Telephone extension
  note: string,
  languages: number[] | null, // Ensure this is an array of integers

  storeNo: string
) => {
  try {
    const response = await api.put(`/${USER_ENDPOINT}/${userNo}`, {
      user_name_last: userNameLast,
      user_name_last_furigana: userNameLastFurigana, // Added new field
      user_name_first: userNameFirst,
      user_name_first_furigana: userNameFirstFurigana, // Added new field
      // user_type: userType, // This is fixed as "interpreter"
      mail_address: mailAddress,
      tel: `${tel1}-${tel2}-${tel3}`, // Send the combined telephone number
      tel_extension: telExtension, // Send telExtension
      translate_languages: languages, // Send languages array as integers
      // password_expire: passwordExpire,
      user_password: password,

      user_note: note,
      store_no: storeNo,
    });
    alert("User updated successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to update user: " + error.message);
    } else {
      throw new Error("An unknown error occurred while updating the user");
    }
  }
};

export const updateInterpreterStatus = async (
  interpreterNo: string | null,
  interpreterStatus: string
) => {
  console.log(155, interpreterNo, interpreterStatus);
  try {
    const response = await api.put(
      `/${USER_ENDPOINT}/interpreter/${interpreterNo}`,
      {
        interpreter_status: interpreterStatus,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to update user: " + error.message);
    } else {
      throw new Error("An unknown error occurred while updating the user");
    }
  }
};
