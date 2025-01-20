// todo-create.ts
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const fetchCompany = async (company_no: number) => {
  try {
    const response = await api.get(`/${COMPANY_ENDPOINT}/${company_no}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the company");
    }
  }
};
