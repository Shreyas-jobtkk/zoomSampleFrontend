// todo-create.ts
import { CALLLOG_ENDPOINT } from "../callLog-api-definitions";
import api from "../../../index";

// Creates a call log entry by sending a POST request to the API.
export const createCallLog = async (
  interpreterNo: number | null,
  languagesSupportNo: number,
  contractNo: number,
  callDial: Date | null,
  callCanceled: Date | null,
  callStart: Date | null,
  callEnd: Date | null,
  callStatus: string | null,
  feedBack: number | null
) => {
  try {
    const response = await api.post(CALLLOG_ENDPOINT, {
      interpreter_no: interpreterNo,
      languages_support_no: languagesSupportNo,
      contract_no: contractNo,
      call_dial: callDial,
      call_canceled: callCanceled,
      call_start: callStart,
      call_end: callEnd,
      call_status: callStatus,
      feed_back: feedBack,
    });

    alert("Saved successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to save company: " + error.message);
    } else {
      throw new Error("An unknown error occurred while saving the company");
    }
  }
};
