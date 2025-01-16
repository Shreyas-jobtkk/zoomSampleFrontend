import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
// import "../LanguagesListStyles/LanguagesList.scss";
import { LanguageInfo } from "../../../../../types/LanguageTypes/LanguageTypes";
import { useLocation } from "react-router-dom";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";

const LanguageSupportInfo = () => {
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

  useEffect(() => {
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

  const searchConditions = () => {};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box className="language-list-navigate">
      <MenuHeader title="言語情報" />
      <Box className="language-list-navigate-content">
        <Box className="time-details-delete-flag">
          <Box className="time-details">
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
              value={convertToJST(formData.created_at ?? "")}
              onChange={handleChange}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at ?? "")}
              onChange={handleChange}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
              value={deleteStatus(formData.language_deleted ?? false)}
              onChange={handleChange}
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
            onChange={handleChange}
          />
          <Box className="name-row">
            <Box>
              <TextBoxWithLabel
                labelWidth="125px"
                label="和訳"
                width="30vw"
                value={formData.language_name_furigana}
                onChange={handleChange}
              />

              <TextBoxWithLabel
                labelWidth="125px"
                label="言語名"
                width="30vw"
                value={formData.language_name}
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
          maxLength={2}
          name="language_note"
        />

        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ButtonAtom onClick={searchConditions} label="保存" width="100px" />
      </Box>
    </Box>
  );
};

export default LanguageSupportInfo;
