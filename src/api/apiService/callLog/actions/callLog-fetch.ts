// todo-create.ts
import { CALLLOG_ENDPOINT } from "../callLog-api-definitions";

import api from "../../../index";

export const fetchCallLog = async (
  page: number,
  limit: number,
  contract_no: number | string,
  interpreter_no: number | string,
  lang_no: string,
  start_time: string,
  end_time: string,
  call_status?: string
) => {
  try {
    const response = await api.get(CALLLOG_ENDPOINT, {
      params: {
        page,
        limit,
        contract_no,
        interpreter_no,
        lang_no,
        start_time,
        end_time,
        call_status,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch callLog data: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching callLog data");
    }
  }
};
