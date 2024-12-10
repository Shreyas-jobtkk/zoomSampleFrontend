// store-api-service.ts
import axios from "axios";
import { STORE_ENDPOINT } from "../store-api-definitions"; // Define the correct endpoint here
import api from "../../../index"; // Assuming you're using a central API file to configure axios

// Create store function
export const createStore = async (
  company_no: string,
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
  note: string,
  company_delete: boolean,
  store_delete: boolean
) => {
  try {
    // Concatenate zip1 and zip2
    const zip = `${zip1}-${zip2}`;

    const response = await api.post(STORE_ENDPOINT, {
      company_no,
      store_name,
      store_name_furigana,
      zip,
      pref,
      city,
      street,
      building_name,
      tel: `${tel1}-${tel2}-${tel3}`,
      fax: `${fax1}-${fax2}-${fax3}`,
      note,
      company_delete,
      store_delete,
    });
    alert("Store saved successfully");
    return response.data; // Return the created store data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to save store: " + error.message);
    } else {
      throw new Error("An unknown error occurred while saving the store");
    }
  }
};
