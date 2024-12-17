import DatePicker from "../../../components/LV1/DatePicker/DatePicker";
import TimePicker from "../../../components/LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, TextField, Typography } from "@mui/material";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../api/apiService/store/store-api-service";
import { StoreInfo } from "../../../types/StoreTypes/StoreTypes";

function StoreList() {
  const navigate = useNavigate();
  // State for selected start and end times

  // States for data and inputs selectedStoreNo
  const [selectedStoreNoArray, setSelectedStoreNoArray] = useState<any[]>([]);

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

  const [tableData, setTableData] = useState<any[]>([]);

  const searchConditions = () => {};

  useEffect(() => {
    fetchCompaniesListData();
    fetchStoreListData();
  }, []);

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll();
      console.log(145, response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchStoreListData = async () => {
    try {
      const response = await StoreApiService.fetchStoreAll();
      console.log(245, response);
      const sortedData = response
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
      console.log(141, sortedData);
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [textValue3, setTextValue3] = useState<string>("");
  const [textValue4, setTextValue4] = useState<string>("");
  const [textValue6, setTextValue6] = useState<string>("");
  const [textValue7, setTextValue7] = useState<string>("");
  const [textValue8, setTextValue8] = useState<string>("");
  const [textValue9, setTextValue9] = useState<string>("");
  const [textValue5, setTextValue5] = useState<string>("");
  const [textValue10, setTextValue10] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<string>("");

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  // Handle selection change
  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    // Update the selected data state
    setSelectedData(newSelectedData);
    console.log(123, newSelectedData);
    // // Log the selected data to the console
    const selectedStoreNo = newSelectedData.map((item) => item["店舗No"]);
    setSelectedStoreNoArray(selectedStoreNo);
    console.log(
      "Selected Data:",
      selectedStoreNo,
      selectedData,
      newSelectedData
    );
  };

  const navigateToInfoPage = () => {
    navigate("/StoreInfo", {
      state: { selectedStoreNo: selectedStoreNoArray[0] },
    });
  };

  const navigateToEditPage = () => {
    navigate("/StoreEdit", {
      state: { selectedStoreNo: selectedStoreNoArray[0] },
    });
  };

  const handleDeleteStores = async () => {
    console.log(114, selectedStoreNoArray);
    try {
      await StoreApiService.deleteStores(selectedStoreNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchStoreListData();
  };

  const navigateToStoreCreate = () => {
    navigate("/StoreCreate");
  };

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="店舗一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="move-top">
          <Box>
            <ButtonAtom
              onClick={searchConditions}
              label="企業検索"
              width="90px"
              margin="2px"
            />
            <Box className="companies-details">
              <TextBoxWithLabel
                label="企業No"
                width="12vw" // Uncomment to set a custom width
                value={textValue10}
                onChange={(e: any) => setTextValue10(e.target.value)}
                // disabled={true}
              />
              <TextBoxWithLabel
                label="企業名"
                width="60vw" // Uncomment to set a custom width
                value={textValue3}
                onChange={(e: any) => setTextValue3(e.target.value)}
              />
            </Box>
          </Box>
          <Box className="store-details margin-top">
            <TextBoxWithLabel
              disabled={false}
              label="店舗No"
              width="12vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box>
              <TextBoxWithLabel
                disabled={false}
                label="フリガナ"
                width="60vw" // Uncomment to set a custom width
                value={textValue2}
                onChange={(e: any) => setTextValue2(e.target.value)}
                // labelWidth="70px"
              />
              <TextBoxWithLabel
                disabled={false}
                // labelWidth="70px"
                label="店舗名"
                width="60vw" // Uncomment to set a custom width
                value={textValue3}
                onChange={(e: any) => setTextValue3(e.target.value)}
              />
            </Box>
            <Box className="search-button">
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>
      <DataTable // Customize header height
        headers={headers}
        data={tableData}
        maxHeight="calc(82vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToStoreCreate}
      />
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
        onClick={handleDeleteStores}
        disabled={selectedData.length <= 0}
        label="削除"
      />
    </Box>
  );
}

export default StoreList;
