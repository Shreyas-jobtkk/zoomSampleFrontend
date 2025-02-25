// todo-create.ts
import { CALLLOG_ENDPOINT } from "../callLog-api-definitions";

import api from "../../../index";

export const fetchCallLog = async () => {
  try {
    const response = await api.get(CALLLOG_ENDPOINT);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch callLog data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching callLog data");
    }
  }
};
