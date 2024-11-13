import MenuHeader from "../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PasswordInput from "../../../../components/LV1/PasswordInput/PasswordInput";
import PasswordBoxWithLabel from "../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../components/LV1/Button/ButtonAtom/ButtonAtom";

function AdministratorListEdit() {
  const [textValue1, setTextValue1] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const searchConditions = () => {};

  const borderStyle = "1px solid #ccc";
  return (
    <Box
      sx={{
        padding: "1vh 1vw",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        // height: "calc(100vh - 30px)",
        overflow: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <MenuHeader title="管理者情報（編集）" />
      <Box
        sx={{
          height: "calc(92vh - 30px)",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            padding: "1vh 1vw",
            display: "flex",
            flexDirection: "column",
            margin: "1vh 0",
          }}
        >
          <TextBoxWithLabel
            labelWidth="125px"
            label="登録日時"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <TextBoxWithLabel
            labelWidth="125px"
            label="更新日時"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Align boxes side by side
            justifyContent: "space-between", // Optional: to add space between the two boxes
            // gap: "1vw", // Optional: to add spacing between the boxes
            // margin: "3vh 0",
          }}
        >
          <Box
            sx={{
              padding: "1vh 1vw",
              display: "flex",
              flexDirection: "column",
              margin: "1vh 0",
              width: "45vw", // Adjust width to fit both boxes side by side
              border: borderStyle,
            }}
          >
            <div className="description-label">企業情報</div>
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業No"
              width="30vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業名"
              width="30vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <div className="occupy-extreme-right">
              <ButtonAtom
                onClick={searchConditions}
                label="企業検索"
                width="100px"
              />
            </div>
          </Box>

          <Box
            sx={{
              padding: "1vh 1vw",
              display: "flex",
              flexDirection: "column",
              margin: "1vh 0",
              width: "45vw", // Adjust width to fit both boxes side by side
              border: borderStyle,
            }}
          >
            <div className="description-label">店舗情報</div>
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗No"
              width="30vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗名"
              width="30vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <div className="occupy-extreme-right">
              <ButtonAtom
                onClick={searchConditions}
                label="店舗検索"
                width="100px"
              />
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "1vh 1vw",
            // display: "flex",
            // flexDirection: "column",
            margin: "2vh 0",
            // width: "45vw", // Adjust width to fit both boxes side by side
            border: borderStyle,
          }}
        >
          <div className="description-label">基本情報</div>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Align boxes side by side
              margin: "3vh 0",
              justifyContent: "space-between", // Optional: to add space between the two boxes
              gap: "1vw", // Optional: to add spacing between the boxes
            }}
          >
            <Box
              sx={{
                // padding: "1vh 1vw  5vh 1vh",
                display: "flex",
                flexDirection: "column",
                // margin: "1vh 0",
                width: "45vw", // Adjust width to fit both boxes side by side
                // border: borderStyle,
              }}
            >
              <TextBoxWithLabel
                labelWidth="125px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                // padding: "1vh 1vw  5vh 1vh",
                display: "flex",
                flexDirection: "column",
                // margin: "1vh 0",
                width: "45vw", // Adjust width to fit both boxes side by side
                // border: borderStyle,
              }}
            >
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
            </Box>
          </Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="メールアドレス"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            padding: "1vh 1vw",
            display: "flex",
            flexDirection: "column",
            marginTop: "3vh",
            width: "45vw", // Adjust width to fit both boxes side by side
            border: borderStyle,
          }}
        >
          <div className="description-label">パスワード情報 </div>
          <TextBoxWithLabel
            labelWidth="125px"
            label="有効期限"
            width="15vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box
            sx={{
              //   display: "flex", // Align children horizontally
              alignItems: "center", // Vertically center the children
              //   justifyContent: "space-between", // Distribute space between the elements
              marginTop: "2vh",
            }}
          >
            <PasswordBoxWithLabel
              label="パスワード"
              width="15vw"
              labelWidth="125px"
            />
            <PasswordBoxWithLabel
              label="（再入力）"
              width="15vw"
              labelWidth="125px"
            />
          </Box>
        </Box>
        <ButtonAtom onClick={searchConditions} label="破棄" width="100px" />
        <ButtonAtom onClick={searchConditions} label="保存" width="100px" />
      </Box>
    </Box>
  );
}

export default AdministratorListEdit;
