import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "../../../styles/LanguagesList.module.scss";
import { useForm } from "react-hook-form";
import ValidationInputField from "../../../components/LV1/Validation/ValidationInputField";
import { LanguageCreateFormValues } from "../../../types/LanguageTypes";
import { LanguageApiService } from "../../../api/apiService/languages/languages-api-service";
import TextAreaWithLabel from "../../../components/LV1/TextArea/TextAreaWithLabel";
import { useNavigate } from "react-router-dom";

const LanguageCreate = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState<LanguageCreateFormValues>({
    language_name: "",
    language_note: "",
    language_name_furigana: "",
  });

  // Handles changes in input fields and updates the state
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // React Hook Form for managing form state and validation
  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<LanguageCreateFormValues>();

  // Function to navigate back to the languages list page
  const navigateToLanguagesList = () => {
    navigate("/LanguagesSupportList");
  };

  // Function to create a new language entry
  const createLanguage = async (data: LanguageCreateFormValues) => {
    console.log("Form Data Submitted:", data);
    try {
      const response = await LanguageApiService.createLanguage(
        formData.language_name,
        formData.language_name_furigana,
        formData.language_note
      );
      // navigate(
      //   `/Admin/Language/Info?selectedLanguageNo=${response.languages_support_no}`
      // );
      navigate(
        `/Admin/Language/UpdateConfirm?selectedLanguageNo=${response.languages_support_no}`
      );

      alert("saved");
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  return (
    <Box onSubmit={handleSubmit(createLanguage)} component="form">
      <MenuHeader title="言語情報" />
      <Box className={classes.langContent}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <TextBoxWithLabel labelWidth="125px" label="言語No" width="30vw" />
          <Box className={classes.nameRow}>
            <Box>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="和訳"
                name="language_name"
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
          <ButtonAtom
            onClick={navigateToLanguagesList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom label="保存" type="submit" />
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageCreate;
