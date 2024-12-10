// todo-create.ts
import axios from "axios";
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const createCompany = async (
  companyName: string,
  companyNameFurigana: string,
  note: string
) => {
  try {
    const response = await api.post(COMPANY_ENDPOINT, {
      company_name: companyName,
      company_name_furigana: companyNameFurigana,
      note: note,
    });
    alert("Saved successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to save company: " + error.message);
    } else {
      throw new Error("An unknown error occurred while saving the company");
    }
  }
};
