import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "../../../styles/Companies.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import TextAreaWithLabel from "../../../components/LV1/TextArea/TextAreaWithLabel";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import {
  CompanyCreateFormValues,
  CompanyInfo,
} from "../../../types/CompanyTypes";
import ValidationInputField from "../../../components/LV1/Validation/ValidationInputField";

function CompanyUpdate() {
  // Extract query parameters from the URL
  const [searchParams] = useSearchParams();
  const selectedCompanyNo = Number(searchParams.get("selectedCompanyNo"));

  // React Hook Form setup for form handling
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<CompanyCreateFormValues>();

  // State to hold company information
  const [formData, setFormData] = useState<CompanyInfo>({
    company_no: "",
    company_name: "",
    company_name_furigana: "",
    company_note: "",
    updated_at: "",
    created_at: "",
    company_deleted: false,
  });

  const navigate = useNavigate();

  // Fetch company details when the component mounts or when selectedCompanyNo changes
  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedCompanyNo) {
        navigate("/BadRequest");
      }
      try {
        const companyDetails = await CompanyApiService.fetchCompany(
          selectedCompanyNo
        );
        setFormData(companyDetails);
        Object.keys(companyDetails).forEach((key) =>
          setValue(key as keyof CompanyCreateFormValues, companyDetails[key])
        );
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, [selectedCompanyNo, setValue]);

  // Handle input changes for both text fields and text areas
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValue(name as keyof CompanyCreateFormValues, value);
  };

  // Navigate back to the previous page when the close button is clicked
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle the edit/save action
  const handleUpdate = async () => {
    const companyDetails = await CompanyApiService.fetchCompany(
      selectedCompanyNo
    );

    // Check if there are any changes in the form data
    const isUnchanged =
      JSON.stringify(companyDetails) === JSON.stringify(formData);

    if (isUnchanged) {
      alert("No changes made.");
      return;
    }

    // Send the updated data to the API
    await CompanyApiService.updateCompany(
      formData.company_no,
      formData.company_name,
      formData.company_name_furigana,
      formData.company_note
    );
    navigate(
      `/Admin/Company/UpdateConfirm?selectedCompanyNo=${selectedCompanyNo}`
    );
  };

  if (!selectedCompanyNo) {
    return null;
  }

  return (
    <Box onSubmit={handleSubmit(handleUpdate)} component="form">
      <MenuHeader title="企業情報" />
      <Box className={classes.companyEditContainer}>
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
              width="10vw"
              // value={textValue1}
              value={deleteStatus(formData.company_deleted ?? false)} // Defaults to false if `companyDetails?.company_deleted` is undefined
              // onChange={(e) => setTextValue1(e.target.value)} // update for specific field
            />
          </Box>
        </Box>

        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="企業No"
            width="30vw"
            value={formData.company_no}
            // onChange={(e: any) => setCompanyNo(e.target.value)}
          />
          <Box className={classes.nameRow}>
            <Box>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="企業名"
                name="company_name" // This name is for the company name
                labelWidth="125px"
                width="30vw"
                maxLength={64}
                register={register}
                // error={errors.company_name?.message} // Separate error for "name"
                value={formData.company_name}
                // required={true}
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
                // required={false}
                // error={errors.company_name_furigana?.message} // Separate error for "furigana"
                // required={true}
                value={formData.company_name_furigana}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>

        {/* <TextAreaWithLabel
          label="備考"
          value={company_note}
          onChange={(e: any) => setcompany_note(e.target.value)}
          margin="1vh 0 1vh 40vw"
          maxLength={64}
        /> */}
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
          <ButtonAtom onClick={handleBack} label="破棄" width="100px" />
          <ButtonAtom label="保存" width="100px" type="submit" />
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyUpdate;
