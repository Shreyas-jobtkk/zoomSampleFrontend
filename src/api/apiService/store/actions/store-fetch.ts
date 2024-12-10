// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const fetchStore = async (id: number) => {
  try {
    const response = await api.get(`/${STORE_ENDPOINT}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching the company");
    }
  }
};
