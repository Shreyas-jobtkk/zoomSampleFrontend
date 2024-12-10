// todo-create.ts
import { STORE_ENDPOINT } from "../store-api-definitions";
import api from "../../../index";

export const deleteCompanies = async (ids: number[]) => {
  console.log(139, ids);

  try {
    const response = await api.delete(`/company`, {
      data: { ids }, // Pass the array in the request body
    });
    alert("Companies deleted successfully.");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete: " + error.message);
    } else {
      throw new Error(
        "An unknown error occurred while deleting the companies."
      );
    }
  }
};
