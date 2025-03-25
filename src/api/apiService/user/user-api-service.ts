// user-api-service.ts
import { fetchUser } from "../user/actions/user-fetch";
import { createUser } from "../user/actions/user-create";
import {
  updateUser,
  updateInterpreterStatus,
} from "../user/actions/user-update";
import { deleteUsers } from "../user/actions/user-delete";
import { restoreUsers } from "../user/actions/user-restore";
import {
  interpreterAuth,
  contractorAuth,
  administratorAuth,
} from "./actions/user-auth";

import {
  fetchAdministratorAll,
  fetchContractorAll,
  fetchInterpretersAll,
} from "./actions/user-fetch-all";

export const UserApiService = {
  fetchUser,
  createUser,
  updateUser,
  deleteUsers,
  fetchInterpretersAll,
  fetchContractorAll,
  fetchAdministratorAll,
  contractorAuth,
  interpreterAuth,
  administratorAuth,
  updateInterpreterStatus,
  restoreUsers,
};
