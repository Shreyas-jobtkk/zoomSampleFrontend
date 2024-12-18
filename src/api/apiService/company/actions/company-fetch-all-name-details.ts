import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const fetchCompaniesNameDetails = async () => {
  console.log(1876);
  try {
    const response = await api.get(`${COMPANY_ENDPOINT}/names`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch company name details: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while fetching company name details"
      );
    }
  }
};
