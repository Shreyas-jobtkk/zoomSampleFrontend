// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

/**
 * Fetches all store details by sending a GET request to the API.
 */
export const fetchStoreAll = async (
  page: number,
  limit: number,
  company_no: number | string,
  store_no_min: number | string,
  store_no_max: number | string,
  store_name: string,
  store_name_furigana: string
) => {
  try {
    const response = await api.get(STORE_ENDPOINT, {
      params: {
        page,
        limit,
        company_no,
        store_no_min,
        store_no_max,
        store_name,
        store_name_furigana,
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
