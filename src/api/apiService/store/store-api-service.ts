import { createStore } from "../store/actions/store-create";
import { fetchStoreAll } from "../store/actions/store-fetch-all";
import { deleteStores } from "../store/actions/store-delete";
import { fetchStore } from "../store/actions/store-fetch";
import { updateStore } from "../store/actions/store-update";
import { fetchStoreNamesByCompany } from "../store/actions/store-fetch-all-name-details";
import { restoreStores } from "../store/actions/store-restore";

export const StoreApiService = {
  createStore,
  fetchStoreAll,
  deleteStores,
  fetchStore,
  updateStore,
  fetchStoreNamesByCompany,
  restoreStores,
};
