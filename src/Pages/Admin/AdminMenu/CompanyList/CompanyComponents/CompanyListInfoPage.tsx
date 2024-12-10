import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../CompanyStyles/CompanyList.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { homePage } from "../../../../../components/constants";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";

interface Company {
  company_no: number;
  company_name: string;
  company_name_furigana: string;
  note: string;
  updated_at: Date;
  created_at: Date;
  company_deleted: Boolean;
}

function CompanyListInfo() {
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useLocation();
  const selectedCompanyNo = state?.selectedCompanyNo;

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();

  console.log("Selected Company No:", selectedCompanyNo);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!selectedCompanyNo) return; // Early return if no selectedCompanyNo
      try {
        const response = await axios.get(
          `${homePage}/company/${selectedCompanyNo}`
        );
        setCompanyDetails(response.data);
        console.log(133, response.data); // For debugging purposes
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

  // Handle edit button action
  const handleEdit = () => {
    if (!companyDetails) return; // Ensure there's company data to edit
    // You can add logic here to navigate to an edit page or open an edit form
    navigate(`/edit-company/${companyDetails.company_no}`);
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
              value={convertToJST(companyDetails?.created_at ?? "")}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
              value={convertToJST(companyDetails?.updated_at ?? "")}
              // value={
              //   companyDetails?.updated_at
              //     ? convertToJST(
              //         new Date(companyDetails.updated_at).toISOString()
              //       )
              //     : ""
              // }
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw"
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
            value={companyDetails?.company_no}
            // Optionally disable this field as it's a read-only field
            disabled={true}
          />
          <Box className="name-row">
            <Box>
              <TextBoxWithLabel
                labelWidth="125px"
                label="企業名"
                width="30vw"
                value={companyDetails?.company_name}
                // disabled={true} // Optionally disable this field as it's a read-only field
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ"
                width="30vw"
                value={companyDetails?.company_name_furigana}
                // disabled={true} // Optionally disable this field as it's a read-only field
              />
            </Box>
          </Box>
        </Box>

        <TextAreaWithLabel
          label="備考"
          value={companyDetails?.note}
          // onChange={handleChange} // onChange expects ChangeEventHandler<HTMLTextAreaElement>

          margin="1vh 0 1vh 40vw"
          disabled={true}
        />

        <ButtonAtom onClick={handleClose} label="閉じる" width="100px" />
        <ButtonAtom onClick={handleEdit} label="編集" width="100px" />
      </Box>
    </Box>
  );
}

export default CompanyListInfo;
