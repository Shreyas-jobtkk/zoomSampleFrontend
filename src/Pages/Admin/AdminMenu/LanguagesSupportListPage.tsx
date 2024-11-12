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
  const headers = ["No", "開始日時", "終了日時", "言語Ｎｏ", "言語", "和訳"];
  const data = [
    {
      No: 1,
      開始日時: "2024-11-01 09:00",
      終了日時: "2024-11-01 10:00",
      言語Ｎｏ: "1001",
      言語: "English",
      和訳: "英語",
    },
    {
      No: 2,
      開始日時: "2024-11-01 10:00",
      終了日時: "2024-11-01 11:00",
      言語Ｎｏ: "1002",
      言語: "日本語",
      和訳: "日本語",
    },
    {
      No: 3,
      開始日時: "2024-11-01 11:00",
      終了日時: "2024-11-01 12:00",
      言語Ｎｏ: "1003",
      言語: "中文",
      和訳: "中国語",
    },
    {
      No: 4,
      開始日時: "2024-11-01 12:00",
      終了日時: "2024-11-01 13:00",
      言語Ｎｏ: "1004",
      言語: "한국어",
      和訳: "韓国語",
    },
    {
      No: 5,
      開始日時: "2024-11-01 13:00",
      終了日時: "2024-11-01 14:00",
      言語Ｎｏ: "1005",
      言語: "Français",
      和訳: "フランス語",
    },
    {
      No: 6,
      開始日時: "2024-11-01 14:00",
      終了日時: "2024-11-01 15:00",
      言語Ｎｏ: "1006",
      言語: "Español",
      和訳: "スペイン語",
    },
    {
      No: 7,
      開始日時: "2024-11-01 15:00",
      終了日時: "2024-11-01 16:00",
      言語Ｎｏ: "1007",
      言語: "Deutsch",
      和訳: "ドイツ語",
    },
    {
      No: 8,
      開始日時: "2024-11-01 16:00",
      終了日時: "2024-11-01 17:00",
      言語Ｎｏ: "1008",
      言語: "Italiano",
      和訳: "イタリア語",
    },
    {
      No: 9,
      開始日時: "2024-11-01 17:00",
      終了日時: "2024-11-01 18:00",
      言語Ｎｏ: "1009",
      言語: "Português",
      和訳: "ポルトガル語",
    },
    {
      No: 10,
      開始日時: "2024-11-01 18:00",
      終了日時: "2024-11-01 19:00",
      言語Ｎｏ: "1010",
      言語: "Русский",
      和訳: "ロシア語",
    },
    {
      No: 11,
      開始日時: "2024-11-01 19:00",
      終了日時: "2024-11-01 20:00",
      言語Ｎｏ: "1011",
      言語: "हिन्दी",
      和訳: "ヒンディー語",
    },
    {
      No: 12,
      開始日時: "2024-11-01 20:00",
      終了日時: "2024-11-01 21:00",
      言語Ｎｏ: "1012",
      言語: "العربية",
      和訳: "アラビア語",
    },
    {
      No: 13,
      開始日時: "2024-11-01 21:00",
      終了日時: "2024-11-01 22:00",
      言語Ｎｏ: "1013",
      言語: "বাংলা",
      和訳: "ベンガル語",
    },
    {
      No: 14,
      開始日時: "2024-11-01 22:00",
      終了日時: "2024-11-01 23:00",
      言語Ｎｏ: "1014",
      言語: "اردو",
      和訳: "ウルドゥー語",
    },
    {
      No: 15,
      開始日時: "2024-11-02 08:00",
      終了日時: "2024-11-02 09:00",
      言語Ｎｏ: "1015",
      言語: "Svenska",
      和訳: "スウェーデン語",
    },
    {
      No: 16,
      開始日時: "2024-11-02 09:00",
      終了日時: "2024-11-02 10:00",
      言語Ｎｏ: "1016",
      言語: "Ελληνικά",
      和訳: "ギリシャ語",
    },
    {
      No: 17,
      開始日時: "2024-11-02 10:00",
      終了日時: "2024-11-02 11:00",
      言語Ｎｏ: "1017",
      言語: "Türkçe",
      和訳: "トルコ語",
    },
    {
      No: 18,
      開始日時: "2024-11-02 11:00",
      終了日時: "2024-11-02 12:00",
      言語Ｎｏ: "1018",
      言語: "Nederlands",
      和訳: "オランダ語",
    },
    {
      No: 19,
      開始日時: "2024-11-02 12:00",
      終了日時: "2024-11-02 13:00",
      言語Ｎｏ: "1019",
      言語: "ภาษาไทย",
      和訳: "タイ語",
    },
    {
      No: 20,
      開始日時: "2024-11-02 13:00",
      終了日時: "2024-11-02 14:00",
      言語Ｎｏ: "1020",
      言語: "Tiếng Việt",
      和訳: "ベトナム語",
    },
    {
      No: 21,
      開始日時: "2024-11-02 14:00",
      終了日時: "2024-11-02 15:00",
      言語Ｎｏ: "1021",
      言語: "Bahasa Melayu",
      和訳: "マレー語",
    },
    {
      No: 22,
      開始日時: "2024-11-02 15:00",
      終了日時: "2024-11-02 16:00",
      言語Ｎｏ: "1022",
      言語: "Filipino",
      和訳: "フィリピン語",
    },
    {
      No: 23,
      開始日時: "2024-11-02 16:00",
      終了日時: "2024-11-02 17:00",
      言語Ｎｏ: "1023",
      言語: "فارسی",
      和訳: "ペルシャ語",
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

  return (
    <div className="admin-menu-nav-page">
      <MenuHeader title="対応言語一覧" />
      <div className="search-label">検索条件</div>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1vh 1vw",
          display: "flex",
          flexDirection: "column",
          margin: "1vh 0",

          // transform: 'scaleY(0.8)',
          // overflowY: 'auto',
        }}
      >
        <div className="select-range">
          <span>登録日時</span>

          <span>開始日時：</span>
          <DatePicker label="" onDateChange={handleStartDateChange} />
          {/* <div>{formatFullDateTime(selectedStartDate, selectedStartTime)}</div> Display full start datetime */}
          <TimePicker
            label="Select Start Time"
            value={selectedStartTime}
            onChange={handleStartTimeChange} // Use the separate handler for start time
          />

          <span>~</span>

          <span>終了日時：</span>
          <DatePicker label="" onDateChange={handleEndDateChange} />
          {/* <div>{formatFullDateTime(selectedEndDate, selectedEndTime)}</div> Display full end datetime */}
          <TimePicker
            label="Select End Time"
            value={selectedEndTime}
            onChange={handleEndTimeChange} // Use the separate handler for end time
          />
        </div>
        <div className="companies-search-container">
          <div className="number-detail-column">
            <TextBoxWithLabel
              disabled={false}
              label="言語No"
              width="12vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </div>
          <div className="name-detail-column">
            <div>
              <div className="person-name-details">
                <div>
                  <TextBoxWithLabel
                    disabled={false}
                    label="和訳"
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
                </div>
              </div>
            </div>
          </div>
          <div className="last-column">
            <div className="last-row">
              <div className="search-button">
                <ButtonAtom
                  onClick={searchConditions}
                  label="検索"
                  margin="0 5vw"
                />
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}

export default LanguagesSupportList;
