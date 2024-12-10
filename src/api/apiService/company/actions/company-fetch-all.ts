// todo-create.ts
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const fetchCompaniesAll = async () => {
  try {
    const response = await api.get(COMPANY_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching user data");
    }
  }
};
