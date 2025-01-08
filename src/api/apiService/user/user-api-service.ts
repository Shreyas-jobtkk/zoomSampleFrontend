// user-api-service.ts
import { fetchUser } from "../user/actions/user-fetch";
import { createUser } from "../user/actions/user-create";
import { updateUser } from "../user/actions/user-update";
import { deleteUsers } from "../user/actions/user-delete";
import { fetchInterpretersAll } from "./actions/interpreter-fetch-all";
import { fetchContractorAll } from "./actions/contractor-fetch-all";
import { fetchAdministratorAll } from "./actions/administrator-fetch-all";

export const UserApiService = {
  fetchUser,
  createUser,
  updateUser,
  deleteUsers,
  fetchInterpretersAll,
  fetchContractorAll,
  fetchAdministratorAll,
};
