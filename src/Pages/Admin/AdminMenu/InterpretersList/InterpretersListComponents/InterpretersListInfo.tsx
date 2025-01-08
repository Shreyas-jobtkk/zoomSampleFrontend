import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PasswordBoxWithLabel from "../../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../InterpretersListStyles/InterpretersList.scss";
import { useLocation } from "react-router-dom";
import MultipleOptionsSelect from "../../../../../components/LV1/SelectOption/MultipleOptionsSelect";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import { UserApiService } from "../../../../../api/apiService/user/user-api-service";
import { UserInfo } from "../../../../../types/UserTypes/UserTypes";
import { LanguageInfo } from "../../../../../types/LanguageTypes/LanguageTypes";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";

function InterpretersListInfo() {
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [optionValue, setOptionValue] = useState<Array<string>>([]);

  const { state } = useLocation();
  const selectedInterpreterNo = state?.selectedInterpreterNo;

  console.log(1557, selectedInterpreterNo);

  const [formData, setFormData] = useState<UserInfo>({
    user_no: "",
    company_no: "",
    company_name: "",
    store_no: "",
    store_name: "",
    user_name_last: "",
    user_name_last_furigana: "",
    user_name_first: "",
    user_name_first_furigana: "",
    mail_address: "",
    tel1: "",
    tel2: "",
    tel3: "",
    tel_extension: "",
    translate_languages: [],
    password_expire: "",
    user_password: "",
    user_password_confirm: "",
    meeting_id: "",
    meeting_passcode: "",
    user_note: "",
    updated_at: "",
    created_at: "",
    user_deleted: false,
  });

  const searchConditions = () => {};

  useEffect(() => {
    fetchUserDetails();
  }, [selectedInterpreterNo]);

  useEffect(() => {
    if (formData.translate_languages.length > 0) {
      fetchLanguagesById();
    }
  }, [formData.translate_languages]);

  const fetchUserDetails = async () => {
    if (!selectedInterpreterNo) return; // Early return if no selectedCompanyNo
    try {
      const userDetails = await UserApiService.fetchUser(selectedInterpreterNo);
      const [tel1, tel2, tel3] = userDetails.tel.split("-");

      console.log(166, userDetails);

      setFormData({
        user_no: userDetails.user_no,
        company_no: userDetails.company_no,
        company_name: userDetails.company_name,
        store_no: userDetails.store_no,
        store_name: userDetails.store_name,
        user_name_last: userDetails.user_name_last,
        user_name_last_furigana: userDetails.user_name_last_furigana,
        user_name_first: userDetails.user_name_first,
        user_name_first_furigana: userDetails.user_name_first_furigana,
        mail_address: userDetails.mail_address,
        tel1: tel1,
        tel2: tel2,
        tel3: tel3,
        tel_extension: userDetails.tel_extension,
        translate_languages: userDetails.translate_languages,
        password_expire: userDetails.password_expire,
        user_password: userDetails.user_password,
        user_password_confirm: userDetails.user_password,
        meeting_id: userDetails.meeting_id,
        meeting_passcode: userDetails.meeting_passcode,
        user_note: userDetails.user_note,
        updated_at: userDetails.updated_at,
        created_at: userDetails.created_at,
        user_deleted: userDetails.user_deleted,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchLanguagesById = async () => {
    console.log(289, formData);

    const languageDetails = await LanguageApiService.fetchLanguagesById(
      formData.translate_languages
    );
    console.log(189, languageDetails);
    const transformedOptions = languageDetails.map(
      (language: LanguageInfo) => ({
        value: language.languages_support_no,
        label: language.language_name_furigana,
      })
    );

    console.log(transformedOptions);
    console.log(997, typeof formData.translate_languages);
    console.log(998, formData.translate_languages);

    setOptionValue(formData.translate_languages);

    // Now you can set the options like this:
    setLanguagesSupport(transformedOptions);
  };

  return (
    <Box className="interpreters-list-navigate">
      <MenuHeader title="通訳者情報" />
      <Box className="interpreters-list-navigate-content">
        <Box className="time-details-delete-flag">
          <Box className="time-details">
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
              value={convertToJST(formData.created_at ?? "")}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
              value={convertToJST(formData.updated_at ?? "")}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.user_deleted ?? false)}
            />
          </Box>
        </Box>
        <Box className="company-store-info">
          <Box className="company-info">
            <Box className="description-label">企業情報</Box>
            <ButtonAtom label="企業検索" disabled={true} />
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業No"
              width="30vw"
              value={formData.company_no}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業名"
              width="30vw"
              value={formData.company_name}
            />
          </Box>
          <Box className="store-info">
            <Box className="description-label">店舗情報</Box>
            <ButtonAtom label="店舗検索" disabled={true} />
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗No"
              width="30vw"
              value={formData.store_no}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗名"
              width="30vw"
              value={formData.store_name}
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="30vw"
            value={formData.user_no}
          />
          <Box className="name-row">
            <Box className="last-name">
              <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="30vw"
                value={formData.user_name_last_furigana}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="30vw"
                value={formData.user_name_last}
              />
            </Box>
            <Box className="first-name">
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                width="30vw"
                value={formData.user_name_first_furigana}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                width="30vw"
                value={formData.user_name_first}
              />
            </Box>
          </Box>
          <Box className="contact-details">
            <Box className="mail-address">
              <TextBoxWithLabel
                labelWidth="125px"
                label="メールアドレス"
                width="30vw"
                value={formData.mail_address}
              />
            </Box>
            <Box className="tel-no">
              <Box className="tel-no">
                <Typography component="span" className="tel-label">
                  TEL
                </Typography>

                <NumberInput
                  disabled={true}
                  value={formData.tel1}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  disabled={true}
                  value={formData.tel2}
                  name="tel2"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  disabled={true}
                  value={formData.tel3}
                  name="tel3"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
              <Box className="tel-extension">
                <Typography component="span" className="tel-label">
                  内線
                </Typography>

                <NumberInput
                  disabled={true}
                  value={formData.tel_extension}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
            </Box>
          </Box>
          <MultipleOptionsSelect
            label="通訳言語"
            options={languagesSupport}
            value={optionValue} // Pass dynamic value
            disabled={true}
          />
        </Box>
        <Box className="password-meeting-info">
          <Box className="password-info">
            <Box className="description-label">パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={convertToJST(formData.password_expire ?? "")}
            />
            <Box className="password-input">
              <PasswordBoxWithLabel
                label="パスワード"
                width="15vw"
                labelWidth="125px"
                value={formData.user_password}
                disabled={true}
              />
              <PasswordBoxWithLabel
                label="（再入力）"
                width="15vw"
                labelWidth="125px"
                value={formData.user_password_confirm}
                disabled={true}
              />
            </Box>
          </Box>
          <Box className="meeting-info">
            <Box className="meeting-credentials">
              <TextBoxWithLabel
                labelWidth="125px"
                label="ミーティングID"
                width="15vw"
                value={formData.meeting_id}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="パスコード"
                width="15vw"
                value={formData.meeting_passcode}
              />
            </Box>
            <TextAreaWithLabel
              label="備考"
              value={formData.user_note}
              margin="2vh 1vw 0 1vw"
              disabled={true}
            />
          </Box>
        </Box>
        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ButtonAtom onClick={searchConditions} label="編集" width="100px" />
      </Box>
    </Box>
  );
}

export default InterpretersListInfo;
