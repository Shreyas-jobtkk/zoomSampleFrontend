import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../LV3/DataTable/DataTable";
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
  const [searchData, setSearchData] = useState<DataTableRow[]>([]);
  const [selectedData, setSelectedData] = useState<DataTableRow[]>([]);
  const [companyNoRangeMin, setCompanyNoRangeMin] = useState<string>("");
  const [companyNoRangeMax, setCompanyNoRangeMax] = useState<string>("");
  const [companyNameFurigana, setCompanyNameFurigana] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll();
      const sortedData: DataTableRow[] = response
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
      setSearchData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Filter table data based on search input and range conditions
  const filterTableData = () => {
    const isInvalidRange =
      Number(companyNoRangeMin) > Number(companyNoRangeMax);
    const isNotEmpty = companyNoRangeMin !== "" && companyNoRangeMax !== "";

    if (isInvalidRange && isNotEmpty) {
      return alert("min is more than max");
    }

    const filtered = tableData.filter((item) => {
      // Convert "企業No" (company number) to a number for range comparison
      const companyNo = Number(item["企業No"]);

      // Range filtering logic:
      // Check if the company number falls within the specified range.
      // If a range boundary (min or max) is not provided, ignore that condition.
      const isInRange =
        (!companyNoRangeMin || companyNo >= Number(companyNoRangeMin)) &&
        (!companyNoRangeMax || companyNo <= Number(companyNoRangeMax));

      console.log(1445, item);

      // Search input filtering logic:
      // Check if the item matches the specified search terms for "企業名" (company name)
      // and "フリガナ" (company name pronunciation in Kana).
      // Convert values to strings to safely use the `includes` method.
      const matchesFilters =
        (!companyName || String(item["企業名"]).includes(companyName)) &&
        (!companyNameFurigana ||
          String(item["フリガナ"]).includes(companyNameFurigana));

      console.log(21445, matchesFilters);

      // An item is included in the results only if it satisfies both range and search conditions
      return isInRange && matchesFilters;
    });

    // Update the filtered data state to reflect the search results
    setSearchData(filtered);
  };

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "フリガナ",
    "削除",
  ];

  const searchConditions = () => {
    filterTableData();
    console.log("Search conditions triggered");
  };

  const navigateToCompanyCreate = () => navigate("/CompanyCreate");

  const handleSelectionChange = (newSelectedData: DataTableRow[]) => {
    setSelectedData(newSelectedData);
    console.log("Selected Data:", newSelectedData);

    const selectedCompanyNo = newSelectedData.map((item) =>
      Number(item["企業No"])
    );
    setSelectedCompanyNoArray(selectedCompanyNo);
  };

  const navigateToInfoPage = () => {
    navigate("/CompanyInfo", {
      state: { selectedCompanyNo: selectedCompanyNoArray[0] },
    });
  };

  const navigateToEditPage = () => {
    navigate("/CompanyInfoEdit", {
      state: { selectedCompanyNo: selectedCompanyNoArray[0] },
    });
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

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="企業一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={`${classes.companiesDetails} ${classes.moveTop}`}>
          <TextBoxWithLabel
            disabled={false}
            label="企業No"
            width="12vw"
            value={companyNoRangeMin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyNoRangeMin(e.target.value);
              // handleFilterChange("企業No", e.target.value);
            }}
            type="number"
          />
          <TextBoxWithLabel
            disabled={false}
            label="~"
            width="12vw"
            value={companyNoRangeMax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyNoRangeMax(e.target.value);
              // handleFilterChange("企業No", e.target.value);
            }}
            type="number"
            labelWidth="3vw"
          />
          <Box>
            <TextBoxWithLabel
              disabled={false}
              label="フリガナ"
              width="40vw"
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
              width="40vw"
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
      <DataTable
        headers={headers}
        data={searchData}
        maxHeight="calc(94vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToCompanyCreate}
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
      </Box>
    </Box>
  );
}

export default CompaniesList;
