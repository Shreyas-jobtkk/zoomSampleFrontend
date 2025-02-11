// todo-api-service.ts
// import { fetchStore } from "../store/actions/company-fetch";
// import { createCompany } from "../company/actions/company-create";
// import { updateCompany } from "../company/actions/company-update";
// import { deleteCompanies } from "../company/actions/company-delete";
// import { fetchCompaniesAll } from "../company/actions/company-fetch-all";

import { createStore } from "../store/actions/store-create";
import { fetchStoreAll } from "../store/actions/store-fetch-all";
import { deleteStores } from "../store/actions/store-delete";
import { fetchStore } from "../store/actions/store-fetch";
import { updateStore } from "../store/actions/store-update";
import { fetchStoreNamesByCompany } from "../store/actions/store-fetch-all-name-details";

export const StoreApiService = {
  createStore,
  fetchStoreAll,
  deleteStores,
  fetchStore,
  updateStore,
  fetchStoreNamesByCompany,
  // updateCompany,
  // deleteCompanies,
  // fetchCompaniesAll,
};
