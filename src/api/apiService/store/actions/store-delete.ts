// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

/**
 * Deletes Stores by sending a DELETE request to the API.
 */
export const deleteStores = async (store_nos: number[]) => {
  console.log(139, store_nos); // You can remove this line in production

  try {
    const response = await api.delete(`/${STORE_ENDPOINT}`, {
      data: { store_nos }, // Pass the array of store IDs in the request body
    });
    alert("Stores deleted successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete: " + error.message);
    } else {
      throw new Error("An unknown error occurred while deleting the stores.");
    }
  }
};
