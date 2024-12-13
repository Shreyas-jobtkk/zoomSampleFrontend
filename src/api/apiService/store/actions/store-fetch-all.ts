// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const fetchStoreAll = async () => {
  try {
    const response = await api.get(STORE_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching user data");
    }
  }
};
