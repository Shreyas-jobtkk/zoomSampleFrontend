// todo-api-service.ts
import { fetchCompany } from "../company/actions/company-fetch";
import { createCompany } from "../company/actions/company-create";
import { updateCompany } from "../company/actions/company-update";
import { deleteCompanies } from "../company/actions/company-delete";
import { fetchCompaniesAll } from "../company/actions/company-fetch-all";

export const CompanyApiService = {
  fetchCompany,
  createCompany,
  updateCompany,
  deleteCompanies,
  fetchCompaniesAll,
};
