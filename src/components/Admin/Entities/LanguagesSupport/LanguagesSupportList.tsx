import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../LV3/DataTable/DataTable";
// import "./AdminMenu.scss";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { useState, useEffect } from "react";
import classes from "../styles/AdminEntities.module.scss";
import DataTableControler from "../../../LV3/DataTable/DataTableControler";

function LanguagesSupportList() {
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);
  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "言語No",
    "言語",
    "和訳",
    "削除",
  ];
  const [selectedLanguageNoArray, setSelectedLanguageNoArray] = useState<any[]>(
    []
  );

  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);
  const [langNoMin, setLangNoMin] = useState<string | number>("");
  const [langNoMax, setLangNoMax] = useState<string | number>("");
  const [langName, setLangName] = useState<string>("");
  const [langNameJapanese, setLangNameJapanese] = useState<string>("");

  useEffect(() => {
    fetchLanguagesListData();
  }, [page, rowLimit]);

  const searchConditions = () => {
    fetchLanguagesListData();
  };
  const fetchLanguagesListData = async () => {
    try {
      const response = await LanguageApiService.fetchLanguagesAll(
        page,
        rowLimit,
        langNoMin,
        langNoMax,
        langName,
        langNameJapanese
      );
      console.log(144, response);
      setTotalPages(Math.ceil(response.totalRecords / rowLimit));
      // const response = await axios.get(`${apiUrl}/company`);
      const sortedData = response.languages
        .sort(
          (a: LanguageInfo, b: LanguageInfo) =>
            Number(a.languages_support_no) - Number(b.languages_support_no)
        )
        .map((item: LanguageInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          言語No: item.languages_support_no,
          言語: item.language_name,
          和訳: item.language_name_furigana,
          削除: deleteStatus(item.language_deleted),
        }));
      console.log(141, sortedData);
      setTableData(sortedData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // const filterTableData = () => {
  //   const filtered = tableData.filter((item) => {
  //     // Convert "企業No" (company number) to a number for range comparison
  //     const matchesLanguageNo =
  //       langNo === "" || item["言語No"].includes(langNo);
  //     const matchesLangName =
  //       langName === "" || item["言語"].includes(langName);
  //     const matchesLangNameJapanese =
  //       langNameJapanese === "" || item["和訳"] === langNameJapanese;

  //     console.log(
  //       21445,
  //       langName,
  //       langNameJapanese,
  //       item["言語No"],
  //       item["言語"],
  //       item["和訳"]
  //     );

  //     // An item is included in the results only if it satisfies both range and search conditions
  //     return matchesLanguageNo && matchesLangName && matchesLangNameJapanese;
  //   });

  //   // Update the filtered data state to reflect the search results
  //   setSearchData(filtered);
  // };

  const navigateToInfoPage = () => {
    navigate(`/LanguagesInfo?selectedLanguageNo=${selectedLanguageNoArray[0]}`);
  };

  const handlePageChange = (page: number) => {
    // setCurrentPage(page); // Update the page state in the parent
    console.log("Current page in parent:", page);
    setPage(page + 1);
  };

  const navigateToLanguageCreate = () => navigate("/LanguagesCreate");

  const handleRowsPerPage = (newSelectedData: any) => {
    console.log(155, newSelectedData[0].rowsPerPage);
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  const navigateToEditPage = () => {
    navigate(`/LanguagesEdit?selectedLanguageNo=${selectedLanguageNoArray[0]}`);
  };

  const handleDeleteLanguages = async () => {
    try {
      await LanguageApiService.deleteLanguages(selectedLanguageNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchLanguagesListData();
  };

  const handleRestoreLanguages = async () => {
    try {
      await LanguageApiService.restoreLanguages(selectedLanguageNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchLanguagesListData();
  };

  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    setSelectedData(newSelectedData);
    console.log("Selected Data:", newSelectedData);

    const selectedCompanyNo = newSelectedData.map((item) => item["言語No"]);
    setSelectedLanguageNoArray(selectedCompanyNo);
    // setSelectedLanguageNoArray(selectedCompanyNo);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="対応言語一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.languageSearchDetails}>
          <TextBoxWithLabel
            disabled={false}
            label="言語No"
            width="calc(8vw - 30px)" // Uncomment to set a custom width
            value={langNoMin}
            onChange={(e: any) => setLangNoMin(Number(e.target.value))}
            type="number"
          />
          <TextBoxWithLabel
            disabled={false}
            label="~"
            width="calc(8vw - 30px)" // Uncomment to set a custom width
            value={langNoMax}
            onChange={(e: any) => setLangNoMax(Number(e.target.value))}
            type="number"
            labelWidth="40px"
          />

          <Box>
            <Box>
              <Box>
                <TextBoxWithLabel
                  disabled={false}
                  label="和訳"
                  width="calc(40vw - 180px)" // Uncomment to set a custom width
                  value={langNameJapanese}
                  onChange={(e: any) => setLangNameJapanese(e.target.value)}
                  labelWidth="70px"
                />
                <TextBoxWithLabel
                  disabled={false}
                  labelWidth="70px"
                  label="言語"
                  width="calc(40vw - 180px)" // Uncomment to set a custom width
                  value={langName}
                  onChange={(e: any) => setLangName(e.target.value)}
                />
              </Box>
            </Box>
          </Box>

          <ButtonAtom onClick={searchConditions} label="検索" margin="0 5vw" />
        </Box>
      </Box>

      {/* <DataTable // Customize header height
        headers={headers}
        data={searchData}
        maxHeight="calc(87vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToLanguageCreate}
      /> */}
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
        onClickNew={navigateToLanguageCreate}
        onClickReset={navigateToLanguageCreate}
      />

      <DataTable
        headers={headers}
        data={tableData}
        maxHeight="calc(94vh - 260px)"
        onSelectionChange={handleSelectionChange}
      />
      <Box className={classes.actionButtons}>
        <ButtonAtom
          onClick={navigateToInfoPage}
          label="閲覧"
          disabled={selectedData.length !== 1}
          // margin='0 2vw'
        />
        <ButtonAtom
          onClick={navigateToEditPage}
          label="編集"
          disabled={selectedData.length !== 1}
          // margin='0 2vw'
        />
        <ButtonAtom
          onClick={handleDeleteLanguages}
          label="削除"
          disabled={selectedData.length === 0}
          // margin='0 2vw'
        />
        <ButtonAtom
          onClick={handleRestoreLanguages}
          label="復帰"
          disabled={selectedData.length === 0}
          // margin='0 2vw'
        />
      </Box>
    </Box>
  );
}

export default LanguagesSupportList;
