// todo-create.ts
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

/**
 * Updates a company's details by sending a PUT request to the API.
 */
export const updateCompany = async (
  id: string,
  companyName: string,
  companyNameFurigana: string,
  note: string
) => {
  try {
    const response = await api.put(`/${COMPANY_ENDPOINT}/${id}`, {
      company_name: companyName,
      company_name_furigana: companyNameFurigana,
      company_note: note,
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
