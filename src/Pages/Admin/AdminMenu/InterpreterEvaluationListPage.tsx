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
import { Height } from "@mui/icons-material";
import "./AdminMenu.scss";

function InterpreterEvaluationList() {
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
    "開始日時",
    "終了日時",
    "契約Ｎｏ",
    "企業名",
    "店舗名",
    "通訳者Ｎｏ",
    "通訳者名",
    "通訳言語",
    "評価",
  ];
  const data = [
    {
      No: 1,
      開始日時: "2024-11-01 09:00",
      終了日時: "2024-11-01 10:00",
      契約Ｎｏ: "1001",
      企業名: "Company A",
      店舗名: "Sales",
      通訳者Ｎｏ: 7,
      通訳言語: "Japanese",
      通訳者名: "John",
      評価: 5,
    },
    {
      No: 2,
      開始日時: "2024-11-01 11:00",
      終了日時: "2024-11-01 12:00",
      契約Ｎｏ: "1002",
      企業名: "Company B",
      店舗名: "Marketing",
      通訳者Ｎｏ: 8,
      通訳言語: "English",
      通訳者名: "Alice",
      評価: 4,
    },
    {
      No: 3,
      開始日時: "2024-11-01 13:00",
      終了日時: "2024-11-01 14:00",
      契約Ｎｏ: "1003",
      企業名: "Company C",
      店舗名: "Support",
      通訳者Ｎｏ: 9,
      通訳言語: "Chinese",
      通訳者名: "Mike",
      評価: 3,
    },
    {
      No: 4,
      開始日時: "2024-11-01 15:00",
      終了日時: "2024-11-01 16:00",
      契約Ｎｏ: "1004",
      企業名: "Company D",
      店舗名: "IT",
      通訳者Ｎｏ: 10,
      通訳言語: "Korean",
      通訳者名: "Sarah",
      評価: 5,
    },
    {
      No: 5,
      開始日時: "2024-11-01 17:00",
      終了日時: "2024-11-01 18:00",
      契約Ｎｏ: "1005",
      企業名: "Company E",
      店舗名: "Finance",
      通訳者Ｎｏ: 11,
      通訳言語: "Japanese",
      通訳者名: "David",
      評価: 4,
    },
    {
      No: 6,
      開始日時: "2024-11-01 19:00",
      終了日時: "2024-11-01 20:00",
      契約Ｎｏ: "1006",
      企業名: "Company F",
      店舗名: "HR",
      通訳者Ｎｏ: 12,
      通訳言語: "French",
      通訳者名: "Anna",
      評価: 5,
    },
    {
      No: 7,
      開始日時: "2024-11-02 09:00",
      終了日時: "2024-11-02 10:00",
      契約Ｎｏ: "1007",
      企業名: "Company G",
      店舗名: "Engineering",
      通訳者Ｎｏ: 13,
      通訳言語: "German",
      通訳者名: "Tom",
      評価: 3,
    },
    {
      No: 8,
      開始日時: "2024-11-02 11:00",
      終了日時: "2024-11-02 12:00",
      契約Ｎｏ: "1008",
      企業名: "Company H",
      店舗名: "Legal",
      通訳者Ｎｏ: 14,
      通訳言語: "Japanese",
      通訳者名: "Emma",
      評価: 5,
    },
    {
      No: 9,
      開始日時: "2024-11-02 13:00",
      終了日時: "2024-11-02 14:00",
      契約Ｎｏ: "1009",
      企業名: "Company I",
      店舗名: "Operations",
      通訳者Ｎｏ: 15,
      通訳言語: "Spanish",
      通訳者名: "James",
      評価: 4,
    },
    {
      No: 10,
      開始日時: "2024-11-02 15:00",
      終了日時: "2024-11-02 16:00",
      契約Ｎｏ: "1010",
      企業名: "Company J",
      店舗名: "R&D",
      通訳者Ｎｏ: 16,
      通訳言語: "English",
      通訳者名: "Sophia",
      評価: 3,
    },
    {
      No: 11,
      開始日時: "2024-11-02 17:00",
      終了日時: "2024-11-02 18:00",
      契約Ｎｏ: "1011",
      企業名: "Company K",
      店舗名: "Customer Service",
      通訳者Ｎｏ: 17,
      通訳言語: "Japanese",
      通訳者名: "Liam",
      評価: 5,
    },
    {
      No: 12,
      開始日時: "2024-11-02 19:00",
      終了日時: "2024-11-02 20:00",
      契約Ｎｏ: "1012",
      企業名: "Company L",
      店舗名: "Logistics",
      通訳者Ｎｏ: 18,
      通訳言語: "Italian",
      通訳者名: "Olivia",
      評価: 4,
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
  const [textValue6, setTextValue6] = useState<string>("");
  const [textValue7, setTextValue7] = useState<string>("");
  const [textValue8, setTextValue8] = useState<string>("");
  const [textValue9, setTextValue9] = useState<string>("");
  const [textValue5, setTextValue5] = useState<string>("");
  const [textValue10, setTextValue10] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { label: "None", value: "" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const handleSelectionChange = (
    selectedData: Array<{ No: string | number; [key: string]: string | number }>
  ) => {
    console.log("Selected Data:", selectedData);
  };

  const borderStyle = "1px solid #ccc";

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="通訳評価一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>

        <Box className="select-range">
          {/* <Box style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}> */}
          <Box>通訳日時</Box>
          <Box>開始日時：</Box>
          <DatePicker label="" onDateChange={handleStartDateChange} />
          {/* <Box>{formatFullDateTime(selectedStartDate, selectedStartTime)}</Box> Display full start datetime */}
          <TimePicker
            label="Select Start Time"
            value={selectedStartTime}
            onChange={handleStartTimeChange} // Use the separate handler for start time
          />

          <span>~</span>

          <span>終了日時：</span>
          <DatePicker label="" onDateChange={handleEndDateChange} />
          {/* <Box>{formatFullDateTime(selectedEndDate, selectedEndTime)}</Box> Display full end datetime */}
          <TimePicker
            label="Select End Time"
            value={selectedEndTime}
            onChange={handleEndTimeChange} // Use the separate handler for end time
          />
        </Box>
        <Box>
          <ButtonAtom
            onClick={searchConditions}
            label="契約検索"
            width="90px"
            margin="2px"
          />
          <Box className="contract-details">
            <TextBoxWithLabel
              label="契約No"
              width="12vw" // Uncomment to set a custom width
              value={textValue10}
              onChange={(e: any) => setTextValue10(e.target.value)}
              // disabled={true}
            />
            <TextBoxWithLabel
              label="企業名"
              width="29vw" // Uncomment to set a custom width
              value={textValue3}
              onChange={(e: any) => setTextValue3(e.target.value)}
            />
            <TextBoxWithLabel
              label="店舗名"
              width="29vw" // Uncomment to set a custom width
              value={textValue9}
              onChange={(e: any) => setTextValue9(e.target.value)}
            />
          </Box>
        </Box>
        <ButtonAtom
          onClick={searchConditions}
          label="通訳者検索"
          width="100px"
          margin="2px"
        />
        <Box className="interpreter-search-details">
          <TextBoxWithLabel
            label="通訳者No"
            width="12vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />

          <TextBoxWithLabel
            label="通訳者名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
            labelWidth="120px"
            width="12vw" // Uncomment to set a custom width
            value={textValue5}
            onChange={(e: any) => setTextValue5(e.target.value)}
          />

          <Box>
            <TextBoxWithLabel
              label="名"
              labelWidth="40px"
              width="12vw" // Uncomment to set a custom width
              value={textValue7}
              onChange={(e: any) => setTextValue7(e.target.value)}
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

          <ButtonAtom onClick={searchConditions} label="検索" margin="0 5vw" />
        </Box>
      </Box>
      <DataTable // Customize header height
        headers={headers}
        data={data}
        maxHeight="calc(80vh - 260px)"
        onSelectionChange={handleSelectionChange}
      />
      <ButtonAtom
        onClick={searchConditions}
        label="閲覧"

        // margin='0 2vw'
      />
    </Box>
  );
}

export default InterpreterEvaluationList;
