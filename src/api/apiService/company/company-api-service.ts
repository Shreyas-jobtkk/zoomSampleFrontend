// todo-api-service.ts
import { fetchCompany } from "../company/actions/company-fetch";
import { createCompany } from "../company/actions/company-create";
import { updateCompany } from "../company/actions/company-update";
import { deleteCompanies } from "../company/actions/company-delete";
import { restoreCompanies } from "./actions/company-restore";
import { fetchCompaniesAll } from "../company/actions/company-fetch-all";
import { fetchCompaniesNameDetails } from "../company/actions/company-fetch-all-name-details";

export const CompanyApiService = {
  fetchCompany,
  createCompany,
  updateCompany,
  deleteCompanies,
  fetchCompaniesAll,
  fetchCompaniesNameDetails,
  restoreCompanies,
};
