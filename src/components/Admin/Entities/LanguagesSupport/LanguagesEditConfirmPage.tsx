import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import classes from "./styles/LanguagesList.module.scss";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";
import { convertToJST, deleteStatus } from "../../../../utils/utils";

const LanguageSupportInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LanguageInfo>({
    languages_support_no: "",
    language_name: "",
    language_name_furigana: "",
    language_note: "",
    updated_at: "",
    created_at: "",
    language_deleted: false,
  });

  const [searchParams] = useSearchParams();
  const selectedLanguageNo = Number(searchParams.get("selectedLanguageNo"));

  const fetchCompany = async () => {
    console.log(145, selectedLanguageNo);
    if (!selectedLanguageNo) return; // Early return if no selectedLanguageNo
    try {
      const languageDetails = await LanguageApiService.fetchLanguage(
        selectedLanguageNo
      );
      setFormData(languageDetails);
      // setCompanyDetails(companyDetails);
      console.log(133, languageDetails);
    } catch (error: any) {
      console.log(133, Error);
    }
  };

  useEffect(() => {
    if (!selectedLanguageNo) {
      navigate("/BadRequest");
    }
    fetchCompany();
  }, [selectedLanguageNo]);

  console.log(144, formData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigateToLanguagesList = () => {
    navigate("/LanguagesSupportList");
  };

  // Handle close button action
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!selectedLanguageNo) {
    return null;
  }

  return (
    <Box>
      <MenuHeader title="言語情報" />
      <Box className={classes.langContent}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
              value={convertToJST(formData.created_at) ?? ""}
              onChange={handleChange}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at) ?? ""}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
              value={deleteStatus(formData.language_deleted ?? false)}
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="言語No"
            width="30vw"
            value={formData.languages_support_no}
            onChange={handleChange}
          />
          <Box className={classes.nameRow}>
            <Box>
              <TextBoxWithLabel
                labelWidth="125px"
                label="和訳"
                width="30vw"
                value={formData.language_name}
                onChange={handleChange}
              />

              <TextBoxWithLabel
                labelWidth="125px"
                label="言語名"
                width="30vw"
                value={formData.language_name_furigana}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
        <TextAreaWithLabel
          label="備考"
          value={formData.language_note}
          disabled={true}
          onChange={handleChange}
          margin="1vh 0 1vh 40vw"
          maxLength={64}
          name="language_note"
        />
        <Box className={classes.actionButtons}>
          <ButtonAtom
            onClick={navigateToLanguagesList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom onClick={handleBack} label="戻る" width="100px" />
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageSupportInfo;
