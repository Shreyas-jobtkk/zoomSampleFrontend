import MenuHeader from "../../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PasswordBoxWithLabel from "../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "./styles/User.module.scss";
// import { useLocation } from "react-router-dom";
import MultipleOptionsSelect from "../../../../components/LV1/SelectOption/MultipleOptionsSelect";
import NumberInput from "../../../../components/LV1/NumberInput/NumberInput";
import TextAreaWithLabel from "../../../../components/LV1/TextArea/TextAreaWithLabel";
import { UserApiService } from "../../../../api/apiService/user/user-api-service";
import { UserInfo } from "../../../../types/UserTypes/UserTypes";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import { getUserTitle } from "./userTitle"; // Adjust the path as necessary
import { useNavigate, useSearchParams } from "react-router-dom";

function UserInformation() {
  const navigate = useNavigate();

  // State hooks
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [optionValue, setOptionValue] = useState<Array<string>>([]);
  const [searchParams] = useSearchParams();
  const selectedUserNo = Number(searchParams.get("selectedUserNo"));
  const userType: string = searchParams.get("userType") as string;

  // State hook to manage form data
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

  // Function to navigate to the appropriate user list based on user type
  const navigateToUserList = () => {
    if (userType == "contractor") {
      navigate("/ContractorList");
    }

    if (userType == "interpreter") {
      navigate("/InterpretersList");
    }
    if (userType == "administrator") {
      navigate("/AdministratorList");
    }
  };

  // Function to navigate to the appropriate user update based on user type
  const navigateToUserUpdate = () => {
    navigate(
      `/UserUpdate?selectedUserNo=${selectedUserNo}&userType=${userType}`
    );
  };

  // useEffect to fetch user details whenever selectedUserNo changes
  useEffect(() => {
    fetchUserDetails();
  }, [selectedUserNo]);

  // useEffect to fetch all languages' names if translate_languages is not empty
  useEffect(() => {
    if (formData.translate_languages.length > 0) {
      fetchLanguagesAllNames();
    }
  }, [formData.translate_languages]);

  // Function to fetch the user details using selectedUserNo
  const fetchUserDetails = async () => {
    if (!selectedUserNo) return; // Early return if no selectedCompanyNo
    try {
      const userDetails = await UserApiService.fetchUser(selectedUserNo);
      const [tel1, tel2, tel3] = userDetails.tel.split("-");

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

  // Function to fetch all language names and map them to a usable format
  const fetchLanguagesAllNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAllNames();

      console.log(1778, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name_furigana, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);
      setOptionValue(formData.translate_languages);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  if (!selectedUserNo || !userType) {
    return null;
  }

  return (
    <Box>
      <MenuHeader title={`${getUserTitle(userType)}情報`} />
      <Box className={classes.userContent}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
              value={convertToJST(formData.created_at) ?? ""}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
              value={convertToJST(formData.updated_at) ?? ""}
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.user_deleted ?? false)}
            />
          </Box>
        </Box>
        <Box className={classes.companyStoreInfo}>
          <Box className={classes.companyInfo}>
            <Box className={classes.descriptionLabel}>企業情報</Box>
            <ButtonAtom label="企業検索" disabled={true} />
            <TextBoxWithLabel
              labelWidth="150px"
              label="企業No"
              width="calc(45vw-100px)"
              value={formData.company_no}
            />
            <TextBoxWithLabel
              labelWidth="150px"
              label="企業名"
              width="calc(45vw-100px)"
              value={formData.company_name}
            />
          </Box>
          <Box className={classes.storeInfo}>
            <Box className={classes.descriptionLabel}>店舗情報</Box>
            <ButtonAtom label="店舗検索" disabled={true} />
            <TextBoxWithLabel
              labelWidth="150px"
              label="店舗No"
              width="calc(45vw-100px)"
              value={formData.store_no}
            />
            <TextBoxWithLabel
              labelWidth="150px"
              label="店舗名"
              width="calc(45vw-100px)"
              value={formData.store_name}
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="calc(35vw - 80px);"
            value={formData.user_no}
          />
          <Box className={classes.nameRow}>
            <Box className={classes.lastName}>
              <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="calc(35vw - 80px);"
                value={formData.user_name_last_furigana}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="calc(35vw - 80px);"
                value={formData.user_name_last}
              />
            </Box>
            <Box className={classes.firstName}>
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                width="calc(35vw - 80px);"
                value={formData.user_name_first_furigana}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                width="calc(35vw - 80px);"
                value={formData.user_name_first}
              />
            </Box>
          </Box>
          <Box className={classes.contactDetails}>
            <Box className={classes.mailAddress}>
              <TextBoxWithLabel
                labelWidth="125px"
                label="メールアドレス"
                width="calc(35vw - 80px);"
                value={formData.mail_address}
              />
            </Box>
            <Box className={classes.telDetails}>
              <Box className={classes.telNo}>
                <Typography component="span">
                  TEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>

                <NumberInput
                  width="5vw"
                  disabled={true}
                  value={formData.tel1}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="5vw"
                  disabled={true}
                  value={formData.tel2}
                  name="tel2"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="5vw"
                  disabled={true}
                  value={formData.tel3}
                  name="tel3"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
              <Box className={classes.telExtension}>
                <Typography component="span">
                  内線&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>

                <NumberInput
                  width="5vw"
                  disabled={true}
                  value={formData.tel_extension}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
            </Box>
          </Box>
          {userType === "interpreter" && (
            <MultipleOptionsSelect
              label="通訳言語"
              labelWidth="125px"
              options={languagesSupport}
              value={optionValue} // Pass dynamic value
              disabled={true}
            />
          )}
        </Box>
        <Box className={classes.passwordMeetingInfo}>
          <Box className={classes.passwordInfo}>
            <Box className={classes.descriptionLabel}>パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={convertToJST(formData.password_expire) ?? ""}
            />
            <Box className={classes.passwordInput}>
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
          <Box className={classes.meetingInfo}>
            {userType === "interpreter" && (
              <Box className={classes.meetingCredentials}>
                <TextBoxWithLabel
                  labelWidth="125px"
                  label="ミーティングID"
                  width="12vw"
                  value={formData.meeting_id}
                />
                <TextBoxWithLabel
                  labelWidth="85px"
                  label="パスコード"
                  width="12vw"
                  value={formData.meeting_passcode}
                />
              </Box>
            )}
            <TextAreaWithLabel
              label="備考"
              value={formData.user_note}
              margin="2vh 1vw 0 1vw"
              disabled={true}
            />
          </Box>
        </Box>
        <Box className={classes.actionButtons}>
          <ButtonAtom
            onClick={navigateToUserList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom
            onClick={navigateToUserUpdate}
            label="編集"
            width="100px"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UserInformation;
