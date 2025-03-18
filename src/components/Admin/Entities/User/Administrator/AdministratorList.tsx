import TextBoxWithLabel from "../../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../../LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../../LV3/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { UserApiService } from "../../../../../api/apiService/user/user-api-service";
import { UserInfo } from "../../../../../types/UserTypes/UserTypes";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import { DataTableRow } from "../../../../LV3/DataTable/DataTable";
import SelectableModal from "../../../../LV1/SelectableModal/SelectableModal";
import { CompanyInfo } from "../../../../../types/CompanyTypes/CompanyTypes";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import { StoreInfo } from "../../../../../types/StoreTypes/StoreTypes";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import classes from "../../styles/AdminEntities.module.scss";
import DataTableControler from "../../../../LV3/DataTable/DataTableControler";

function AdministratorList() {
  const navigate = useNavigate();

  // State variables for managing selected administrators, table data, and company/store information
  const [selectedAdminNoArray, setSelectedAdminNoArray] = useState<number[]>(
    []
  );
  const [tableData, setTableData] = useState<DataTableRow[]>([]);
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);
  const [isStoresExist, setIsStoresExist] = useState<boolean>(false);
  const [companyNo, setCompanyNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [storeNo, setStoreNo] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  // State variables for filtering administrators
  const [adminNoRangeMin, setAdminNoRangeMin] = useState<string>("");
  const [adminNoRangeMax, setAdminNoRangeMax] = useState<string>("");
  const [adminNameLast, setAdminNameLast] = useState<string>("");
  const [adminNameFuriganaLast, setAdminNameFuriganaLast] =
    useState<string>("");
  const [adminNameFirst, setAdminNameFirst] = useState<string>("");
  const [adminNameFuriganaFirst, setAdminNameFuriganaFirst] =
    useState<string>("");

  // Pagination and table settings
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  // Table headers
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "店舗No",
    "店舗名",
    "管理者No",
    "名前",
    "フリガナ",
    "削除",
  ];

  // Fetch company and user data when page or row limit changes
  useEffect(() => {
    fetchCompaniesNames();
    fetchUsersListData();
  }, [page, rowLimit]);

  // Fetch store names when a valid company number is selected
  useEffect(() => {
    if (!isCompanyNoEmpty) {
      console.log(155, isCompanyNoEmpty);
      fetchStoreNames();
    }
  }, [companyNo]);

  // Fetch company names
  const fetchCompaniesNames = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(145, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch store names based on selected company number
  const fetchStoreNames = async () => {
    try {
      const response = await StoreApiService.fetchStoreNamesByCompany(
        companyNo
      );
      console.log(247, response);
      setStoreData(response);
      setIsStoresExist(true);
    } catch (error) {
      setIsStoresExist(false);
      alert("no stores exist");
    }
  };

  // Fetch the list of administrators based on filters
  const fetchUsersListData = async () => {
    try {
      const response = await UserApiService.fetchAdministratorAll(
        page,
        rowLimit,
        companyNo,
        storeNo,
        adminNoRangeMin,
        adminNoRangeMax,
        adminNameFirst,
        adminNameFuriganaFirst,
        adminNameLast,
        adminNameFuriganaLast
      );

      setTotalPages(Math.ceil(response.totalRecords / rowLimit));
      const sortedData = response.administrators
        .sort(
          (a: UserInfo, b: UserInfo) => Number(a.user_no) - Number(b.user_no)
        )
        .map((item: UserInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          店舗No: item.store_no,
          店舗名: item.store_name,
          管理者No: item.user_no,
          名前: `${item.user_name_last} ${item.user_name_first}`,
          フリガナ: `${item.user_name_last_furigana} ${item.user_name_first_furigana}`,
          削除: deleteStatus(item.user_deleted),

          名前_last: item.user_name_last,
          名前_first: item.user_name_first,
          フリガナ_last: item.user_name_last_furigana,
          フリガナ_first: item.user_name_first_furigana,
        }));
      console.log(141, sortedData);
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Search function to trigger fetching filtered data
  const searchConditions = () => {
    fetchUsersListData();
  };

  // Handle selection of rows in the table
  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    setSelectedData(newSelectedData);

    // Extract and convert "管理者No" to number
    const selectedAdminNo = newSelectedData
      .map((item) => Number(item["管理者No"]))
      .filter((value) => !isNaN(value)); // Filter out invalid numbers

    setSelectedAdminNoArray(selectedAdminNo);
  };

  // Navigation functions
  const navigateToInfoPage = () => {
    navigate(
      `/UserInfo?selectedUserNo=${selectedAdminNoArray[0]}&userType=administrator`
    );
  };

  const navigateToCreate = () => {
    navigate(`/UserCreate?userType=administrator`);
  };

  const navigateToUpdatePage = () => {
    navigate(
      `/UserUpdate?selectedUserNo=${selectedAdminNoArray[0]}&userType=administrator`
    );
  };

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  };

  // Handle change in rows per page (pagination limit)
  const handleRowsPerPage = (newSelectedData: any) => {
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  // Reset the table and fetch the user data again
  const onResetTable = () => fetchUsersListData();

  // Handle deletion and restoration of administrators
  const handleDeleteAdministrators = async () => {
    console.log(114, selectedAdminNoArray);
    try {
      await UserApiService.deleteUsers(selectedAdminNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchUsersListData();
  };

  const handleRestoreAdministrators = async () => {
    console.log(114, selectedAdminNoArray);
    try {
      await UserApiService.restoreUsers(selectedAdminNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchUsersListData();
  };

  // Handle selection of a company
  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;
    setCompanyNo(company_no);
    setCompanyName(company_name);

    setCompanyNoIsEmpty(!company_no || company_no === "");
  };

  // Handle selection of a store
  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    setStoreName(store_name);
    setStoreNo(store_no);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="管理者一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.moveTop}>
          <Box className={classes.companyStoreRow}>
            <Box>
              <SelectableModal
                title="企業検索"
                options={companyData}
                onOptionSelect={handleCompanySelect}
                label="企業検索"
                valueKey="company_no" // We use company_no for unique identification
                displayKey="company_name" // We display company_name in the list
              />
              <Box className={classes.companiesDetails}>
                <TextBoxWithLabel
                  labelWidth="70px"
                  label="企業No"
                  width="calc(10vw - 30px)" // Uncomment to set a custom width
                  value={companyNo}
                />
                <TextBoxWithLabel
                  labelWidth="70px"
                  label="企業名"
                  width="calc(27vw - 100px)" // Uncomment to set a custom width
                  value={companyName}
                />
              </Box>
            </Box>
            <Box>
              <SelectableModal
                title="店舗検索"
                options={storeData}
                onOptionSelect={handleStoreSelect}
                label="店舗検索"
                valueKey="store_no" // We use company_no for unique identification
                displayKey="store_name" // We display company_name in the list
                disabled={!(!isCompanyNoEmpty && isStoresExist)}
              />
              <Box className={classes.storeDetails}>
                <TextBoxWithLabel
                  labelWidth="70px"
                  label="店舗No"
                  width="calc(10vw - 30px)" // Uncomment to set a custom width
                  value={storeNo}
                />
                <TextBoxWithLabel
                  labelWidth="70px"
                  label="店舗名"
                  width="calc(27vw - 100px)" // Uncomment to set a custom width
                  value={storeName}
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.adminDetails}>
            <Box className={classes.adminRange}>
              <TextBoxWithLabel
                labelWidth="70px"
                label="管理者No"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                disabled={false}
                type="number"
                value={adminNoRangeMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNoRangeMin(e.target.value)
                }
              />
              <TextBoxWithLabel
                label="~"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                value={adminNoRangeMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNoRangeMax(e.target.value)
                }
                disabled={false}
                type="number"
                labelWidth="3vw"
              />
            </Box>
            <Box>
              <TextBoxWithLabel
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={adminNameFuriganaLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNameFuriganaLast(e.target.value)
                }
                labelWidth="100px"
                disabled={false}
              />
              <TextBoxWithLabel
                labelWidth="100px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={adminNameLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNameLast(e.target.value)
                }
                disabled={false}
              />
            </Box>

            <Box>
              <TextBoxWithLabel
                label="メイ"
                labelWidth="40px"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={adminNameFuriganaFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNameFuriganaFirst(e.target.value)
                }
                disabled={false}
              />
              <TextBoxWithLabel
                label="名"
                labelWidth="40px"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={adminNameFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminNameFirst(e.target.value)
                }
                disabled={false}
              />
            </Box>

            <Box className={classes.searchButton}>
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <DataTable // Customize header height
        headers={headers}
        data={searchData}
        maxHeight="calc(85vh - 280px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToCreate}
      /> */}
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
        onClickNew={navigateToCreate}
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
          onClick={handleDeleteAdministrators}
          disabled={selectedData.length <= 0}
          label="削除"
        />
        <ButtonAtom
          onClick={handleRestoreAdministrators}
          disabled={selectedData.length <= 0}
          label="復帰"
        />
      </Box>
    </Box>
  );
}

export default AdministratorList;
