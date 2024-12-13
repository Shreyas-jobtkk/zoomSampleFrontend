import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../CompanyStyles/CompanyList.scss";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
// import ValidationTextArea from "../../../../components/LV1/ValidationTextArea/ValidationTextArea";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
// import { updateCompany } from "../../../../api/apiService/company/actions/company-update";
// import { fetchCompany } from "../../../../api/apiService/company/actions/company-fetch";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import {
  CompanyCreateFormValues,
  CompanyInfo,
} from "../../../../../types/CompanyTypes/CompanyTypes";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";

function CompanyInfoEdit() {
  const { state } = useLocation();
  const selectedCompanyNo = state?.selectedCompanyNo;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<CompanyCreateFormValues>();

  const [formData, setFormData] = useState<CompanyInfo>({
    company_no: "",
    company_name: "",
    company_name_furigana: "",
    company_note: "11",
    updated_at: "",
    created_at: "",
    company_deleted: false,
  });

  // const handleChange = (event: any) => {
  //   // const { name, value, type } = e.target;
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name as string]: value,
  //   }));
  // };

  // const [companyDetails, setCompanyDetails] =
  //   useState<CompanyInfo | null>(null);

  const navigate = useNavigate();
  console.log("Selected Company No:", selectedCompanyNo);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedCompanyNo) return;
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

  // Handle close button action
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle edit button action
  const handleEdit = async () => {
    console.log(123);
    CompanyApiService.updateCompany(
      formData.company_no,
      formData.company_name,
      formData.company_name_furigana,
      formData.company_note
    );
  };

  return (
    <Box
      className="company-list-navigate"
      onSubmit={handleSubmit(handleEdit)}
      component="form"
    >
      <MenuHeader title="企業情報" />
      <Box className="company-list-navigate-content">
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
              width="10vw"
              // value={textValue1}
              value={deleteStatus(formData.company_deleted ?? false)} // Defaults to false if `companyDetails?.company_deleted` is undefined
              // onChange={(e) => setTextValue1(e.target.value)} // update for specific field
            />
          </Box>
        </Box>

        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="企業No"
            width="30vw"
            value={formData.company_no}
            // onChange={(e: any) => setCompanyNo(e.target.value)}
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
          value={company_note}
          onChange={(e: any) => setcompany_note(e.target.value)}
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
        <ButtonAtom onClick={handleClose} label="閉じる" width="100px" />
        <ValidationButton label="編集" width="100px" type="submit" />
        {/* <Box>{companyNo} </Box> */}
      </Box>
    </Box>
  );
}

export default CompanyInfoEdit;
