import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../CompanyStyles/CompanyList.scss";
import { useForm } from "react-hook-form";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
import { CompanyCreateFormValues } from "../CompanyTypes/CompanyTypes";
// import { createCompany } from "../../../../api/apiService/company/actions/company-create";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";

const CompanyCreate = () => {
  const [formData, setFormData] = useState<CompanyCreateFormValues>({
    company_name: "",
    company_note: "",
    company_name_furigana: "",
  });

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
  } = useForm<CompanyCreateFormValues>();
  const searchConditions = () => {};
  const saveCompanyInfo = async (data: CompanyCreateFormValues) => {
    if (!isValid) {
      return;
    }
    console.log("Form Data Submitted:", data);
    try {
      CompanyApiService.createCompany(
        formData.company_name,
        formData.company_name_furigana,
        formData.company_note
      );
      alert("saved");
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  return (
    <Box
      className="company-list-navigate"
      onSubmit={handleSubmit(saveCompanyInfo)}
      component="form"
    >
      <MenuHeader title="企業情報" />
      <Box className="company-list-navigate-content">
        <Box className="time-details-delete-flag">
          <Box className="time-details">
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw" // Uncomment to set a custom width
              // value={deleteFlag}
              // onChange={(e: any) => setDeleteFlag(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw" // Uncomment to set a custom width
              // value={deleteFlag}
              // onChange={(e: any) => setDeleteFlag(e.target.value)}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              // value={deleteFlag}
              // onChange={(e: any) => setDeleteFlag(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="企業No"
            width="30vw"
            // onChange={(e: any) => setDeleteFlag(e.target.value)}
          />
          <Box className="name-row">
            <Box>
              <ValidationInputField
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
          value={note}
          onChange={(e: any) => setNote(e.target.value)}
          margin="1vh 0 1vh 40vw"
          maxLength={2}
        /> */}
        <TextAreaWithLabel
          label="備考"
          value={formData.company_note}
          register={register}
          onChange={handleChange}
          margin="1vh 0 1vh 40vw"
          maxLength={2}
          name="company_note"
        />

        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ValidationButton
          label="保存"
          // onClick={saveCompanyInfo}
          type="submit"
        />
      </Box>
    </Box>
  );
};

export default CompanyCreate;
