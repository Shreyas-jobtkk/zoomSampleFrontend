// store-api-service.ts
import axios from "axios";
import { STORE_ENDPOINT } from "../store-api-definitions"; // Define the correct endpoint here
import api from "../../../index"; // Assuming you're using a central API file to configure axios

// Create store function
export const createStore = async (
  company_no: string,
  store_name: string,
  store_name_furigana: string,
  zip1: number | string,
  zip2: number | string,
  pref: string,
  city: string,
  street: string,
  building_name: string,
  tel1: number | string,
  tel2: number | string,
  tel3: number | string,
  fax1: number | string,
  fax2: number | string,
  fax3: number | string,
  note: string
) => {
  console.log(1112);
  try {
    // Concatenate zip1 and zip2

    // const zip = `${zip1}-${zip2}`;

    const response = await api.post(STORE_ENDPOINT, {
      company_no,
      store_name,
      store_name_furigana,
      zip: `${zip1}-${zip2}`,
      pref,
      city,
      street,
      building_name,
      tel: `${tel1}-${tel2}-${tel3}`,
      fax: `${fax1}-${fax2}-${fax3}`,
      note,
    });
    console.log(1113);
    alert("Store saved successfully");
    return response.data; // Return the created store data
  } catch (error: unknown) {
    console.log(1114);
    if (error instanceof Error) {
      throw new Error("Failed to save store: " + error.message);
    } else {
      throw new Error("An unknown error occurred while saving the store");
    }
  }
};
