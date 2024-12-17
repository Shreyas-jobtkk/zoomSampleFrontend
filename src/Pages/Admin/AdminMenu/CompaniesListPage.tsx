import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import { CompanyInfo } from "../../../types/CompanyTypes/CompanyTypes";
import "./AdminMenu.scss";

function CompaniesList() {
  const navigate = useNavigate();

  // States for data and inputs selectedCompanyNo
  const [selectedCompanyNoArray, setSelectedCompanyNoArray] = useState<any[]>(
    []
  );
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);
  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [textValue3, setTextValue3] = useState<string>("");

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll();
      console.log(144, response);
      // const response = await axios.get(`${homePage}/company`);
      const sortedData = response
        .sort(
          (a: CompanyInfo, b: CompanyInfo) =>
            Number(a.company_no) - Number(b.company_no)
        )
        .map((item: CompanyInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業Ｎｏ: item.company_no,
          企業名: item.company_name,
          フリガナ: item.company_name_furigana,
          削除: deleteStatus(item.company_deleted),
        }));
      console.log(141, sortedData);
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業Ｎｏ",
    "企業名",
    "フリガナ",
    "削除",
  ];

  const searchConditions = () => {
    console.log("Search conditions triggered");
    // Implement search logic here
  };

  const navigateToCompanyCreate = () => navigate("/CompanyCreate");

  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    setSelectedData(newSelectedData);
    console.log("Selected Data:", newSelectedData);

    const selectedCompanyNo = newSelectedData.map((item) => item["企業Ｎｏ"]);
    setSelectedCompanyNoArray(selectedCompanyNo);
  };

  const navigateToInfoPage = () => {
    navigate("/CompanyListInfo", {
      state: { selectedCompanyNo: selectedCompanyNoArray[0] },
    });
  };

  const navigateToEditPage = () => {
    navigate("/CompanyInfoEdit", {
      state: { selectedCompanyNo: selectedCompanyNoArray[0] },
    });
  };

  const handleDeleteCompanies = async () => {
    // console.log(114, selectedCompanyNoArray);
    try {
      await CompanyApiService.deleteCompanies(selectedCompanyNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchCompaniesListData();
  };

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="企業一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="companies-details move-top">
          <TextBoxWithLabel
            disabled={false}
            label="企業No"
            width="12vw"
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box>
            <TextBoxWithLabel
              disabled={false}
              label="フリガナ"
              width="60vw"
              value={textValue2}
              onChange={(e: any) => setTextValue2(e.target.value)}
              labelWidth="70px"
            />
            <TextBoxWithLabel
              disabled={false}
              label="企業名"
              width="60vw"
              value={textValue3}
              onChange={(e: any) => setTextValue3(e.target.value)}
              labelWidth="70px"
            />
          </Box>
          <Box className="search-button">
            <ButtonAtom onClick={searchConditions} label="検索" />
          </Box>
        </Box>
      </Box>
      <DataTable
        headers={headers}
        data={tableData}
        maxHeight="calc(87vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToCompanyCreate}
      />
      <Box className="action-buttons">
        <ButtonAtom
          onClick={navigateToInfoPage}
          disabled={selectedData.length !== 1}
          label="閲覧"
        />
        <ButtonAtom
          onClick={navigateToEditPage}
          disabled={selectedData.length !== 1}
          label="編集"
        />
        <ButtonAtom
          onClick={handleDeleteCompanies}
          disabled={selectedData.length === 0}
          label="削除"
        />
      </Box>
    </Box>
  );
}

export default CompaniesList;
