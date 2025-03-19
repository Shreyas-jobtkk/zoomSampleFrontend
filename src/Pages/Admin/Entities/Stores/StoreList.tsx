import TextBoxWithLabel from "../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../components/LV1/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../../components/LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../../components/LV3/DataTable/DataTable";
import { DataTableRow } from "../../../../components/LV3/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../../api/apiService/store/store-api-service";
import { StoreInfo } from "../../../../types/StoreTypes/StoreTypes";
import SelectableModal from "../../../../components/LV1/SelectableModal/SelectableModal";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import classes from "../styles/AdminEntities.module.scss";
import DataTableControler from "../../../../components/LV3/DataTable/DataTableControler";

function StoreList() {
  const navigate = useNavigate();

  // State to store selected store numbers
  const [selectedStoreNoArray, setSelectedStoreNoArray] = useState<number[]>(
    []
  );

  // State to store company data
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);

  // Table headers
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "店舗No",
    "店舗名",
    "フリガナ",
    "削除",
  ];

  // State to manage table data
  const [tableData, setTableData] = useState<DataTableRow[]>([]);

  // States for search filters
  const [storeNoRangeMin, setStoreNoRangeMin] = useState<string>("");
  const [storeNoRangeMax, setStoreNoRangeMax] = useState<string>("");
  const [storeNameFurigana, setStoreNameFurigana] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyNo, setCompanyNo] = useState<string>("");

  // State for selected table rows
  const [selectedData, setSelectedData] = useState<DataTableRow[]>([]);

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);

  // Function to trigger store data search based on conditions
  const searchConditions = () => {
    fetchStoreListData();
  };

  // Fetch company names and store list data on component mount or when page/rowLimit changes
  useEffect(() => {
    fetchCompaniesNames();
    fetchStoreListData();
  }, [page, rowLimit]);

  // Function to fetch store list data from API
  const fetchStoreListData = async () => {
    try {
      const response = await StoreApiService.fetchStoreAll(
        page,
        rowLimit,
        companyNo,
        storeNoRangeMin,
        storeNoRangeMax,
        storeName,
        storeNameFurigana
      );
      setTotalPages(Math.ceil(response.totalRecords / rowLimit));
      const sortedData = response.stores
        .sort(
          (a: StoreInfo, b: StoreInfo) =>
            Number(a.store_no) - Number(b.store_no)
        )
        .map((item: StoreInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          店舗No: item.store_no,
          店舗名: item.store_name,
          フリガナ: item.store_name_furigana,
          削除: deleteStatus(item.store_delete),
        }));

      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Function to fetch company names from API
  const fetchCompaniesNames = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(145, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Function to handle changes in rows per page selection
  const handleRowsPerPage = (newSelectedData: any) => {
    console.log(155, newSelectedData[0].rowsPerPage);
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  // Function to handle row selection changes
  const handleSelectionChange = (newSelectedData: DataTableRow[]) => {
    setSelectedData(newSelectedData);
    console.log(123, newSelectedData);

    const selectedStoreNo = newSelectedData.map((item) =>
      Number(item["店舗No"])
    );
    setSelectedStoreNoArray(selectedStoreNo);
    console.log(
      "Selected Data:",
      selectedStoreNo,
      selectedData,
      newSelectedData
    );
  };

  // Function to navigate to the Store Info page
  const navigateToInfoPage = () => {
    navigate(`/StoreInfo?selectedStoreNo=${selectedStoreNoArray[0]}`);
  };

  // Function to navigate to the Store Update page
  const navigateToUpdatePage = () => {
    navigate(`/StoreUpdate?selectedStoreNo=${selectedStoreNoArray[0]}`);
  };

  // Function to delete selected stores
  const handleDeleteStores = async () => {
    console.log(114, selectedStoreNoArray);
    try {
      await StoreApiService.deleteStores(selectedStoreNoArray);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchStoreListData();
  };

  // Function to restore deleted stores
  const handleRestoreStores = async () => {
    try {
      await StoreApiService.restoreStores(selectedStoreNoArray);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchStoreListData();
  };

  // Function to navigate to the Store Create page
  const navigateToStoreCreate = () => {
    navigate("/StoreCreate");
  };

  // Function to reset the table data
  const onResetTable = () => fetchStoreListData();

  // Function to handle company selection from dropdown
  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;
    setCompanyNo(company_no);
    setCompanyName(company_name);
  };

  // Function to handle page change in pagination
  const handlePageChange = (page: number) => {
    console.log("Current page in parent:", page);
    setPage(page + 1);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="店舗一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.moveTop}>
          <Box>
            <SelectableModal
              title="企業検索"
              options={companyData}
              onOptionSelect={handleCompanySelect}
              label="企業検索"
              valueKey="company_no"
              displayKey="company_name"
            />
            <Box className={classes.companiesDetails}>
              <Box style={{ minWidth: "35vw" }}>
                <TextBoxWithLabel
                  label="企業No"
                  width="calc(10vw - 20px)"
                  value={companyNo}
                />
              </Box>
              <TextBoxWithLabel
                label="企業名"
                width="calc(45vw - 120px)"
                value={companyName}
              />
            </Box>
          </Box>
          <Box className={`${classes.storeDetails} ${classes.marginTop}`}>
            <Box sx={{ display: "flex", minWidth: "36vw", gap: "2vw" }}>
              <TextBoxWithLabel
                disabled={false}
                label="店舗No"
                width="calc(10vw - 20px)"
                value={storeNoRangeMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNoRangeMin(e.target.value)
                }
                type="number"
              />
              <TextBoxWithLabel
                disabled={false}
                label="~"
                width="calc(10vw - 20px)"
                value={storeNoRangeMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNoRangeMax(e.target.value)
                }
                type="number"
                labelWidth="3vw"
              />{" "}
            </Box>
            <Box>
              <TextBoxWithLabel
                disabled={false}
                label="フリガナ"
                width="calc(45vw - 120px)"
                value={storeNameFurigana}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNameFurigana(e.target.value)
                }
              />
              <TextBoxWithLabel
                disabled={false}
                label="店舗名"
                width="calc(45vw - 120px)"
                value={storeName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreName(e.target.value)
                }
              />
            </Box>
            <Box className={classes.searchButton}>
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
        onClickNew={navigateToStoreCreate}
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
          onClick={navigateToUpdatePage}
          disabled={selectedData.length !== 1}
          label="編集"
        />
        <ButtonAtom
          onClick={handleDeleteStores}
          disabled={selectedData.length <= 0}
          label="削除"
        />
        <ButtonAtom
          onClick={handleRestoreStores}
          disabled={selectedData.length === 0}
          label="復帰"
        />
      </Box>
    </Box>
  );
}

export default StoreList;
