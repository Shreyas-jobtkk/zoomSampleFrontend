import MenuHeader from "../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PasswordInput from "../../../../components/LV1/PasswordInput/PasswordInput";
import PasswordBoxWithLabel from "../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "./AdministratorList.scss";

function AdministratorListEdit() {
  const [textValue1, setTextValue1] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const searchConditions = () => {};

  const borderStyle = "1px solid #ccc";
  return (
    <Box className="administrator-list-navigate">
      <MenuHeader title="管理者情報（編集）" />
      <Box className="administrator-list-navigate-content">
        <Box className="time-details">
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
        <Box className="company-store-info">
          <Box className="company-info">
            <Box className="description-label">企業情報</Box>
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
            <Box className="occupy-extreme-right">
              <ButtonAtom
                onClick={searchConditions}
                label="企業検索"
                width="100px"
              />
            </Box>
          </Box>

          <Box className="store-info">
            <Box className="description-label">店舗情報</Box>
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
            <Box className="occupy-extreme-right">
              <ButtonAtom
                onClick={searchConditions}
                label="店舗検索"
                width="100px"
              />
            </Box>
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box className="name-row">
            <Box className="last-name">
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
            <Box className="first-name">
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
        <Box className="password-section">
          <Box className="description-label">パスワード情報 </Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="有効期限"
            width="15vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box className="password-change">
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
