// user-create.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

export const createUser = async (
  storeNo: string,
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
  userType: string, // user_type is fixed in backend as "interpreter"
  note: string,
  languages: number[] | null, // Ensure this is an array of integers
  passwordExpire: Date,
  meetingId: string | null,
  meetingPasscode: string | null
) => {
  try {
    // Combine the tel1, tel2, and tel3 into a single string
    // const tel = `${tel1}-${tel2}-${tel3}`; // Remove trailing hyphen if present

    const response = await api.post(USER_ENDPOINT, {
      store_no: storeNo,
      user_name_last: userNameLast,
      user_name_last_furigana: userNameLastFurigana, // Added new field
      user_name_first: userNameFirst,
      user_name_first_furigana: userNameFirstFurigana, // Added new field
      user_type: userType, // This is fixed as "interpreter"
      mail_address: mailAddress,
      tel: `${tel1}-${tel2}-${tel3}`, // Send the combined telephone number
      tel_extension: telExtension, // Send telExtension
      translate_languages: languages, // Send languages array as integers
      password_expire: passwordExpire,
      user_password: password,
      meeting_id: meetingId,
      meeting_passcode: meetingPasscode,
      user_note: note,
    });

    console.log(155);

    alert("User created successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to create user: " + error.message);
    } else {
      throw new Error("An unknown error occurred while creating the user");
    }
  }
};
