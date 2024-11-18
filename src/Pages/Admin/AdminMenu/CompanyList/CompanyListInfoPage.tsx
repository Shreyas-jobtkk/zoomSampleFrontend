import MenuHeader from "../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PasswordInput from "../../../../components/LV1/PasswordInput/PasswordInput";
import PasswordBoxWithLabel from "../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "./CompanyList.scss";

function CompanyListInfo() {
  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const searchConditions = () => {};

  const borderStyle = "1px solid #ccc";
  return (
    <Box className="company-list-navigate">
      <MenuHeader title="企業情報" />
      <Box className="company-list-navigate-content">
        <Box className="time-details-delete-flag">
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
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="企業No"
            width="30vw" // Uncomment to set a custom width
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box className="name-row">
            <Box>
              <TextBoxWithLabel
                labelWidth="125px"
                label="企業名"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ"
                width="30vw" // Uncomment to set a custom width
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
            </Box>
          </Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="備考"
            width="80vw" // Uncomment to set a custom width
            value={textValue2}
            onChange={(e: any) => setTextValue2(e.target.value)}
            disabled={false}
          />
        </Box>
        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ButtonAtom onClick={searchConditions} label="編集" width="100px" />
      </Box>
    </Box>
  );
}

export default CompanyListInfo;
