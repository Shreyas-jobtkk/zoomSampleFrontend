import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "./styles/Companies.module.scss";
import { useForm } from "react-hook-form";
import ValidationInputField from "../../../components/LV1/ValidationInputField/ValidationInputField";
import { CompanyCreateFormValues } from "../../../types/CompanyTypes/CompanyTypes";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import TextAreaWithLabel from "../../../components/LV1/TextArea/TextAreaWithLabel";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const navigate = useNavigate();

  // State to manage company form data
  const [formData, setFormData] = useState<CompanyCreateFormValues>({
    company_name: "",
    company_note: "",
    company_name_furigana: "",
  });

  /**
   * Handles changes to input fields and updates state
   * @param event - React change event for input and textarea elements
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<CompanyCreateFormValues>();

  /**
   * Navigates to the Company List page
   */
  const navigateToCompanyList = () => navigate("/CompaniesList");

  /**
   * Handles form submission and saves company info
   */
  const createCompany = async () => {
    try {
      const response = await CompanyApiService.createCompany(
        formData.company_name,
        formData.company_name_furigana,
        formData.company_note
      );

      // Navigate to the company info page with the newly created company number
      navigate(
        `/CompanyUpdateConfirm?selectedCompanyNo=${response.company_no}`
      );
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  return (
    <Box onSubmit={handleSubmit(createCompany)} component="form">
      <MenuHeader title="企業追加" />
      <Box className={classes.companyCreateContainer}>
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
          <TextBoxWithLabel labelWidth="125px" label="企業No" width="30vw" />
          <Box className={classes.nameRow}>
            <Box>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="企業名"
                name="company_name"
                labelWidth="125px"
                width="30vw"
                maxLength={64}
                register={register}
                value={formData.company_name}
                onChange={handleChange}
              />

              <ValidationInputField
                isSubmitted={isSubmitted}
                label="フリガナ"
                name="company_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.company_name_furigana}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>

        <TextAreaWithLabel
          label="備考"
          value={formData.company_note}
          register={register}
          onChange={handleChange}
          margin="1vh 0 1vh 40vw"
          maxLength={64}
          name="company_note"
        />

        <Box className={classes.actionButtons}>
          <ButtonAtom
            onClick={navigateToCompanyList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom label="保存" type="submit" />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyCreate;
