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

function InterpretersList() {
  const navigate = useNavigate();
  // State for selected start and end times
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(
    dayjs()
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(dayjs());
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options = [
    { label: "None", value: "" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  // State for selected start and end dates
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "通訳者No",
    "名前",
    "フリガナ",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      通訳者No: "1001",
      名前: "佐藤　一郎",
      フリガナ: "サトウ　イチロウ",
    },
    {
      No: 2,
      登録日時: "2024-11-01 09:15",
      更新日時: "2024-11-01 10:15",
      通訳者No: "1002",
      名前: "田中　次郎",
      フリガナ: "タナカ　ジロウ",
    },
    {
      No: 3,
      登録日時: "2024-11-01 09:30",
      更新日時: "2024-11-01 10:30",
      通訳者No: "1003",
      名前: "鈴木　三郎",
      フリガナ: "スズキ　サブロウ",
    },
    {
      No: 4,
      登録日時: "2024-11-01 09:45",
      更新日時: "2024-11-01 10:45",
      通訳者No: "1004",
      名前: "高橋　四郎",
      フリガナ: "タカハシ　シロウ",
    },
    {
      No: 5,
      登録日時: "2024-11-01 10:00",
      更新日時: "2024-11-01 11:00",
      通訳者No: "1005",
      名前: "伊藤　五郎",
      フリガナ: "イトウ　ゴロウ",
    },
    {
      No: 6,
      登録日時: "2024-11-01 10:15",
      更新日時: "2024-11-01 11:15",
      通訳者No: "1006",
      名前: "渡辺　六郎",
      フリガナ: "ワタナベ　ロクロウ",
    },
    {
      No: 7,
      登録日時: "2024-11-01 10:30",
      更新日時: "2024-11-01 11:30",
      通訳者No: "1007",
      名前: "山本　七郎",
      フリガナ: "ヤマモト　シチロウ",
    },
    {
      No: 8,
      登録日時: "2024-11-01 10:45",
      更新日時: "2024-11-01 11:45",
      通訳者No: "1008",
      名前: "中村　八郎",
      フリガナ: "ナカムラ　ハチロウ",
    },
    {
      No: 9,
      登録日時: "2024-11-01 11:00",
      更新日時: "2024-11-01 12:00",
      通訳者No: "1009",
      名前: "小林　九郎",
      フリガナ: "コバヤシ　クロウ",
    },
    {
      No: 10,
      登録日時: "2024-11-01 11:15",
      更新日時: "2024-11-01 12:15",
      通訳者No: "1010",
      名前: "加藤　十郎",
      フリガナ: "カトウ　ジュウロウ",
    },
    {
      No: 11,
      登録日時: "2024-11-01 11:30",
      更新日時: "2024-11-01 12:30",
      通訳者No: "1011",
      名前: "佐々木　十一",
      フリガナ: "ササキ　ジュウイチ",
    },
    {
      No: 12,
      登録日時: "2024-11-01 11:45",
      更新日時: "2024-11-01 12:45",
      通訳者No: "1012",
      名前: "松本　十二",
      フリガナ: "マツモト　ジュウニ",
    },
    {
      No: 13,
      登録日時: "2024-11-01 12:00",
      更新日時: "2024-11-01 13:00",
      通訳者No: "1013",
      名前: "井上　十三",
      フリガナ: "イノウエ　ジュウサン",
    },
    {
      No: 14,
      登録日時: "2024-11-01 12:15",
      更新日時: "2024-11-01 13:15",
      通訳者No: "1014",
      名前: "木村　十四",
      フリガナ: "キムラ　ジュウヨン",
    },
    {
      No: 15,
      登録日時: "2024-11-01 12:30",
      更新日時: "2024-11-01 13:30",
      通訳者No: "1015",
      名前: "林　十五",
      フリガナ: "ハヤシ　ジュウゴ",
    },
    {
      No: 16,
      登録日時: "2024-11-01 12:45",
      更新日時: "2024-11-01 13:45",
      通訳者No: "1016",
      名前: "福田　十六",
      フリガナ: "フクダ　ジュウロク",
    },
    {
      No: 17,
      登録日時: "2024-11-01 13:00",
      更新日時: "2024-11-01 14:00",
      通訳者No: "1017",
      名前: "岡田　十七",
      フリガナ: "オカダ　ジュウシチ",
    },
    {
      No: 18,
      登録日時: "2024-11-01 13:15",
      更新日時: "2024-11-01 14:15",
      通訳者No: "1018",
      名前: "西村　十八",
      フリガナ: "ニシムラ　ジュウハチ",
    },
    {
      No: 19,
      登録日時: "2024-11-01 13:30",
      更新日時: "2024-11-01 14:30",
      通訳者No: "1019",
      名前: "中島　十九",
      フリガナ: "ナカジマ　ジュウキュウ",
    },
    {
      No: 20,
      登録日時: "2024-11-01 13:45",
      更新日時: "2024-11-01 14:45",
      通訳者No: "1020",
      名前: "長田　二十",
      フリガナ: "オサダ　ニジュウ",
    },
    {
      No: 21,
      登録日時: "2024-11-01 14:00",
      更新日時: "2024-11-01 15:00",
      通訳者No: "1021",
      名前: "吉田　二十一",
      フリガナ: "ヨシダ　ニジュウイチ",
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
    navigate("/InterpretersListInfo");
  };

  const navigateToInterpreterCreate = () => {
    navigate("/InterpretersListCreate");
  };
  const navigateToEditPage = () => {
    navigate("/InterpretersListInfo");
  };

  const borderStyle = "1px solid #ccc";

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="通訳者一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="interpreter-details move-top">
          <TextBoxWithLabel
            label="通訳者No"
            width="12vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
            disabled={false}
          />

          <Box>
            <TextBoxWithLabel
              label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
              width="18vw" // Uncomment to set a custom width
              value={textValue2}
              onChange={(e: any) => setTextValue2(e.target.value)}
              labelWidth="130px"
              disabled={false}
            />
            <TextBoxWithLabel
              labelWidth="130px"
              label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
              width="18vw" // Uncomment to set a custom width
              value={textValue3}
              onChange={(e: any) => setTextValue3(e.target.value)}
              disabled={false}
            />
          </Box>

          <Box>
            <TextBoxWithLabel
              label="メイ"
              labelWidth="40px"
              width="12vw" // Uncomment to set a custom width
              value={textValue4}
              onChange={(e: any) => setTextValue4(e.target.value)}
              disabled={false}
            />
            <TextBoxWithLabel
              label="名"
              labelWidth="40px"
              width="12vw" // Uncomment to set a custom width
              value={textValue5}
              onChange={(e: any) => setTextValue5(e.target.value)}
              disabled={false}
            />
          </Box>

          <span>通訳言語：</span>
          <SelectOption
            label=""
            options={options}
            width={150}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <Box className="search-button">
            <ButtonAtom onClick={searchConditions} label="検索" />
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
        onClick={navigateToInterpreterCreate}
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

export default InterpretersList;
