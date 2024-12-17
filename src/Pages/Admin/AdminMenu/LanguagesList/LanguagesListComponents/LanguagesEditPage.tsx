import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../LanguagesListStyles/LanguagesList.scss";
import { useForm } from "react-hook-form";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
import {
  LanguageCreateFormValues,
  LanguageInfo,
} from "../../../../../types/LanguageTypes/LanguageTypes";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import { useLocation } from "react-router-dom";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";

const LanguageCreate = () => {
  const [formData, setFormData] = useState<LanguageInfo>({
    languages_support_no: "",
    language_name: "",
    language_name_furigana: "",
    language_note: "",
    updated_at: "",
    created_at: "",
    language_deleted: false,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useLocation();

  const selectedLanguageNo = state?.selectedLanguageNo;

  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedLanguageNo) return; // Early return if no selectedLanguageNo
      try {
        const languageDetails = await LanguageApiService.fetchLanguage(
          selectedLanguageNo
        );
        setFormData(languageDetails);
        // setCompanyDetails(companyDetails);
        console.log(133, languageDetails);
      } catch (error: any) {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to fetch language."
        );
      } finally {
        setLoading(false);
      }
    };

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LanguageCreateFormValues>();
  const searchConditions = () => {};
  const editLanguageInfo = async (data: LanguageCreateFormValues) => {
    if (!isValid) {
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
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  return (
    <Box
      className="language-list-navigate"
      onSubmit={handleSubmit(editLanguageInfo)}
      component="form"
    >
      <MenuHeader title="言語情報" />
      <Box className="language-list-navigate-content">
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
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at ?? "")}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.language_deleted ?? false)}
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="言語No"
            width="30vw"
            value={formData.languages_support_no}
          />
          <Box className="name-row">
            <Box>
              <ValidationInputField
                label="和訳"
                name="language_name" // This name is for the language name
                labelWidth="125px"
                width="30vw"
                maxLength={64}
                register={register}
                // error={errors.language_name?.message} // Separate error for "name"
                value={formData.language_name}
                // required={true}
                onChange={handleChange}
              />

              <ValidationInputField
                label="言語名"
                name="language_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // required={false}
                // error={errors.language_name_furigana?.message} // Separate error for "furigana"
                // required={true}
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
          maxLength={2}
          name="language_note"
        />

        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ValidationButton label="保存" type="submit" />
      </Box>
    </Box>
  );
};

export default LanguageCreate;
