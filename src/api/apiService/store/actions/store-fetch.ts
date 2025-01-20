// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const fetchStore = async (store: number) => {
  console.log(1466);
  try {
    const response = await api.get(`/${STORE_ENDPOINT}/${store}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the store");
    }
  }
};
