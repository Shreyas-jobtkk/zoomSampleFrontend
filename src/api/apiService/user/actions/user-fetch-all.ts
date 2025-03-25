import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

/**
 * Fetches all Administrator details by sending a GET request to the API.
 */
export const fetchAdministratorAll = async (
  page: number,
  limit: number,
  company_no: number | string,
  store_no: number | string,
  admin_no_min: number | string,
  admin_no_max: number | string,
  admin_name_first: string,
  admin_name_furigana_first: string,
  admin_name_last: string,
  admin_name_furigana_last: string
) => {
  console.log(1567);
  try {
    const response = await api.get(`${USER_ENDPOINT}/administrator`, {
      params: {
        page,
        limit,
        company_no,
        store_no,
        admin_no_min,
        admin_no_max,
        admin_name_first,
        admin_name_furigana_first,
        admin_name_last,
        admin_name_furigana_last,
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

/**
 * Fetches all Contractor details by sending a GET request to the API.
 */
export const fetchContractorAll = async (
  page: number,
  limit: number,
  company_no: number | string,
  store_no: number | string,
  contractor_no_min: number | string,
  contractor_no_max: number | string,
  contractor_name_first: string,
  contractor_name_furigana_first: string,
  contractor_name_last: string,
  contractor_name_furigana_last: string
) => {
  try {
    const response = await api.get(`${USER_ENDPOINT}/contractor`, {
      params: {
        page,
        limit,
        company_no,
        store_no,
        contractor_no_min,
        contractor_no_max,
        contractor_name_first,
        contractor_name_furigana_first,
        contractor_name_last,
        contractor_name_furigana_last,
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

/**
 * Fetches all Interpreters details by sending a GET request to the API.
 */
export const fetchInterpretersAll = async (
  page: number,
  limit: number,
  company_no: number | string,
  store_no: number | string,
  interpreter_no_min: number | string,
  interpreter_no_max: number | string,
  interpreter_name_first: string,
  interpreter_name_furigana_first: string,
  interpreter_name_last: string,
  interpreter_name_furigana_last: string,
  languages: any
) => {
  console.log(1567);
  try {
    const response = await api.get(`${USER_ENDPOINT}/interpreter`, {
      params: {
        page,
        limit,
        company_no,
        store_no,
        interpreter_no_min,
        interpreter_no_max,
        interpreter_name_first,
        interpreter_name_furigana_first,
        interpreter_name_last,
        interpreter_name_furigana_last,
        languages,
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
