import DatePicker from "../../../components/LV1/DatePicker/DatePicker";
import TimePicker from "../../../components/LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, TextField, Typography } from "@mui/material";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import SelectOption from "../../../components/LV1/SelectOption/SelectOption";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import { Height } from "@mui/icons-material";
import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";
// import { fetchCompaniesAll } from "../../../api/apiService/company/company";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";

function StoreList() {
  const navigate = useNavigate();
  // State for selected start and end times
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(
    dayjs()
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(dayjs());

  // State for selected start and end dates
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
    null
  );

  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業Ｎｏ",
    "企業名",
    "店舗No",
    "店舗名",
    "フリガナ",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      企業Ｎｏ: "1001",
      企業名: "Company A",
      店舗No: "3001",
      店舗名: "第一支店",
      フリガナ: "ダイイイチシテン",
    },
    {
      No: 2,
      登録日時: "2024-11-01 10:30",
      更新日時: "2024-11-01 11:30",
      企業Ｎｏ: "1002",
      企業名: "Company B",
      店舗No: "3001",
      店舗名: "第二支店",
      フリガナ: "ダイニシテン",
    },
    {
      No: 3,
      登録日時: "2024-11-01 12:00",
      更新日時: "2024-11-01 13:00",
      企業Ｎｏ: "1003",
      企業名: "Company C",
      店舗No: "3001",
      店舗名: "第三支店",
      フリガナ: "ダイサンシテン",
    },
    {
      No: 4,
      登録日時: "2024-11-01 13:30",
      更新日時: "2024-11-01 14:30",
      企業Ｎｏ: "1004",
      企業名: "Company D",
      店舗No: "3001",
      店舗名: "第四支店",
      フリガナ: "ダイシシテン",
    },
    {
      No: 5,
      登録日時: "2024-11-01 15:00",
      更新日時: "2024-11-01 16:00",
      企業Ｎｏ: "1005",
      企業名: "Company E",
      店舗No: "3001",
      店舗名: "第五支店",
      フリガナ: "ダイゴシテン",
    },
    {
      No: 6,
      登録日時: "2024-11-01 16:30",
      更新日時: "2024-11-01 17:30",
      企業Ｎｏ: "1006",
      企業名: "Company F",
      店舗No: "3001",
      店舗名: "第六支店",
      フリガナ: "ダイロクシテン",
    },
    {
      No: 7,
      登録日時: "2024-11-02 09:00",
      更新日時: "2024-11-02 10:00",
      企業Ｎｏ: "1007",
      企業名: "Company G",
      店舗No: "3001",
      店舗名: "第七支店",
      フリガナ: "ダイシチシテン",
    },
    {
      No: 8,
      登録日時: "2024-11-02 10:30",
      更新日時: "2024-11-02 11:30",
      企業Ｎｏ: "1008",
      企業名: "Company H",
      店舗No: "3001",
      店舗名: "第八支店",
      フリガナ: "ダイハチシテン",
    },
    {
      No: 9,
      登録日時: "2024-11-02 12:00",
      更新日時: "2024-11-02 13:00",
      企業Ｎｏ: "1009",
      企業名: "Company I",
      店舗No: "3001",
      店舗名: "第九支店",
      フリガナ: "ダイキュウシテン",
    },
    {
      No: 10,
      登録日時: "2024-11-02 13:30",
      更新日時: "2024-11-02 14:30",
      企業Ｎｏ: "1010",
      企業名: "Company J",
      店舗No: "3001",
      店舗名: "第十支店",
      フリガナ: "ダイジュウシテン",
    },
    {
      No: 11,
      登録日時: "2024-11-02 15:00",
      更新日時: "2024-11-02 16:00",
      企業Ｎｏ: "1011",
      企業名: "Company K",
      店舗No: "3001",
      店舗名: "第十一支店",
      フリガナ: "ダイジュウイチシテン",
    },
    {
      No: 12,
      登録日時: "2024-11-02 16:30",
      更新日時: "2024-11-02 17:30",
      企業Ｎｏ: "1012",
      企業名: "Company L",
      店舗No: "3001",
      店舗名: "第十二支店",
      フリガナ: "ダイジュウニシテン",
    },
    {
      No: 13,
      登録日時: "2024-11-03 09:00",
      更新日時: "2024-11-03 10:00",
      企業Ｎｏ: "1013",
      企業名: "Company M",
      店舗No: "3001",
      店舗名: "第十三支店",
      フリガナ: "ダイジュウサンシテン",
    },
    {
      No: 14,
      登録日時: "2024-11-03 10:30",
      更新日時: "2024-11-03 11:30",
      企業Ｎｏ: "1014",
      企業名: "Company N",
      店舗No: "3001",
      店舗名: "第十四支店",
      フリガナ: "ダイジュウヨンシテン",
    },
    {
      No: 15,
      登録日時: "2024-11-03 12:00",
      更新日時: "2024-11-03 13:00",
      企業Ｎｏ: "1015",
      企業名: "Company O",
      店舗No: "3001",
      店舗名: "第十五支店",
      フリガナ: "ダイジュウゴシテン",
    },
    {
      No: 16,
      登録日時: "2024-11-03 13:30",
      更新日時: "2024-11-03 14:30",
      企業Ｎｏ: "1016",
      企業名: "Company P",
      店舗No: "3001",
      店舗名: "第十六支店",
      フリガナ: "ダイジュウロクシテン",
    },
    {
      No: 17,
      登録日時: "2024-11-03 15:00",
      更新日時: "2024-11-03 16:00",
      企業Ｎｏ: "1017",
      企業名: "Company Q",
      店舗No: "3001",
      店舗名: "第十七支店",
      フリガナ: "ダイジュウナナシテン",
    },
    {
      No: 18,
      登録日時: "2024-11-03 16:30",
      更新日時: "2024-11-03 17:30",
      企業Ｎｏ: "1018",
      企業名: "Company R",
      店舗No: "3001",
      店舗名: "第十八支店",
      フリガナ: "ダイジュウハシテン",
    },
    {
      No: 19,
      登録日時: "2024-11-04 09:00",
      更新日時: "2024-11-04 10:00",
      企業Ｎｏ: "1019",
      企業名: "Company S",
      店舗No: "3001",
      店舗名: "第十九支店",
      フリガナ: "ダイジュウキュウシテン",
    },
    {
      No: 20,
      登録日時: "2024-11-04 10:30",
      更新日時: "2024-11-04 11:30",
      企業Ｎｏ: "1020",
      企業名: "Company T",
      店舗No: "3001",
      店舗名: "第二十支店",
      フリガナ: "ダイニジュウシテン",
    },
    {
      No: 21,
      登録日時: "2024-11-04 12:00",
      更新日時: "2024-11-04 13:00",
      企業Ｎｏ: "1021",
      企業名: "Company U",
      店舗No: "3001",
      店舗名: "第二十一支店",
      フリガナ: "ダイニジュウイチシテン",
    },
    {
      No: 22,
      登録日時: "2024-11-04 13:30",
      更新日時: "2024-11-04 14:30",
      企業Ｎｏ: "1022",
      企業名: "Company V",
      店舗No: "3001",
      店舗名: "第二十二支店",
      フリガナ: "ダイニジュウニシテン",
    },
  ];

  const columnWidths = [5, 20, 20, 8, 10, 10, 10, 10, 10, 10];
  const columnAlignments: ("left" | "center" | "right")[] = ["right"];

  const searchConditions = () => {};

  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll();
      console.log(145, response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Handle start date change
  const handleStartDateChange = (date: Dayjs | null) => {
    setSelectedStartDate(date);
    console.log(
      "Selected Start Date:",
      date ? date.format("YYYY-MM-DD") : "None"
    ); // Log the selected start date
  };

  // Handle end date change
  const handleEndDateChange = (date: Dayjs | null) => {
    setSelectedEndDate(date);
    console.log(
      "Selected End Date:",
      date ? date.format("YYYY-MM-DD") : "None"
    ); // Log the selected end date
  };

  // Handle start time change
  const handleStartTimeChange = (newValue: Dayjs | null) => {
    setSelectedStartTime(newValue);
    console.log(
      "Selected Start Time:",
      newValue ? newValue.format("HH:mm:ss") : "None"
    ); // Log the selected start time
  };

  // Handle end time change
  const handleEndTimeChange = (newValue: Dayjs | null) => {
    setSelectedEndTime(newValue);
    console.log(
      "Selected End Time:",
      newValue ? newValue.format("HH:mm:ss") : "None"
    ); // Log the selected end time
  };

  // Format the full datetime strings for display
  const formatFullDateTime = (date: Dayjs | null, time: Dayjs | null) => {
    if (!date || !time) return "None";
    return `${date.format("YYYY-MM-DD")} ${time.format("HH:mm:ss")}`;
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
    // // Log the selected data to the console
    console.log("Selected Data:", selectedData, newSelectedData);
  };

  const navigateToInfoPage = () => {
    navigate("/StoreListInfo");
  };
  const navigateToEditPage = () => {
    navigate("/StoreListInfo");
  };

  const navigateToStoreCreate = () => {
    navigate("/StoreCreate");
  };

  const borderStyle = "1px solid #ccc";

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
        data={data}
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
        onClick={searchConditions}
        disabled={selectedData.length <= 0}
        label="削除"
      />
    </Box>
  );
}

export default StoreList;
