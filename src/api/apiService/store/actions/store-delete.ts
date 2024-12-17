// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const deleteStores = async (ids: number[]) => {
  console.log(139, ids); // You can remove this line in production

  try {
    const response = await api.delete(`/${STORE_ENDPOINT}`, {
      data: { ids }, // Pass the array of store IDs in the request body
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
