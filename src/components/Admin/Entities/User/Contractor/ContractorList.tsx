import TextBoxWithLabel from "../../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../../LV3/Header/MenuHeader/MenuHeader";
import DataTable from "../../../../LV3/DataTable/DataTable";
import DataTableControler from "../../../../LV3/DataTable/DataTableControler";
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

function ContractorList() {
  const navigate = useNavigate();

  const [selectedContractorNoArray, setSelectedContractorNoArray] = useState<
    number[]
  >([]);

  const [tableData, setTableData] = useState<DataTableRow[]>([]);
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);
  const [isStoresExist, setIsStoresExist] = useState<boolean>(false);
  const [companyNo, setCompanyNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [storeNo, setStoreNo] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  const [contractorNoRangeMin, setContractorNoRangeMin] = useState<string>("");
  const [contractorNoRangeMax, setContractorNoRangeMax] = useState<string>("");
  const [contractorNameLast, setContractorNameLast] = useState<string>("");
  const [contractorNameFuriganaLast, setContractorNameFuriganaLast] =
    useState<string>("");
  const [contractorNameFirst, setContractorNameFirst] = useState<string>("");
  const [contractorNameFuriganaFirst, setContractorNameFuriganaFirst] =
    useState<string>("");
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "店舗No",
    "店舗名",
    "契約者No",
    "名前",
    "フリガナ",
    "削除",
  ];

  useEffect(() => {
    fetchCompaniesNames();
    fetchUsersListData();
  }, [page, rowLimit]);

  useEffect(() => {
    if (!isCompanyNoEmpty) {
      console.log(155, isCompanyNoEmpty);
      fetchStoreNames();
    }
  }, [companyNo]);

  const fetchCompaniesNames = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(145, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchStoreNames = async () => {
    try {
      const response = await StoreApiService.fetchStoreNamesByCompany(
        companyNo
      );
      console.log(247, response);
      setStoreData(response);
      setIsStoresExist(true);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      setIsStoresExist(false);
      alert("no stores exist");
      // console.error("Error fetching companies:", error);
    }
  };

  const fetchUsersListData = async () => {
    try {
      const response = await UserApiService.fetchContractorAll(
        page,
        rowLimit,
        companyNo,
        storeNo,
        contractorNoRangeMin,
        contractorNoRangeMax,
        contractorNameFirst,
        contractorNameFuriganaFirst,
        contractorNameLast,
        contractorNameFuriganaLast
      );

      setTotalPages(Math.ceil(response.totalRecords / rowLimit));

      console.log(147, response);

      const sortedData = response.contractors
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
          契約者No: item.user_no,
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

  const searchConditions = () => {
    fetchUsersListData();
  };

  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    // Update the selected data state
    setSelectedData(newSelectedData);

    // Validate input
    if (!Array.isArray(newSelectedData)) {
      console.error("newSelectedData must be an array");
      return;
    }

    // Log the selected data to the console
    console.log("Selected Data:", newSelectedData);

    // Extract and convert "契約者No" to number
    const selectedContractorNo = newSelectedData
      .map((item) => Number(item["契約者No"]))
      .filter((value) => !isNaN(value)); // Filter out invalid numbers

    setSelectedContractorNoArray(selectedContractorNo);
  };

  const navigateToInfoPage = () => {
    navigate(
      `/UserInfo?selectedUserNo=${selectedContractorNoArray[0]}&userType=contractor`
    );
  };

  const handlePageChange = (page: number) => {
    // setCurrentPage(page); // Update the page state in the parent
    console.log("Current page in parent:", page);
    setPage(page + 1);
  };

  const handleRowsPerPage = (newSelectedData: any) => {
    console.log(155, newSelectedData[0].rowsPerPage);
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  const navigateToCreate = () => {
    navigate(`/UserCreate?userType=contractor`);
  };

  const navigateToEditPage = () => {
    navigate(
      `/UserUpdate?selectedUserNo=${selectedContractorNoArray[0]}&userType=contractor`
    );
  };

  const handleDeleteContractors = async () => {
    console.log(114, selectedContractorNoArray);
    try {
      await UserApiService.deleteUsers(selectedContractorNoArray);
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

  const handleRestoreContractors = async () => {
    console.log(114, selectedContractorNoArray);
    try {
      await UserApiService.restoreUsers(selectedContractorNoArray);
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

  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;
    setCompanyNo(company_no);
    setCompanyName(company_name);

    setCompanyNoIsEmpty(!company_no || company_no === "");
  };

  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    setStoreName(store_name);
    setStoreNo(store_no);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="契約者一覧" />
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
          <Box className={classes.contractorDetails}>
            <Box className={classes.contractorRange}>
              <TextBoxWithLabel
                labelWidth="70px"
                label="契約者No"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                disabled={false}
                type="number"
                value={contractorNoRangeMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNoRangeMin(e.target.value)
                }
              />
              <TextBoxWithLabel
                label="~"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                value={contractorNoRangeMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNoRangeMax(e.target.value)
                }
                disabled={false}
                type="number"
                labelWidth="3vw"
              />
            </Box>

            <Box>
              <TextBoxWithLabel
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={contractorNameFuriganaLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNameFuriganaLast(e.target.value)
                }
                labelWidth="100px"
                disabled={false}
              />
              <TextBoxWithLabel
                labelWidth="100px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={contractorNameLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNameLast(e.target.value)
                }
                disabled={false}
              />
            </Box>

            <Box>
              <TextBoxWithLabel
                label="メイ"
                labelWidth="40px"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={contractorNameFuriganaFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNameFuriganaFirst(e.target.value)
                }
                disabled={false}
              />
              <TextBoxWithLabel
                label="名"
                labelWidth="40px"
                width="calc(25vw - 80px)" // Uncomment to set a custom width
                value={contractorNameFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContractorNameFirst(e.target.value)
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
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
        onClickNew={navigateToCreate}
        onClickReset={navigateToCreate}
      />

      <DataTable
        headers={headers}
        data={tableData}
        maxHeight="calc(94vh - 260px)"
        onSelectionChange={handleSelectionChange}
      />

      {/* <DataTable // Customize header height
        headers={headers}
        data={searchData}
        maxHeight="calc(85vh - 280px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToCreate}
      /> */}

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
          onClick={handleDeleteContractors}
          disabled={selectedData.length <= 0}
          label="削除"
        />
        <ButtonAtom
          onClick={handleRestoreContractors}
          disabled={selectedData.length <= 0}
          label="復帰"
        />
      </Box>
    </Box>
  );
}

export default ContractorList;
