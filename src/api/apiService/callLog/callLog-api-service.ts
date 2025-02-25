// todo-api-service.ts
import { createCallLog } from "./actions/callLog-create";
import { fetchCallLog } from "./actions/callLog-fetch";

export const CallLogApiService = {
  createCallLog,
  fetchCallLog,
};
