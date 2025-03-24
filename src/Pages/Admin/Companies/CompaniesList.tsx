import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import DataTableControler from "../../../components/LV3/DataTable/DataTableControler";
import { DataTableRow } from "../../../components/LV3/DataTable/DataTable";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import { CompanyInfo } from "../../../types/CompanyTypes/CompanyTypes";
import classes from "../../../styles/AdminEntities.module.scss";

function CompaniesList() {
  // Hook for navigating to different pages
  const navigate = useNavigate();

  // State variables for managing selected company numbers, table data, and selected table rows
  const [selectedCompanyNoArray, setSelectedCompanyNoArray] = useState<
    number[]
  >([]);
  const [tableData, setTableData] = useState<DataTableRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataTableRow[]>([]);

  // State variables for search filters (Company No range, Furigana, and Name)
  const [companyNoRangeMin, setCompanyNoRangeMin] = useState<number | string>(
    ""
  );
  const [companyNoRangeMax, setCompanyNoRangeMax] = useState<number | string>(
    ""
  );
  const [companyNameFurigana, setCompanyNameFurigana] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  // State variables for pagination
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);

  // Fetch company data when page or row limit changes
  useEffect(() => {
    fetchCompaniesListData();
  }, [page, rowLimit]);

  // Triggers fetching data based on search conditions
  const searchConditions = () => {
    fetchCompaniesListData();
  };

  // Fetches the list of companies from the API
  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll(
        page,
        rowLimit,
        companyNoRangeMin,
        companyNoRangeMax,
        companyName,
        companyNameFurigana
      );

      // Calculate total pages based on received records
      setTotalPages(Math.ceil(response.totalRecords / rowLimit));

      // Sort and format the data for display
      const sortedData: DataTableRow[] = response.companies
        .sort(
          (a: CompanyInfo, b: CompanyInfo) =>
            Number(a.company_no) - Number(b.company_no)
        )
        .map((item: CompanyInfo, index: number) => ({
          No: index + 1, // `No` field is always included
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          フリガナ: item.company_name_furigana,
          削除: deleteStatus(item.company_deleted),
        }));
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Table column headers
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "フリガナ",
    "削除",
  ];

  // Navigates to the company creation page
  const navigateToCompanyCreate = () => navigate("/Admin/Company/Create");

  // Resets the table data by re-fetching the list
  const onResetTable = () => fetchCompaniesListData();

  // Updates row limit based on user selection
  const handleRowsPerPage = (newSelectedData: any) => {
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  // Handles selection changes in the table
  const handleSelectionChange = (newSelectedData: DataTableRow[]) => {
    setSelectedRows(newSelectedData);

    const selectedCompanyNo = newSelectedData.map((item) =>
      Number(item["企業No"])
    );
    setSelectedCompanyNoArray(selectedCompanyNo);
  };

  // Navigates to the company details page
  const navigateToInfoPage = () => {
    navigate(
      `/Admin/Company/Info?selectedCompanyNo=${selectedCompanyNoArray[0]}`
    );
  };

  // Navigates to the company edit page
  const navigateToUpdatePage = () => {
    navigate(
      `/Admin/Company/Update?selectedCompanyNo=${selectedCompanyNoArray[0]}`
    );
  };

  // Handles deleting selected companies
  const handleDeleteCompanies = async () => {
    try {
      await CompanyApiService.deleteCompanies(selectedCompanyNoArray);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchCompaniesListData();
  };

  // Handles restoring deleted selected companies
  const handleRestoreCompanies = async () => {
    try {
      await CompanyApiService.restoreCompanies(selectedCompanyNoArray);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchCompaniesListData();
  };

  // Updates the current page when pagination is changed
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="企業一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={`${classes.companiesDetails} ${classes.moveTop}`}>
          <TextBoxWithLabel
            disabled={false}
            label="企業No"
            width="calc(10vw - 20px)"
            value={companyNoRangeMin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyNoRangeMin(Number(e.target.value));
            }}
            type="number"
          />
          <TextBoxWithLabel
            disabled={false}
            label="~"
            width="calc(10vw - 20px)"
            value={companyNoRangeMax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyNoRangeMax(Number(e.target.value));
            }}
            type="number"
            labelWidth="3vw"
          />
          <Box>
            <TextBoxWithLabel
              disabled={false}
              label="フリガナ"
              width="calc(45vw - 100px)"
              value={companyNameFurigana}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCompanyNameFurigana(e.target.value);
              }}
              labelWidth="70px"
            />
            <TextBoxWithLabel
              disabled={false}
              label="企業名"
              width="calc(45vw - 100px)"
              value={companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCompanyName(e.target.value);
              }}
              labelWidth="70px"
            />
          </Box>
          <Box className={classes.searchButton}>
            <ButtonAtom onClick={searchConditions} label="検索" />
          </Box>
        </Box>
      </Box>
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
        onClickNew={navigateToCompanyCreate}
        onClickReset={onResetTable}
      />

      <DataTable
        headers={headers}
        data={tableData}
        maxHeight="calc(94vh - 260px)"
        onSelectionChange={handleSelectionChange}
      />
      <Box className={classes.actionButtons}>
        <ButtonAtom
          onClick={navigateToInfoPage}
          disabled={selectedRows.length !== 1}
          label="閲覧"
        />
        <ButtonAtom
          onClick={navigateToUpdatePage}
          disabled={selectedRows.length !== 1}
          label="編集"
        />
        <ButtonAtom
          onClick={handleDeleteCompanies}
          disabled={selectedRows.length === 0}
          label="削除"
        />
        <ButtonAtom
          onClick={handleRestoreCompanies}
          disabled={selectedRows.length === 0}
          label="復帰"
        />
      </Box>
    </Box>
  );
}

export default CompaniesList;
