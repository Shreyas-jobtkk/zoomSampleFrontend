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
import { CompanyCreateFormValues } from "../CompanyTypes/CompanyTypes";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";

interface Company {
  company_no: number;
  company_name: string;
  company_name_furigana: string;
  note: string;
  updated_at: Date;
  created_at: Date;
  company_deleted: Boolean;
}

function CompanyInfoEdit() {
  // const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const { state } = useLocation();
  const selectedCompanyNo = state?.selectedCompanyNo;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyCreateFormValues>();

  // const [textValue2, setTextValue2] = useState<string>("");
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const [companyNo, setCompanyNo] = useState<any>("");
  const [companyName, setCompanyName] = useState<any>("");
  const [companyNameFurigana, setCompanyNameFurigana] = useState<any>("");
  const [companyNote, setCompanyNote] = useState<any>("");

  useEffect(() => {
    if (companyDetails) {
      setCompanyNo(companyDetails.company_no || "");
      setCompanyName(companyDetails.company_name || "");
      setCompanyNameFurigana(companyDetails.company_name_furigana || "");
      setCompanyNote(companyDetails.note || "");
      setValue("companyName", companyDetails.company_name);
      setValue(
        "companyNameFurigana",
        companyDetails.company_name_furigana || ""
      );
      setValue("companyNote", companyDetails.note || "");
    }
  }, [companyDetails]);

  const navigate = useNavigate();

  console.log("Selected Company No:", selectedCompanyNo);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedCompanyNo) return; // Early return if no selectedCompanyNo
      try {
        const companyDetails = await CompanyApiService.fetchCompany(
          selectedCompanyNo
        );
        setCompanyDetails(companyDetails);
        console.log(133, companyDetails); // For debugging purposes
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchCompany();
  }, [selectedCompanyNo]);

  // Handle close button action
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle edit button action
  const handleEdit = async () => {
    console.log(123);
    CompanyApiService.updateCompany(
      selectedCompanyNo,
      companyName,
      companyNameFurigana,
      companyNote
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
              value={convertToJST(companyDetails?.created_at ?? "")}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
              value={convertToJST(companyDetails?.updated_at ?? "")}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
              // value={textValue1}
              value={deleteStatus(companyDetails?.company_deleted ?? false)} // Defaults to false if `companyDetails?.company_deleted` is undefined
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
            value={companyNo}
            onChange={(e: any) => setCompanyNo(e.target.value)}
          />
          <Box className="name-row">
            <Box>
              <ValidationInputField
                labelWidth="125px"
                name="companyName"
                label="企業名"
                width="30vw"
                value={companyName}
                maxLength={64}
                register={register}
                error={errors.companyName?.message}
                onChange={(e: any) => setCompanyName(e.target.value)}
                disabled={false} // Optionally disable this field as it's a read-only field
              />
              <ValidationInputField
                labelWidth="125px"
                name="companyNameFurigana"
                register={register}
                error={errors.companyNameFurigana?.message}
                label="フリガナ"
                width="30vw"
                value={companyNameFurigana}
                maxLength={10}
                onChange={(e: any) => setCompanyNameFurigana(e.target.value)}
                disabled={false}
              />
            </Box>
          </Box>
        </Box>

        <TextAreaWithLabel
          label="備考"
          value={companyNote}
          onChange={(e: any) => setCompanyNote(e.target.value)}
          margin="1vh 0 1vh 40vw"
          maxLength={2}
        />
        <ButtonAtom onClick={handleClose} label="閉じる" width="100px" />
        <ValidationButton label="編集" width="100px" type="submit" />
        <Box>{companyNo} </Box>
      </Box>
    </Box>
  );
}

export default CompanyInfoEdit;
