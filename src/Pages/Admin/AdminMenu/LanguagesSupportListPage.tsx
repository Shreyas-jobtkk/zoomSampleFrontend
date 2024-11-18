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

function LanguagesSupportList() {
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
    "言語Ｎｏ",
    "言語",
    "フリガナ",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      言語Ｎｏ: "1001",
      言語: "English",
      フリガナ: "英語",
    },
    {
      No: 2,
      登録日時: "2024-11-01 10:00",
      更新日時: "2024-11-01 11:00",
      言語Ｎｏ: "1002",
      言語: "日本語",
      フリガナ: "日本語",
    },
    {
      No: 3,
      登録日時: "2024-11-01 11:00",
      更新日時: "2024-11-01 12:00",
      言語Ｎｏ: "1003",
      言語: "中文",
      フリガナ: "中国語",
    },
    {
      No: 4,
      登録日時: "2024-11-01 12:00",
      更新日時: "2024-11-01 13:00",
      言語Ｎｏ: "1004",
      言語: "한국어",
      フリガナ: "韓国語",
    },
    {
      No: 5,
      登録日時: "2024-11-01 13:00",
      更新日時: "2024-11-01 14:00",
      言語Ｎｏ: "1005",
      言語: "Français",
      フリガナ: "フランス語",
    },
    {
      No: 6,
      登録日時: "2024-11-01 14:00",
      更新日時: "2024-11-01 15:00",
      言語Ｎｏ: "1006",
      言語: "Español",
      フリガナ: "スペイン語",
    },
    {
      No: 7,
      登録日時: "2024-11-01 15:00",
      更新日時: "2024-11-01 16:00",
      言語Ｎｏ: "1007",
      言語: "Deutsch",
      フリガナ: "ドイツ語",
    },
    {
      No: 8,
      登録日時: "2024-11-01 16:00",
      更新日時: "2024-11-01 17:00",
      言語Ｎｏ: "1008",
      言語: "Italiano",
      フリガナ: "イタリア語",
    },
    {
      No: 9,
      登録日時: "2024-11-01 17:00",
      更新日時: "2024-11-01 18:00",
      言語Ｎｏ: "1009",
      言語: "Português",
      フリガナ: "ポルトガル語",
    },
    {
      No: 10,
      登録日時: "2024-11-01 18:00",
      更新日時: "2024-11-01 19:00",
      言語Ｎｏ: "1010",
      言語: "Русский",
      フリガナ: "ロシア語",
    },
    {
      No: 11,
      登録日時: "2024-11-01 19:00",
      更新日時: "2024-11-01 20:00",
      言語Ｎｏ: "1011",
      言語: "हिन्दी",
      フリガナ: "ヒンディー語",
    },
    {
      No: 12,
      登録日時: "2024-11-01 20:00",
      更新日時: "2024-11-01 21:00",
      言語Ｎｏ: "1012",
      言語: "العربية",
      フリガナ: "アラビア語",
    },
    {
      No: 13,
      登録日時: "2024-11-01 21:00",
      更新日時: "2024-11-01 22:00",
      言語Ｎｏ: "1013",
      言語: "বাংলা",
      フリガナ: "ベンガル語",
    },
    {
      No: 14,
      登録日時: "2024-11-01 22:00",
      更新日時: "2024-11-01 23:00",
      言語Ｎｏ: "1014",
      言語: "اردو",
      フリガナ: "ウルドゥー語",
    },
    {
      No: 15,
      登録日時: "2024-11-02 08:00",
      更新日時: "2024-11-02 09:00",
      言語Ｎｏ: "1015",
      言語: "Svenska",
      フリガナ: "スウェーデン語",
    },
    {
      No: 16,
      登録日時: "2024-11-02 09:00",
      更新日時: "2024-11-02 10:00",
      言語Ｎｏ: "1016",
      言語: "Ελληνικά",
      フリガナ: "ギリシャ語",
    },
    {
      No: 17,
      登録日時: "2024-11-02 10:00",
      更新日時: "2024-11-02 11:00",
      言語Ｎｏ: "1017",
      言語: "Türkçe",
      フリガナ: "トルコ語",
    },
    {
      No: 18,
      登録日時: "2024-11-02 11:00",
      更新日時: "2024-11-02 12:00",
      言語Ｎｏ: "1018",
      言語: "Nederlands",
      フリガナ: "オランダ語",
    },
    {
      No: 19,
      登録日時: "2024-11-02 12:00",
      更新日時: "2024-11-02 13:00",
      言語Ｎｏ: "1019",
      言語: "ภาษาไทย",
      フリガナ: "タイ語",
    },
    {
      No: 20,
      登録日時: "2024-11-02 13:00",
      更新日時: "2024-11-02 14:00",
      言語Ｎｏ: "1020",
      言語: "Tiếng Việt",
      フリガナ: "ベトナム語",
    },
    {
      No: 21,
      登録日時: "2024-11-02 14:00",
      更新日時: "2024-11-02 15:00",
      言語Ｎｏ: "1021",
      言語: "Bahasa Melayu",
      フリガナ: "マレー語",
    },
    {
      No: 22,
      登録日時: "2024-11-02 15:00",
      更新日時: "2024-11-02 16:00",
      言語Ｎｏ: "1022",
      言語: "Filipino",
      フリガナ: "フィリピン語",
    },
    {
      No: 23,
      登録日時: "2024-11-02 16:00",
      更新日時: "2024-11-02 17:00",
      言語Ｎｏ: "1023",
      言語: "فارسی",
      フリガナ: "ペルシャ語",
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
    selectedData: Array<{ No: string | number; [key: string]: string | number }>
  ) => {
    console.log("Selected Data:", selectedData);
  };

  const borderStyle = "1px solid #ccc";

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="対応言語一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="companies-search-container">
          <Box className="number-detail-column">
            <TextBoxWithLabel
              disabled={false}
              label="言語No"
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
                    label="言語"
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
        onClick={searchConditions}
        label="閲覧"

        // margin='0 2vw'
      />
      <ButtonAtom
        onClick={searchConditions}
        label="編集"

        // margin='0 2vw'
      />
      <ButtonAtom
        onClick={searchConditions}
        label="削除"

        // margin='0 2vw'
      />
    </Box>
  );
}

export default LanguagesSupportList;
