import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const fetchStoreNamesByCompany = async (companyNo: string) => {
  try {
    // Adjusted the endpoint to match the backend route
    const response = await api.get(`${STORE_ENDPOINT}/company/${companyNo}`);
    console.log(345, response);

    return response.data; // Assuming the response contains the store details
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch store name details: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while fetching store name details"
      );
    }
  }
};
