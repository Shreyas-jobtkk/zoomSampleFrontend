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
import { useNavigate } from "react-router-dom";
import "./AdminMenu.scss";

function AdministratorList() {
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
    "管理者Ｎｏ",
    "管理者名（姓)",
    "管理者名（名)",
    "フリガナ（姓)",
    "フリガナ（名)",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      管理者Ｎｏ: "1001",
      "管理者名（姓)": "山田",
      "管理者名（名)": "太郎",
      "フリガナ（姓)": "ヤマダ",
      "フリガナ（名)": "タロウ",
    },
    {
      No: 2,
      登録日時: "2024-11-01 10:30",
      更新日時: "2024-11-01 11:30",
      管理者Ｎｏ: "1002",
      "管理者名（姓)": "鈴木",
      "管理者名（名)": "花子",
      "フリガナ（姓)": "スズキ",
      "フリガナ（名)": "ハナコ",
    },
    {
      No: 3,
      登録日時: "2024-11-01 12:00",
      更新日時: "2024-11-01 13:00",
      管理者Ｎｏ: "1003",
      "管理者名（姓)": "佐藤",
      "管理者名（名)": "健一",
      "フリガナ（姓)": "サトウ",
      "フリガナ（名)": "ケンイチ",
    },
    {
      No: 4,
      登録日時: "2024-11-01 13:30",
      更新日時: "2024-11-01 14:30",
      管理者Ｎｏ: "1004",
      "管理者名（姓)": "高橋",
      "管理者名（名)": "美咲",
      "フリガナ（姓)": "タカハシ",
      "フリガナ（名)": "ミサキ",
    },
    {
      No: 5,
      登録日時: "2024-11-01 15:00",
      更新日時: "2024-11-01 16:00",
      管理者Ｎｏ: "1005",
      "管理者名（姓)": "伊藤",
      "管理者名（名)": "真一",
      "フリガナ（姓)": "イトウ",
      "フリガナ（名)": "シンイチ",
    },
    {
      No: 6,
      登録日時: "2024-11-02 09:00",
      更新日時: "2024-11-02 10:00",
      管理者Ｎｏ: "1006",
      "管理者名（姓)": "渡辺",
      "管理者名（名)": "優子",
      "フリガナ（姓)": "ワタナベ",
      "フリガナ（名)": "ユウコ",
    },
    {
      No: 7,
      登録日時: "2024-11-02 10:30",
      更新日時: "2024-11-02 11:30",
      管理者Ｎｏ: "1007",
      "管理者名（姓)": "中村",
      "管理者名（名)": "直人",
      "フリガナ（姓)": "ナカムラ",
      "フリガナ（名)": "ナオト",
    },
    {
      No: 8,
      登録日時: "2024-11-02 12:00",
      更新日時: "2024-11-02 13:00",
      管理者Ｎｏ: "1008",
      "管理者名（姓)": "小林",
      "管理者名（名)": "里奈",
      "フリガナ（姓)": "コバヤシ",
      "フリガナ（名)": "リナ",
    },
    {
      No: 9,
      登録日時: "2024-11-02 13:30",
      更新日時: "2024-11-02 14:30",
      管理者Ｎｏ: "1009",
      "管理者名（姓)": "加藤",
      "管理者名（名)": "智子",
      "フリガナ（姓)": "カトウ",
      "フリガナ（名)": "トモコ",
    },
    {
      No: 10,
      登録日時: "2024-11-02 15:00",
      更新日時: "2024-11-02 16:00",
      管理者Ｎｏ: "1010",
      "管理者名（姓)": "吉田",
      "管理者名（名)": "光",
      "フリガナ（姓)": "ヨシダ",
      "フリガナ（名)": "ヒカル",
    },
    {
      No: 11,
      登録日時: "2024-11-03 09:00",
      更新日時: "2024-11-03 10:00",
      管理者Ｎｏ: "1011",
      "管理者名（姓)": "山本",
      "管理者名（名)": "信",
      "フリガナ（姓)": "ヤマモト",
      "フリガナ（名)": "シン",
    },
    {
      No: 12,
      登録日時: "2024-11-03 10:30",
      更新日時: "2024-11-03 11:30",
      管理者Ｎｏ: "1012",
      "管理者名（姓)": "松本",
      "管理者名（名)": "翔太",
      "フリガナ（姓)": "マツモト",
      "フリガナ（名)": "ショウタ",
    },
    {
      No: 13,
      登録日時: "2024-11-03 12:00",
      更新日時: "2024-11-03 13:00",
      管理者Ｎｏ: "1013",
      "管理者名（姓)": "井上",
      "管理者名（名)": "佳代",
      "フリガナ（姓)": "イノウエ",
      "フリガナ（名)": "カヨ",
    },
    {
      No: 14,
      登録日時: "2024-11-03 13:30",
      更新日時: "2024-11-03 14:30",
      管理者Ｎｏ: "1014",
      "管理者名（姓)": "木村",
      "管理者名（名)": "拓海",
      "フリガナ（姓)": "キムラ",
      "フリガナ（名)": "タクミ",
    },
    {
      No: 15,
      登録日時: "2024-11-03 15:00",
      更新日時: "2024-11-03 16:00",
      管理者Ｎｏ: "1015",
      "管理者名（姓)": "林",
      "管理者名（名)": "美樹",
      "フリガナ（姓)": "ハヤシ",
      "フリガナ（名)": "ミキ",
    },
    {
      No: 16,
      登録日時: "2024-11-04 09:00",
      更新日時: "2024-11-04 10:00",
      管理者Ｎｏ: "1016",
      "管理者名（姓)": "清水",
      "管理者名（名)": "祐樹",
      "フリガナ（姓)": "シミズ",
      "フリガナ（名)": "ユウキ",
    },
    {
      No: 17,
      登録日時: "2024-11-04 10:30",
      更新日時: "2024-11-04 11:30",
      管理者Ｎｏ: "1017",
      "管理者名（姓)": "山崎",
      "管理者名（名)": "優奈",
      "フリガナ（姓)": "ヤマザキ",
      "フリガナ（名)": "ユナ",
    },
    {
      No: 18,
      登録日時: "2024-11-04 12:00",
      更新日時: "2024-11-04 13:00",
      管理者Ｎｏ: "1018",
      "管理者名（姓)": "森",
      "管理者名（名)": "恵",
      "フリガナ（姓)": "モリ",
      "フリガナ（名)": "メグミ",
    },
  ];

  const columnWidths = [5, 20, 20, 8, 10, 10, 10, 10, 10, 10];
  const columnAlignments: ("left" | "center" | "right")[] = ["right"];
  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  const searchConditions = () => {};
  const navigateToInfoPage = () => {
    navigate("/AdministratorListInfo");
  };
  const navigateToEditPage = () => {
    navigate("/AdministratorListEdit");
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

  const borderStyle = "1px solid #ccc";

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="管理者一覧" />

      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="administrator-search-container">
          <Box className="number-detail-column">
            <TextBoxWithLabel
              disabled={false}
              label="管理者No"
              width="18vw" // Uncomment to set a custom width
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
                    label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                    labelWidth="120px"
                    width="15vw" // Uncomment to set a custom width
                    value={textValue2}
                    onChange={(e: any) => setTextValue2(e.target.value)}
                  />
                  <TextBoxWithLabel
                    disabled={false}
                    label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                    labelWidth="120px"
                    width="15vw" // Uncomment to set a custom width
                    value={textValue3}
                    onChange={(e: any) => setTextValue3(e.target.value)}
                  />
                </Box>
                <Box>
                  <TextBoxWithLabel
                    disabled={false}
                    label="メイ"
                    labelWidth="40px"
                    width="15vw" // Uncomment to set a custom width
                    value={textValue4}
                    onChange={(e: any) => setTextValue4(e.target.value)}
                  />
                  <TextBoxWithLabel
                    disabled={false}
                    label="名"
                    labelWidth="40px"
                    width="15vw" // Uncomment to set a custom width
                    value={textValue5}
                    onChange={(e: any) => setTextValue5(e.target.value)}
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

export default AdministratorList;
