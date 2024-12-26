import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import "./AdminMenu.scss";

function RespondersList() {
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業Ｎｏ",
    "企業名",
    "店舗Ｎｏ",
    "店舗名",
    "契約Ｎｏ",
    "応対者名",
    "フリガナ",
  ];
  const data = [
    {
      No: 1,
      登録日時: "2024-11-01 09:00",
      更新日時: "2024-11-01 10:00",
      企業Ｎｏ: "1001",
      企業名: "Company A",
      店舗Ｎｏ: "3001",
      店舗名: "Sales",
      契約Ｎｏ: "4001",
      応対者名: "北海　一朗太",
      フリガナ: "ホッカイ　イチロウタ",
      店舗Ｎｎ: "",
    },
    {
      No: 2,
      登録日時: "2024-11-01 10:00",
      更新日時: "2024-11-01 11:00",
      企業Ｎｏ: "1002",
      企業名: "Company B",
      店舗Ｎｏ: "3002",
      店舗名: "Customer Service",
      契約Ｎｏ: "4002",
      応対者名: "佐藤　一郎",
      フリガナ: "サトウ　イチロウ",
      店舗Ｎｎ: "",
    },
    {
      No: 3,
      登録日時: "2024-11-01 11:00",
      更新日時: "2024-11-01 12:00",
      企業Ｎｏ: "1003",
      企業名: "Company C",
      店舗Ｎｏ: "3003",
      店舗名: "Sales",
      契約Ｎｏ: "4003",
      応対者名: "鈴木　一郎",
      フリガナ: "スズキ　イチロウ",
      店舗Ｎｎ: "",
    },
    {
      No: 4,
      登録日時: "2024-11-01 12:00",
      更新日時: "2024-11-01 13:00",
      企業Ｎｏ: "1004",
      企業名: "Company D",
      店舗Ｎｏ: "3004",
      店舗名: "Support",
      契約Ｎｏ: "4004",
      応対者名: "高橋　美咲",
      フリガナ: "タカハシ　ミサキ",
      店舗Ｎｎ: "",
    },
    {
      No: 5,
      登録日時: "2024-11-01 13:00",
      更新日時: "2024-11-01 14:00",
      企業Ｎｏ: "1005",
      企業名: "Company E",
      店舗Ｎｏ: "3005",
      店舗名: "HR",
      契約Ｎｏ: "4005",
      応対者名: "田中　剛",
      フリガナ: "タナカ　ゴウ",
      店舗Ｎｎ: "",
    },
    {
      No: 6,
      登録日時: "2024-11-01 14:00",
      更新日時: "2024-11-01 15:00",
      企業Ｎｏ: "1006",
      企業名: "Company F",
      店舗Ｎｏ: "3006",
      店舗名: "Marketing",
      契約Ｎｏ: "4006",
      応対者名: "中村　春菜",
      フリガナ: "ナカムラ　ハルナ",
      店舗Ｎｎ: "",
    },
    {
      No: 7,
      登録日時: "2024-11-01 15:00",
      更新日時: "2024-11-01 16:00",
      企業Ｎｏ: "1007",
      企業名: "Company G",
      店舗Ｎｏ: "3007",
      店舗名: "Operations",
      契約Ｎｏ: "4007",
      応対者名: "村田　浩二",
      フリガナ: "ムラタ　コウジ",
      店舗Ｎｎ: "",
    },
    {
      No: 8,
      登録日時: "2024-11-01 16:00",
      更新日時: "2024-11-01 17:00",
      企業Ｎｏ: "1008",
      企業名: "Company H",
      店舗Ｎｏ: "3008",
      店舗名: "Customer Service",
      契約Ｎｏ: "4008",
      応対者名: "渡辺　太郎",
      フリガナ: "ワタナベ　タロウ",
      店舗Ｎｎ: "",
    },
    {
      No: 9,
      登録日時: "2024-11-01 17:00",
      更新日時: "2024-11-01 18:00",
      企業Ｎｏ: "1009",
      企業名: "Company I",
      店舗Ｎｏ: "3009",
      店舗名: "Sales",
      契約Ｎｏ: "4009",
      応対者名: "井上　由美",
      フリガナ: "イノウエ　ユミ",
      店舗Ｎｎ: "",
    },
    {
      No: 10,
      登録日時: "2024-11-01 18:00",
      更新日時: "2024-11-01 19:00",
      企業Ｎｏ: "1010",
      企業名: "Company J",
      店舗Ｎｏ: "3010",
      店舗名: "Support",
      契約Ｎｏ: "4010",
      応対者名: "小林　正樹",
      フリガナ: "コバヤシ　マサキ",
      店舗Ｎｎ: "",
    },
    {
      No: 11,
      登録日時: "2024-11-02 09:00",
      更新日時: "2024-11-02 10:00",
      企業Ｎｏ: "1011",
      企業名: "Company K",
      店舗Ｎｏ: "3011",
      店舗名: "HR",
      契約Ｎｏ: "4011",
      応対者名: "吉田　英子",
      フリガナ: "ヨシダ　エイコ",
      店舗Ｎｎ: "",
    },
    {
      No: 12,
      登録日時: "2024-11-02 10:00",
      更新日時: "2024-11-02 11:00",
      企業Ｎｏ: "1012",
      企業名: "Company L",
      店舗Ｎｏ: "3012",
      店舗名: "Sales",
      契約Ｎｏ: "4012",
      応対者名: "伊藤　恵",
      フリガナ: "イトウ　ケイ",
      店舗Ｎｎ: "",
    },
    {
      No: 13,
      登録日時: "2024-11-02 11:00",
      更新日時: "2024-11-02 12:00",
      企業Ｎｏ: "1013",
      企業名: "Company M",
      店舗Ｎｏ: "3013",
      店舗名: "Marketing",
      契約Ｎｏ: "4013",
      応対者名: "岡田　大輔",
      フリガナ: "オカダ　ダイスケ",
      店舗Ｎｎ: "",
    },
    {
      No: 14,
      登録日時: "2024-11-02 12:00",
      更新日時: "2024-11-02 13:00",
      企業Ｎｏ: "1014",
      企業名: "Company N",
      店舗Ｎｏ: "3014",
      店舗名: "Customer Service",
      契約Ｎｏ: "4014",
      応対者名: "中川　幸子",
      フリガナ: "ナカガワ　サチコ",
      店舗Ｎｎ: "",
    },
    {
      No: 15,
      登録日時: "2024-11-02 13:00",
      更新日時: "2024-11-02 14:00",
      企業Ｎｏ: "1015",
      企業名: "Company O",
      店舗Ｎｏ: "3015",
      店舗名: "HR",
      契約Ｎｏ: "4015",
      応対者名: "石井　勝",
      フリガナ: "イシイ　カツ",
      店舗Ｎｎ: "",
    },
    {
      No: 16,
      登録日時: "2024-11-02 14:00",
      更新日時: "2024-11-02 15:00",
      企業Ｎｏ: "1016",
      企業名: "Company P",
      店舗Ｎｏ: "3016",
      店舗名: "Development",
      契約Ｎｏ: "4016",
      応対者名: "佐々木　愛",
      フリガナ: "ササキ　アイ",
      店舗Ｎｎ: "",
    },
    {
      No: 17,
      登録日時: "2024-11-02 15:00",
      更新日時: "2024-11-02 16:00",
      企業Ｎｏ: "1017",
      企業名: "Company Q",
      店舗Ｎｏ: "3017",
      店舗名: "Support",
      契約Ｎｏ: "4017",
      応対者名: "高田　健",
      フリガナ: "タカダ　ケン",
      店舗Ｎｎ: "",
    },
    {
      No: 18,
      登録日時: "2024-11-02 16:00",
      更新日時: "2024-11-02 17:00",
      企業Ｎｏ: "1018",
      企業名: "Company R",
      店舗Ｎｏ: "3018",
      店舗名: "Sales",
      契約Ｎｏ: "4018",
      応対者名: "鈴木　花子",
      フリガナ: "スズキ　ハナコ",
      店舗Ｎｎ: "",
    },
    {
      No: 19,
      登録日時: "2024-11-02 17:00",
      更新日時: "2024-11-02 18:00",
      企業Ｎｏ: "1019",
      企業名: "Company S",
      店舗Ｎｏ: "3019",
      店舗名: "Marketing",
      契約Ｎｏ: "4019",
      応対者名: "佐藤　美和",
      フリガナ: "サトウ　ミワ",
      店舗Ｎｎ: "",
    },
    {
      No: 20,
      登録日時: "2024-11-02 18:00",
      更新日時: "2024-11-02 19:00",
      企業Ｎｏ: "1020",
      企業名: "Company T",
      店舗Ｎｏ: "3020",
      店舗名: "Customer Service",
      契約Ｎｏ: "4020",
      応対者名: "中山　博",
      フリガナ: "ナカヤマ　ヒロシ",
      店舗Ｎｎ: "",
    },
    {
      No: 21,
      登録日時: "2024-11-02 19:00",
      更新日時: "2024-11-02 20:00",
      企業Ｎｏ: "1021",
      企業名: "Company U",
      店舗Ｎｏ: "3021",
      店舗名: "Development",
      契約Ｎｏ: "4021",
      応対者名: "橋本　雄大",
      フリガナ: "ハシモト　ユウダイ",
      店舗Ｎｎ: "",
    },
    {
      No: 22,
      登録日時: "2024-11-02 20:00",
      更新日時: "2024-11-02 21:00",
      企業Ｎｏ: "1022",
      企業名: "Company V",
      店舗Ｎｏ: "3022",
      店舗名: "HR",
      契約Ｎｏ: "4022",
      応対者名: "山田　聡",
      フリガナ: "ヤマダ　サトシ",
      店舗Ｎｎ: "",
    },
    {
      No: 23,
      登録日時: "2024-11-02 21:00",
      更新日時: "2024-11-02 22:00",
      企業Ｎｏ: "1023",
      企業名: "Company W",
      店舗Ｎｏ: "3023",
      店舗名: "Sales",
      契約Ｎｏ: "4023",
      応対者名: "藤井　優",
      フリガナ: "フジイ　ユウ",
      店舗Ｎｎ: "",
    },
    {
      No: 24,
      登録日時: "2024-11-02 22:00",
      更新日時: "2024-11-02 23:00",
      企業Ｎｏ: "1024",
      企業名: "Company X",
      店舗Ｎｏ: "3024",
      店舗名: "Support",
      契約Ｎｏ: "4024",
      応対者名: "田村　信",
      フリガナ: "タムラ　シン",
      店舗Ｎｎ: "",
    },
    {
      No: 25,
      登録日時: "2024-11-03 09:00",
      更新日時: "2024-11-03 10:00",
      企業Ｎｏ: "1025",
      企業名: "Company Y",
      店舗Ｎｏ: "3025",
      店舗名: "Operations",
      契約Ｎｏ: "4025",
      応対者名: "前田　直樹",
      フリガナ: "マエダ　ナオキ",
      店舗Ｎｎ: "",
    },
    {
      No: 26,
      登録日時: "2024-11-03 10:00",
      更新日時: "2024-11-03 11:00",
      企業Ｎｏ: "1026",
      企業名: "Company Z",
      店舗Ｎｏ: "3026",
      店舗名: "Customer Service",
      契約Ｎｏ: "4026",
      応対者名: "佐々木　仁",
      フリガナ: "ササキ　ジン",
      店舗Ｎｎ: "",
    },
    {
      No: 27,
      登録日時: "2024-11-03 11:00",
      更新日時: "2024-11-03 12:00",
      企業Ｎｏ: "1027",
      企業名: "Company AA",
      店舗Ｎｏ: "3027",
      店舗名: "HR",
      契約Ｎｏ: "4027",
      応対者名: "加藤　奈々",
      フリガナ: "カトウ　ナナ",
      店舗Ｎｎ: "",
    },
    {
      No: 28,
      登録日時: "2024-11-03 12:00",
      更新日時: "2024-11-03 13:00",
      企業Ｎｏ: "1028",
      企業名: "Company BB",
      店舗Ｎｏ: "3028",
      店舗名: "Development",
      契約Ｎｏ: "4028",
      応対者名: "岩田　真紀",
      フリガナ: "イワタ　マキ",
      店舗Ｎｎ: "",
    },
    {
      No: 29,
      登録日時: "2024-11-03 13:00",
      更新日時: "2024-11-03 14:00",
      企業Ｎｏ: "1029",
      企業名: "Company CC",
      店舗Ｎｏ: "3029",
      店舗名: "Sales",
      契約Ｎｏ: "4029",
      応対者名: "長谷川　浩",
      フリガナ: "ハセガワ　ヒロシ",
      店舗Ｎｎ: "",
    },
    {
      No: 30,
      登録日時: "2024-11-03 14:00",
      更新日時: "2024-11-03 15:00",
      企業Ｎｏ: "1030",
      企業名: "Company DD",
      店舗Ｎｏ: "3030",
      店舗名: "Marketing",
      契約Ｎｏ: "4030",
      応対者名: "木村　俊",
      フリガナ: "キムラ　シュン",
      店舗Ｎｎ: "",
    },
  ];

  const searchConditions = () => {};

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue3, setTextValue3] = useState<string>("");
  const [textValue4, setTextValue4] = useState<string>("");
  const [textValue6, setTextValue6] = useState<string>("");
  const [textValue7, setTextValue7] = useState<string>("");
  const [textValue9, setTextValue9] = useState<string>("");
  const [textValue5, setTextValue5] = useState<string>("");
  const [textValue10, setTextValue10] = useState<string>("");

  const handleSelectionChange = (
    selectedData: Array<{ No: string | number; [key: string]: string | number }>
  ) => {
    console.log("Selected Data:", selectedData);
  };

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="応対者一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="move-top">
          <Box className="company-store-details">
            <Box>
              <ButtonAtom
                onClick={searchConditions}
                label="企業検索"
                width="90px"
              />
              <Box className="companies-details">
                <TextBoxWithLabel
                  label="企業No"
                  width="12vw" // Uncomment to set a custom width
                  value={textValue10}
                  onChange={(e: any) => setTextValue10(e.target.value)}
                />
                <TextBoxWithLabel
                  label="企業名"
                  width="25vw" // Uncomment to set a custom width
                  value={textValue3}
                  onChange={(e: any) => setTextValue3(e.target.value)}
                />
              </Box>
            </Box>

            <Box>
              <ButtonAtom
                onClick={searchConditions}
                label="店舗検索"
                width="90px"
              />
              <Box className="store-details">
                <TextBoxWithLabel
                  label="店舗No"
                  width="12vw" // Uncomment to set a custom width
                  value={textValue9}
                  onChange={(e: any) => setTextValue9(e.target.value)}
                />
                <TextBoxWithLabel
                  label="店舗名"
                  width="12vw" // Uncomment to set a custom width
                  value={textValue9}
                  onChange={(e: any) => setTextValue9(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
          <Box className="contract-details margin-top">
            <TextBoxWithLabel
              label="契約No"
              disabled={false}
              width="12vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />

            <Box>
              <TextBoxWithLabel
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                disabled={false}
                labelWidth="120px"
                width="23vw" // Uncomment to set a custom width
                value={textValue4}
                onChange={(e: any) => setTextValue4(e.target.value)}
              />
              <TextBoxWithLabel
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                disabled={false}
                labelWidth="120px"
                width="23vw" // Uncomment to set a custom width
                value={textValue5}
                onChange={(e: any) => setTextValue5(e.target.value)}
              />
            </Box>
            <Box>
              <TextBoxWithLabel
                label="メイ"
                disabled={false}
                labelWidth="35px"
                width="23vw" // Uncomment to set a custom width
                value={textValue6}
                onChange={(e: any) => setTextValue6(e.target.value)}
              />
              <TextBoxWithLabel
                label="名"
                disabled={false}
                labelWidth="35px"
                width="23vw" // Uncomment to set a custom width
                value={textValue7}
                onChange={(e: any) => setTextValue7(e.target.value)}
              />
            </Box>

            <Box className="search-button">
              <ButtonAtom onClick={searchConditions} label="検索" />
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
        maxHeight="calc(82vh - 260px)"
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

export default RespondersList;
