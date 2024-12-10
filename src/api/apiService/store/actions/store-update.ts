// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const updateCompany = async (
  id: number,
  companyName: string,
  companyNameFurigana: string,
  note: string
) => {
  try {
    const response = await api.put(`/${STORE_ENDPOINT}/${id}`, {
      company_name: companyName,
      company_name_furigana: companyNameFurigana,
      note: note,
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
