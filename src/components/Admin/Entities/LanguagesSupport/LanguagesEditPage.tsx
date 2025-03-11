import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import classes from "./styles/LanguagesList.module.scss";
import { useForm } from "react-hook-form";
import ValidationInputField from "../../../LV1/ValidationInputField/ValidationInputField";
import ValidationButton from "../../../LV1/Button/ValidationButton/ValidationButton";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";

const LanguageCreate = () => {
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
    if (!selectedLanguageNo) return; // Early return if no selectedLanguageNo
    try {
      const languageDetails = await LanguageApiService.fetchLanguage(
        selectedLanguageNo
      );
      setFormData(languageDetails);
      console.log(133, languageDetails);
      setValue("language_name", languageDetails.language_name);
      setValue(
        "language_name_furigana",
        languageDetails.language_name_furigana
      );
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<LanguageInfo>();

  // Handle close button action
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  function checkForNoChange(obj1: any, obj2: any): boolean {
    return Object.keys(obj1).every((key) => {
      // Check if key exists in both objects and values match (deep comparison for arrays)
      if (Array.isArray(obj1[key])) {
        return JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]);
      }
      return obj1[key] === obj2[key];
    });
  }

  function normalizeLanguageData(language: any) {
    return {
      language_name: language.language_name,
      language_name_furigana: language.language_name_furigana,
      language_note: language.language_note,
    };
  }

  const editLanguageInfo = async (data: LanguageInfo) => {
    const languageDetails = await LanguageApiService.fetchLanguage(
      selectedLanguageNo
    );
    if (checkForNoChange(normalizeLanguageData(formData), languageDetails)) {
      alert("No changes made.");
      return;
    }
    console.log("Form Data Submitted:", data);
    try {
      LanguageApiService.updateLanguage(
        formData.languages_support_no,
        formData.language_name,
        formData.language_name_furigana,
        formData.language_note
      );
      alert("saved");
      navigate(
        `/LanguagesEditConfirm?selectedLanguageNo=${selectedLanguageNo}`
      );
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  if (!selectedLanguageNo) {
    return null;
  }

  return (
    <Box onSubmit={handleSubmit(editLanguageInfo)} component="form">
      <MenuHeader title="言語情報" />
      <Box className={classes.langContent}>
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
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at) ?? ""}
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.language_deleted ?? false)}
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
          />
          <Box className={classes.nameRow}>
            <Box>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="和訳"
                name="language_name" // This name is for the language name
                labelWidth="125px"
                width="30vw"
                maxLength={64}
                register={register}
                value={formData.language_name}
                onChange={handleChange}
              />

              <ValidationInputField
                isSubmitted={isSubmitted}
                label="言語名"
                name="language_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.language_name_furigana}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
        <TextAreaWithLabel
          label="備考"
          value={formData.language_note}
          register={register}
          onChange={handleChange}
          margin="1vh 0 1vh 40vw"
          maxLength={64}
          name="language_note"
        />
        <Box className={classes.actionButtons}>
          <ButtonAtom onClick={handleBack} label="破棄" width="100px" />
          <ValidationButton label="保存" type="submit" />
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageCreate;
