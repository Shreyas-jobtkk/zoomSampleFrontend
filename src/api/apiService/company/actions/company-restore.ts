import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

/**
 * Restores multiple companies by sending their company numbers to the API.
 */
export const restoreCompanies = async (company_nos: number[]) => {
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
