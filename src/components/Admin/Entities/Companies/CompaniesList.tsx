import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../LV3/DataTable/DataTable";
import DataTableControler from "../../../LV3/DataTable/DataTableControler";
import { DataTableRow } from "../../../LV3/DataTable/DataTable";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import classes from "../styles/AdminEntities.module.scss";

function CompaniesList() {
  const navigate = useNavigate();

  // States for data and inputs selectedCompanyNo
  const [selectedCompanyNoArray, setSelectedCompanyNoArray] = useState<
    number[]
  >([]);
  const [tableData, setTableData] = useState<DataTableRow[]>([]);
  // const [searchData, setSearchData] = useState<DataTableRow[]>([]);
  const [selectedData, setSelectedData] = useState<DataTableRow[]>([]);
  const [companyNoRangeMin, setCompanyNoRangeMin] = useState<number | string>(
    ""
  );
  const [companyNoRangeMax, setCompanyNoRangeMax] = useState<number | string>(
    ""
  );
  const [companyNameFurigana, setCompanyNameFurigana] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompaniesListData();
  }, [page, rowLimit]);

  const searchConditions = () => {
    fetchCompaniesListData();
  };

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

      setTotalPages(Math.ceil(response.totalRecords / rowLimit));

      console.log(177, response.companies, response.totalRecords);
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
      // setSearchData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Filter table data based on search input and range conditions
  // const filterTableData = () => {
  //   const isInvalidRange =
  //     Number(companyNoRangeMin) > Number(companyNoRangeMax);
  //   const isNotEmpty = companyNoRangeMin !== "" && companyNoRangeMax !== "";

  //   if (isInvalidRange && isNotEmpty) {
  //     return alert("min is more than max");
  //   }

  //   const filtered = tableData.filter((item) => {
  //     // Convert "企業No" (company number) to a number for range comparison
  //     const companyNo = Number(item["企業No"]);

  //     // Range filtering logic:
  //     // Check if the company number falls within the specified range.
  //     // If a range boundary (min or max) is not provided, ignore that condition.
  //     const isInRange =
  //       (!companyNoRangeMin || companyNo >= Number(companyNoRangeMin)) &&
  //       (!companyNoRangeMax || companyNo <= Number(companyNoRangeMax));

  //     console.log(1445, item);

  //     // Search input filtering logic:
  //     // Check if the item matches the specified search terms for "企業名" (company name)
  //     // and "フリガナ" (company name pronunciation in Kana).
  //     // Convert values to strings to safely use the `includes` method.
  //     const matchesFilters =
  //       (!companyName || String(item["企業名"]).includes(companyName)) &&
  //       (!companyNameFurigana ||
  //         String(item["フリガナ"]).includes(companyNameFurigana));

  //     console.log(21445, matchesFilters);

  //     // An item is included in the results only if it satisfies both range and search conditions
  //     return isInRange && matchesFilters;
  //   });

  //   // Update the filtered data state to reflect the search results
  //   setSearchData(filtered);
  // };

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "フリガナ",
    "削除",
  ];

  const navigateToCompanyCreate = () => navigate("/CompanyCreate");

  const onResetTable = () => fetchCompaniesListData();

  const handleRowsPerPage = (newSelectedData: any) => {
    console.log(155, newSelectedData[0].rowsPerPage);
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  const handleSelectionChange = (newSelectedData: DataTableRow[]) => {
    setSelectedData(newSelectedData);
    console.log("Selected Data:", newSelectedData);

    const selectedCompanyNo = newSelectedData.map((item) =>
      Number(item["企業No"])
    );
    setSelectedCompanyNoArray(selectedCompanyNo);
  };

  const navigateToInfoPage = () => {
    navigate(`/CompanyInfo?selectedCompanyNo=${selectedCompanyNoArray[0]}`);
  };

  const navigateToEditPage = () => {
    navigate(`/CompanyEdit?selectedCompanyNo=${selectedCompanyNoArray[0]}`);
  };

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

  // const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page: number) => {
    // setCurrentPage(page); // Update the page state in the parent
    console.log("Current page in parent:", page);
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
              // handleFilterChange("企業No", e.target.value);
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
              // handleFilterChange("企業No", e.target.value);
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
                // handleFilterChange("フリガナ", e.target.value);
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
                // handleFilterChange("企業名", e.target.value);
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
          disabled={selectedData.length !== 1}
          label="閲覧"
        />
        <ButtonAtom
          onClick={navigateToEditPage}
          disabled={selectedData.length !== 1}
          label="編集"
        />
        <ButtonAtom
          onClick={handleDeleteCompanies}
          disabled={selectedData.length === 0}
          label="削除"
        />
        <ButtonAtom
          onClick={handleRestoreCompanies}
          disabled={selectedData.length === 0}
          label="復帰"
        />
      </Box>
    </Box>
  );
}

export default CompaniesList;
