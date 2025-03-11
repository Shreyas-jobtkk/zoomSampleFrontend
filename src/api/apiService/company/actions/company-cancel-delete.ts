// todo-create.ts
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const restoreCompanies = async (company_nos: number[]) => {
  console.log(139, company_nos);

  try {
    const response = await api.put(`/${COMPANY_ENDPOINT}/restore`, {
      company_nos,
    });
    alert("Companies restored successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to restore: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while restoring the companies."
      );
    }
  }
};
