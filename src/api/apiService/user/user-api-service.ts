// user-api-service.ts
import { fetchUser } from "../user/actions/user-fetch";
import { createUser } from "../user/actions/user-create";
import { updateUser } from "../user/actions/user-update";
import { deleteUsers } from "../user/actions/user-delete";
import { fetchUsersAll } from "../user/actions/user-fetch-all";

export const UserApiService = {
  fetchUser,
  createUser,
  updateUser,
  deleteUsers,
  fetchUsersAll,
};
