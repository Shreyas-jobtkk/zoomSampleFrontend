// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const updateStore = async (
  company_no: string,
  // company_name: string, // Explicit type for string fields
  store_name: string,
  store_name_furigana: string,
  zip1: string,
  zip2: string,
  pref: string,
  city: string,
  street: string,
  building_name: string,
  tel1: string,
  tel2: string,
  tel3: string,
  fax1: string,
  fax2: string,
  fax3: string,
  store_note: string,
  store_no: string
) => {
  console.log(133);
  try {
    const response = await api.put(`/${STORE_ENDPOINT}/${store_no}`, {
      company_no: company_no,
      store_name: store_name,
      store_name_furigana: store_name_furigana,
      zip: `${zip1}-${zip2}`,
      pref: pref,
      city: city,
      street: street,
      building_name: building_name,
      tel: `${tel1}-${tel2}-${tel3}`,
      fax: `${fax1}-${fax2}-${fax3}`,
      store_note: store_note,
    });
    alert("Updated successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to update: " + error.message);
    } else {
      throw new Error("An unknown error occurred while updating the company");
    }
  }
};
