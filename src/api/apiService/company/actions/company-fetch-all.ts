// todo-create.ts
import { COMPANY_ENDPOINT } from "../company-api-definitions";
import api from "../../../index";

export const fetchCompaniesAll = async (
  page: number | string,
  limit: number | string,
  company_no_min: number | string,
  company_no_max: number | string,
  company_name: string,
  company_name_furigana: string
) => {
  try {
    const response = await api.get(COMPANY_ENDPOINT, {
      params: {
        page,
        limit,
        company_no_min,
        company_no_max,
        company_name,
        company_name_furigana,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching user data");
    }
  }
};
