import DatePicker from "../../../components/LV1/DatePicker/DatePicker";
import TimePicker from "../../../components/LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, TextField, Typography } from "@mui/material";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import SelectOption from "../../../components/LV1/SelectOption/SelectOption";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";

function CompaniesList() {
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
    "フリガナ",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      企業Ｎｏ: "1001",
      企業名: "Company A",
      フリガナ: "タカハシ ビョウイン",
    },
    {
      No: 2,
      登録日時: "2024-11-01 11:00",
      更新日時: "2024-11-01 12:00",
      企業Ｎｏ: "1002",
      企業名: "Company B",
      フリガナ: "スズキ シンリョウジョ",
    },
    {
      No: 3,
      登録日時: "2024-11-02 09:30",
      更新日時: "2024-11-02 10:30",
      企業Ｎｏ: "1003",
      企業名: "Company C",
      フリガナ: "イシカワ ケンセツ",
    },
    {
      No: 4,
      登録日時: "2024-11-02 11:15",
      更新日時: "2024-11-02 12:15",
      企業Ｎｏ: "1004",
      企業名: "Company D",
      フリガナ: "ヤマモト ショウジ",
    },
    {
      No: 5,
      登録日時: "2024-11-03 09:45",
      更新日時: "2024-11-03 10:45",
      企業Ｎｏ: "1005",
      企業名: "Company E",
      フリガナ: "コバヤシ ホスピタル",
    },
    {
      No: 6,
      登録日時: "2024-11-03 11:30",
      更新日時: "2024-11-03 12:30",
      企業Ｎｏ: "1006",
      企業名: "Company F",
      フリガナ: "ナカムラ ソウゴウ",
    },
    {
      No: 7,
      登録日時: "2024-11-04 10:00",
      更新日時: "2024-11-04 11:00",
      企業Ｎｏ: "1007",
      企業名: "Company G",
      フリガナ: "フジ サンギョウ",
    },
    {
      No: 8,
      登録日時: "2024-11-04 12:00",
      更新日時: "2024-11-04 13:00",
      企業Ｎｏ: "1008",
      企業名: "Company H",
      フリガナ: "マツイ ガイシャ",
    },
    {
      No: 9,
      登録日時: "2024-11-05 09:15",
      更新日時: "2024-11-05 10:15",
      企業Ｎｏ: "1009",
      企業名: "Company I",
      フリガナ: "イマムラ セイカ",
    },
    {
      No: 10,
      登録日時: "2024-11-05 11:45",
      更新日時: "2024-11-05 12:45",
      企業Ｎｏ: "1010",
      企業名: "Company J",
      フリガナ: "オカダ ヤクヒン",
    },
    {
      No: 11,
      登録日時: "2024-11-06 09:00",
      更新日時: "2024-11-06 10:00",
      企業Ｎｏ: "1011",
      企業名: "Company K",
      フリガナ: "キムラ デンタル",
    },
    {
      No: 12,
      登録日時: "2024-11-06 11:00",
      更新日時: "2024-11-06 12:00",
      企業Ｎｏ: "1012",
      企業名: "Company L",
      フリガナ: "ヨシダ カンパニー",
    },
    {
      No: 13,
      登録日時: "2024-11-07 09:30",
      更新日時: "2024-11-07 10:30",
      企業Ｎｏ: "1013",
      企業名: "Company M",
      フリガナ: "ヤマグチ シュッパン",
    },
    {
      No: 14,
      登録日時: "2024-11-07 11:15",
      更新日時: "2024-11-07 12:15",
      企業Ｎｏ: "1014",
      企業名: "Company N",
      フリガナ: "サイトウ ケンキュウジョ",
    },
    {
      No: 15,
      登録日時: "2024-11-08 10:00",
      更新日時: "2024-11-08 11:00",
      企業Ｎｏ: "1015",
      企業名: "Company O",
      フリガナ: "イケダ ジムショ",
    },
    {
      No: 16,
      登録日時: "2024-11-08 12:00",
      更新日時: "2024-11-08 13:00",
      企業Ｎｏ: "1016",
      企業名: "Company P",
      フリガナ: "ハヤシ リョウイン",
    },
    {
      No: 17,
      登録日時: "2024-11-09 09:00",
      更新日時: "2024-11-09 10:00",
      企業Ｎｏ: "1017",
      企業名: "Company Q",
      フリガナ: "クドウ ゲンバ",
    },
  ];

  const columnWidths = [5, 20, 20, 8, 10, 10, 10, 10, 10, 10];
  const columnAlignments: ("left" | "center" | "right")[] = ["right"];

  const searchConditions = () => {};

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
  const [textValue5, setTextValue5] = useState<string>("");

  // Handle selection change
  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    // Update the selected data state
    setSelectedData(newSelectedData);

    // Log the selected data to the console
    console.log("Selected Data:", newSelectedData);
  };

  const navigateToInfoPage = () => {
    navigate("/CompanyListInfo");
  };
  const navigateToEditPage = () => {
    navigate("/CompanyListInfo");
  };

  const borderStyle = "1px solid #ccc";

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="企業一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="companies-search-container">
          <Box className="number-detail-column">
            <TextBoxWithLabel
              disabled={false}
              label="企業No"
              width="12vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
          <Box className="name-detail-column">
            <Box>
              <Box className="person-name-details">
                <Box>
                  <TextBoxWithLabel
                    disabled={false}
                    label="フリガナ"
                    width="25vw" // Uncomment to set a custom width
                    value={textValue2}
                    onChange={(e: any) => setTextValue2(e.target.value)}
                    labelWidth="70px"
                  />
                  <TextBoxWithLabel
                    disabled={false}
                    labelWidth="70px"
                    label="企業名"
                    width="25vw" // Uncomment to set a custom width
                    value={textValue3}
                    onChange={(e: any) => setTextValue3(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="last-column">
            <Box className="last-row">
              <Box className="search-button">
                <ButtonAtom
                  onClick={searchConditions}
                  label="検索"
                  margin="0 5vw"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <ButtonAtom
                onClick={searchConditions}
                label="新規"

            /> */}
      <DataTable // Customize header height
        headers={headers}
        data={data}
        maxHeight="calc(87vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={searchConditions}
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

export default CompaniesList;
