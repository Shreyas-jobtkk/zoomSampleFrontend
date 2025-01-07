// user-delete.ts
import { USER_ENDPOINT } from "../user-api-definitions";
import api from "../../../index";

export const deleteUsers = async (ids: number[]) => {
  try {
    const response = await api.delete(`/${USER_ENDPOINT}`, { data: { ids } });
    alert("Users deleted successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete users: " + error.message);
    } else {
      throw new Error("An unknown error occurred while deleting users");
    }
  }
};
