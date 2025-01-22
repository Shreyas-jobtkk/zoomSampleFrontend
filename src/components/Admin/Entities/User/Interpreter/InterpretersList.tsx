import TextBoxWithLabel from "../../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../../LV3/Header/MenuHeader/MenuHeader";
import MultipleOptionsSelect from "../../../../LV1/SelectOption/MultipleOptionsSelect";
import DataTable from "../../../../LV3/DataTable/DataTable";
// import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";
import { UserApiService } from "../../../../../api/apiService/user/user-api-service";
import { InterpreterInfo } from "../../../../../types/UserTypes/UserTypes";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import { DataTableRow } from "../../../../LV3/DataTable/DataTable";
import SelectableModal from "../../../../LV1/SelectableModal/SelectableModal";
import { CompanyInfo } from "../../../../../types/CompanyTypes/CompanyTypes";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import { StoreInfo } from "../../../../../types/StoreTypes/StoreTypes";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import { LanguageInfo } from "../../../../../types/LanguageTypes/LanguageTypes";
import classes from "../../styles/AdminEntities.module.scss";

function InterpretersList() {
  const navigate = useNavigate();

  const [selectedInterpreterNoArray, setSelectedInterpreterNoArray] = useState<
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

  const [interpreterNoRangeMin, setInterpreterNoRangeMin] =
    useState<string>("");
  const [interpreterNoRangeMax, setInterpreterNoRangeMax] =
    useState<string>("");
  const [interpreterNameLast, setInterpreterNameLast] = useState<string>("");
  const [interpreterNameFuriganaLast, setInterpreterNameFuriganaLast] =
    useState<string>("");
  const [interpreterNameFirst, setInterpreterNameFirst] = useState<string>("");
  const [interpreterNameFuriganaFirst, setInterpreterNameFuriganaFirst] =
    useState<string>("");
  const [searchData, setSearchData] = useState<DataTableRow[]>([]);
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);

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
    "通訳者No",
    "名前",
    "通訳言語",
    "フリガナ",
    "削除",
  ];

  // Handler for onChange to update the selected options
  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setSelectedOptions(value); // Update the state with selected options
  };

  useEffect(() => {
    fetchCompaniesNames();
    fetchUsersListData();
    fetchLanguageNames();
  }, []);

  useEffect(() => {
    if (!isCompanyNoEmpty) {
      console.log(155, isCompanyNoEmpty);
      fetchStoreNames();
    }
  }, [companyNo]);

  const fetchLanguageNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguageNames();

      console.log(177, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name_furigana, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

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
      const response = await UserApiService.fetchInterpretersAll();

      console.log(147, response);

      const getLanguageDetails: LanguageInfo[] =
        await LanguageApiService.fetchLanguageNames();
      console.log(144, getLanguageDetails);

      // Function to get language_name_furigana based on selected numbers
      const getLanguageNames = (numbers: any[]): string => {
        return (
          getLanguageDetails
            // .filter((lang) =>
            //   numbers.map(Number).includes(Number(lang.languages_support_no))
            // )
            .filter((lang) => numbers.includes(lang.languages_support_no))
            .map((lang) => lang.language_name_furigana)
            .join(" , ")
        ); // Join the results with a comma and space
      };

      const sortedData = response
        .sort(
          (a: InterpreterInfo, b: InterpreterInfo) =>
            Number(a.user_no) - Number(b.user_no)
        )
        .map((item: InterpreterInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          店舗No: item.store_no,
          店舗名: item.store_name,
          通訳者No: item.user_no,
          名前: `${item.user_name_last} ${item.user_name_first}`,
          フリガナ: `${item.user_name_last_furigana} ${item.user_name_first_furigana}`,
          通訳言語: getLanguageNames(item.translate_languages),
          削除: deleteStatus(item.user_deleted),

          名前_last: item.user_name_last,
          名前_first: item.user_name_first,
          フリガナ_last: item.user_name_last_furigana,
          フリガナ_first: item.user_name_first_furigana,
          通訳言語_Ids: item.translate_languages,
        }));
      console.log(141, sortedData);
      setTableData(sortedData);
      setSearchData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const searchConditions = () => {
    filterTableData();
  };

  const filterTableData = () => {
    const isInvalidRange =
      Number(interpreterNoRangeMin) > Number(interpreterNoRangeMax);
    const isNotEmpty =
      interpreterNoRangeMin !== "" && interpreterNoRangeMax !== "";

    if (isInvalidRange && isNotEmpty) {
      return alert("min is more than max");
    }

    const filtered = tableData.filter((item) => {
      const matchesCompanyNo = companyNo === "" || item["企業No"] === companyNo;
      const matchesStoreNo = storeNo === "" || item["店舗No"] === storeNo;

      const contractorNo = Number(item["通訳者No"]);

      const isInRange =
        (!interpreterNoRangeMin ||
          contractorNo >= Number(interpreterNoRangeMin)) &&
        (!interpreterNoRangeMax ||
          contractorNo <= Number(interpreterNoRangeMax));

      const matchesFilters =
        (!interpreterNameLast ||
          String(item["名前_last"]).includes(interpreterNameLast)) &&
        (!interpreterNameFuriganaLast ||
          String(item["フリガナ_last"]).includes(
            interpreterNameFuriganaLast
          )) &&
        (!interpreterNameFirst ||
          String(item["名前_first"]).includes(interpreterNameFirst)) &&
        (!interpreterNameFuriganaFirst ||
          String(item["フリガナ_first"]).includes(
            interpreterNameFuriganaFirst
          ));

      const matchesLanguageNo =
        !selectedOptions ||
        selectedOptions.every(
          (element) =>
            Array.isArray(item["通訳言語_Ids"]) &&
            item["通訳言語_Ids"].includes(Number(element))
        );

      console.log(21445, matchesLanguageNo);
      // console.log(21447, interpreterNameFuriganaLast);

      // An item is included in the results only if it satisfies both range and search conditions
      return (
        isInRange &&
        matchesFilters &&
        matchesCompanyNo &&
        matchesStoreNo &&
        matchesLanguageNo
      );
    });

    // Update the table data to show filtered results
    setSearchData(filtered);
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

    // Extract and convert "通訳者No" to number
    const selectedInterpreterNo = newSelectedData
      .map((item) => Number(item["通訳者No"]))
      .filter((value) => !isNaN(value)); // Filter out invalid numbers

    setSelectedInterpreterNoArray(selectedInterpreterNo);
  };

  const navigateToInfoPage = () => {
    navigate("/UserInfo", {
      state: {
        selectedUserNo: selectedInterpreterNoArray[0],
        userType: "interpreter",
      },
    });
  };

  const navigateToInterpreterCreate = () => {
    navigate("/UserCreate", {
      state: { userType: "interpreter" },
    });
  };
  const navigateToEditPage = () => {
    navigate("/UserUpdate", {
      state: {
        selectedUserNo: selectedInterpreterNoArray[0],
        userType: "interpreter",
      },
    });
  };

  const handleDeleteInterpreters = async () => {
    console.log(114, selectedInterpreterNoArray);
    try {
      await UserApiService.deleteUsers(selectedInterpreterNoArray);
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

    console.log(133, store);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="通訳者一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.moveTop}>
          <Box className={classes.companyStoreRow}>
            <Box>
              {/* <Box>企業検索</Box> */}
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
          <Box className={classes.interpreterDetails}>
            <Box className={classes.interpreterNoRange}>
              <TextBoxWithLabel
                labelWidth="70px"
                label="通訳者No"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                disabled={false}
                type="number"
                value={interpreterNoRangeMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNoRangeMin(e.target.value)
                }
              />
              <TextBoxWithLabel
                label="~"
                width="calc(10vw - 30px)" // Uncomment to set a custom width
                value={interpreterNoRangeMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNoRangeMax(e.target.value)
                }
                disabled={false}
                type="number"
                labelWidth="3vw"
              />
            </Box>
            <Box>
              <TextBoxWithLabel
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="calc(27vw - 100px)" // Uncomment to set a custom width
                value={interpreterNameFuriganaLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNameFuriganaLast(e.target.value)
                }
                labelWidth="130px"
                disabled={false}
              />
              <TextBoxWithLabel
                labelWidth="130px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="calc(27vw - 100px)" // Uncomment to set a custom width
                value={interpreterNameLast}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNameLast(e.target.value)
                }
                disabled={false}
              />
            </Box>

            <Box>
              <TextBoxWithLabel
                label="メイ"
                labelWidth="40px"
                width="calc(27vw - 100px)" // Uncomment to set a custom width
                value={interpreterNameFuriganaFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNameFuriganaFirst(e.target.value)
                }
                disabled={false}
              />
              <TextBoxWithLabel
                label="名"
                labelWidth="40px"
                width="calc(27vw - 100px)" // Uncomment to set a custom width
                value={interpreterNameFirst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInterpreterNameFirst(e.target.value)
                }
                disabled={false}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <MultipleOptionsSelect
              label="通訳言語："
              options={languagesSupport}
              value={selectedOptions}
              onChange={handleSelectChange}
              width="calc(10vw - 30px)"
            />
            <Box className={classes.searchButton}>
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>

      <DataTable // Customize header height
        headers={headers}
        data={searchData}
        maxHeight="calc(81vh - 280px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToInterpreterCreate}
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
          onClick={handleDeleteInterpreters}
          disabled={selectedData.length <= 0}
          label="削除"
        />
      </Box>
    </Box>
  );
}

export default InterpretersList;
