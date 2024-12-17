import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../CompanyStyles/CompanyList.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import { CompanyInfo } from "../../../../../types/CompanyTypes/CompanyTypes";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";

function CompanyListInfo() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedCompanyNo = state?.selectedCompanyNo;

  console.log("Selected Company No:", selectedCompanyNo);

  const [formData, setFormData] = useState<CompanyInfo>({
    company_no: "",
    company_name: "",
    company_name_furigana: "",
    company_note: "",
    updated_at: "",
    created_at: "",
    company_deleted: false,
  });

  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedCompanyNo) return; // Early return if no selectedCompanyNo
      try {
        const companyDetails = await CompanyApiService.fetchCompany(
          selectedCompanyNo
        );
        setFormData(companyDetails);
        // setCompanyDetails(companyDetails);
        console.log(133, companyDetails);
      } catch (error: any) {
        setError(
          error.response?.data?.error ||
            error.message ||
            "Failed to fetch company."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [selectedCompanyNo]);

  // Handle close button action
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box className="company-list-navigate">
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
              value={deleteStatus(formData.company_deleted ?? false)} // Defaults to false if `formData.company_deleted` is undefined
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
            // Optionally disable this field as it's a read-only field
            disabled={true}
          />
          <Box className="name-row">
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

        <ButtonAtom onClick={handleClose} label="閉じる" width="100px" />
        {/* <ButtonAtom onClick={handleEdit} label="編集" width="100px" /> */}
      </Box>
    </Box>
  );
}

export default CompanyListInfo;
