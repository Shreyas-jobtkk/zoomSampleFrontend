import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const restoreStores = async (store_nos: number[]) => {
  try {
    const response = await api.put(`/${STORE_ENDPOINT}/restore`, {
      store_nos, // Pass the array of store IDs in the request body
    });
    alert("Stores restored successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to restore: " + error.message);
    } else {
      throw new Error("An unknown error occurred while restoring the stores.");
    }
  }
};
