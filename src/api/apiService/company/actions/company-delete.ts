import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

/**
 * Deletes companies by sending a DELETE request to the API.
 */
export const deleteCompanies = async (company_nos: number[]) => {
  try {
    const response = await api.delete(`/${COMPANY_ENDPOINT}`, {
      data: { company_nos }, // Pass the array in the request body
    });
    alert("Companies deleted successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while deleting the companies."
      );
    }
  }
};
