import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import classes from "./styles/Companies.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";

function CompanyInformation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCompanyNo = Number(searchParams.get("selectedCompanyNo"));

  console.log("Selected Company No:", selectedCompanyNo);
  console.log(7789, selectedCompanyNo);

  const [formData, setFormData] = useState<CompanyInfo>({
    company_no: "",
    company_name: "",
    company_name_furigana: "",
    company_note: "",
    updated_at: "",
    created_at: "",
    company_deleted: false,
  });

  const fetchCompany = async () => {
    console.log(1557, selectedCompanyNo);

    if (!selectedCompanyNo) {
      navigate("/BadRequest");
    }
    try {
      const companyDetails = await CompanyApiService.fetchCompany(
        selectedCompanyNo
      );
      setFormData(companyDetails);
      // setCompanyDetails(companyDetails);
      console.log(133, companyDetails);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [selectedCompanyNo]);

  // Handle close button action
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!selectedCompanyNo) {
    return null;
  }

  return (
    <Box>
      <MenuHeader title="企業情報" />
      <Box className={classes.companyInfoContainer}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
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
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
              value={deleteStatus(formData.company_deleted ?? false)} // Defaults to false if `formData.company_deleted` is undefined
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
            // Optionally disable this field as it's a read-only field
            disabled={true}
          />
          <Box className={classes.nameRow}>
            <Box>
              <TextBoxWithLabel
                labelWidth="125px"
                label="企業名"
                width="30vw"
                value={formData.company_name}
                // disabled={true} // Optionally disable this field as it's a read-only field
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ"
                width="30vw"
                value={formData.company_name_furigana}
                // disabled={true} // Optionally disable this field as it's a read-only field
              />
            </Box>
          </Box>
        </Box>
        <TextAreaWithLabel
          label="備考"
          value={formData.company_note}
          margin="1vh 0 1vh 40vw"
          disabled={true}
        />
        <Box className={classes.actionButtons}>
          <ButtonAtom onClick={handleClose} label="閉じる" width="100px" />
          <ButtonAtom label="戻る" width="100px" />
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyInformation;
