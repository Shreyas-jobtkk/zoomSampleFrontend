import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../components/LV3/Header/MenuHeader";
import SelectOption from "../../../components/LV1/SelectOption/SelectOption";
import DataTable from "../../../components/LV3/DataTable/DataTable";
import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";
import { UserApiService } from "../../../api/apiService/user/user-api-service";
import { LanguageApiService } from "../../../api/apiService/languages/languages-api-service";
import { InterpreterInfo } from "../../../types/UserTypes/UserTypes";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import { LanguageInfo } from "../../../types/LanguageTypes/LanguageTypes";

function InterpretersList() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options = [
    { label: "None", value: "" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [selectedInterpreterNoArray, setSelectedInterpreterNoArray] = useState<
    number[]
  >([]);

  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    fetchUsersListData();
  }, []);

  const fetchUsersListData = async () => {
    try {
      const response = await UserApiService.fetchInterpretersAll();
      const getLanguageDetails: LanguageInfo[] =
        await LanguageApiService.fetchLanguageNames();
      console.log(144, getLanguageDetails);

      // Function to get language_name_furigana based on selected numbers
      const getLanguageNames = (numbers: any[]): string => {
        return getLanguageDetails
          .filter((lang) => numbers.includes(lang.languages_support_no))
          .map((lang) => lang.language_name_furigana)
          .join(" , "); // Join the results with a comma and space
      };

      // const response = await axios.get(`${homePage}/company`);
      const sortedData = response
        .sort(
          (a: InterpreterInfo, b: InterpreterInfo) =>
            Number(a.user_no) - Number(b.user_no)
        )
        .map((item: InterpreterInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          店舗No: item.store_no,
          店舗名: item.store_name,
          通訳者No: item.user_no,
          名前: `${item.user_name_last} ${item.user_name_first}`,
          通訳言語: getLanguageNames(item.translate_languages),
          削除: deleteStatus(item.user_deleted),
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
    "企業No",
    "企業名",
    "店舗No",
    "店舗名",
    "通訳者No",
    "名前",
    "通訳言語",
    "削除",
  ];

  const searchConditions = () => {};

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [textValue3, setTextValue3] = useState<string>("");
  const [textValue4, setTextValue4] = useState<string>("");
  const [textValue5, setTextValue5] = useState<string>("");

  const handleSelectionChange = (
    newSelectedData: Array<{
      No: string | number;
      [key: string]: string | number;
    }>
  ) => {
    // Update the selected data state
    setSelectedData(newSelectedData);

    // Validate input
    if (!Array.isArray(newSelectedData)) {
      console.error("newSelectedData must be an array");
      return;
    }

    // Log the selected data to the console
    console.log("Selected Data:", newSelectedData);

    // Extract and convert "通訳者No" to number
    const selectedInterpreterNo = newSelectedData
      .map((item) => Number(item["通訳者No"]))
      .filter((value) => !isNaN(value)); // Filter out invalid numbers

    setSelectedInterpreterNoArray(selectedInterpreterNo);
  };

  const navigateToInfoPage = () => {
    navigate("/InterpretersListInfo", {
      state: { selectedInterpreterNo: selectedInterpreterNoArray[0] },
    });
  };

  const navigateToInterpreterCreate = () => {
    navigate("/InterpretersListCreate");
  };
  const navigateToEditPage = () => {
    navigate("/InterpretersListUpdate", {
      state: { selectedInterpreterNo: selectedInterpreterNoArray[0] },
    });
  };

  const handleDeleteInterpreters = async () => {
    console.log(114, selectedInterpreterNoArray);
    try {
      await UserApiService.deleteUsers(selectedInterpreterNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchUsersListData();
  };

  const [selectedData, setSelectedData] = useState<
    Array<{ No: string | number; [key: string]: string | number }>
  >([]);

  return (
    <Box className="admin-menu-nav-page">
      <MenuHeader title="通訳者一覧" />
      <Box className="search-container">
        <Box className="search-label">検索条件</Box>
        <Box className="move-top">
          <Box style={{ display: "flex", gap: "100px", marginBottom: "20px" }}>
            <Box>
              {/* <Box>企業検索</Box> */}
              <ButtonAtom onClick={searchConditions} label="企業検索" />
              <Box style={{ display: "flex", gap: "20px" }}>
                <TextBoxWithLabel
                  label="企業No"
                  width="15vw" // Uncomment to set a custom width
                  value={textValue1}
                  onChange={(e: any) => setTextValue1(e.target.value)}
                  disabled={false}
                />
                <TextBoxWithLabel
                  label="企業名"
                  width="15vw" // Uncomment to set a custom width
                  value={textValue1}
                  onChange={(e: any) => setTextValue1(e.target.value)}
                  disabled={false}
                />
              </Box>
            </Box>
            <Box>
              <ButtonAtom onClick={searchConditions} label="店舗検索" />
              <Box style={{ display: "flex", gap: "20px" }}>
                <TextBoxWithLabel
                  label="店舗No"
                  width="15vw" // Uncomment to set a custom width
                  value={textValue1}
                  onChange={(e: any) => setTextValue1(e.target.value)}
                  disabled={false}
                />
                <TextBoxWithLabel
                  label="店舗名"
                  width="15vw" // Uncomment to set a custom width
                  value={textValue1}
                  onChange={(e: any) => setTextValue1(e.target.value)}
                  disabled={false}
                />
              </Box>
            </Box>
          </Box>
          <Box className="interpreter-details">
            <TextBoxWithLabel
              label="通訳者No"
              width="6vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
              disabled={false}
            />
            <TextBoxWithLabel
              label="~"
              width="6vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
              disabled={false}
              labelWidth="25px"
            />

            <Box>
              <TextBoxWithLabel
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="18vw" // Uncomment to set a custom width
                value={textValue2}
                onChange={(e: any) => setTextValue2(e.target.value)}
                labelWidth="130px"
                disabled={false}
              />
              <TextBoxWithLabel
                labelWidth="130px"
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                width="18vw" // Uncomment to set a custom width
                value={textValue3}
                onChange={(e: any) => setTextValue3(e.target.value)}
                disabled={false}
              />
            </Box>

            <Box>
              <TextBoxWithLabel
                label="メイ"
                labelWidth="40px"
                width="12vw" // Uncomment to set a custom width
                value={textValue4}
                onChange={(e: any) => setTextValue4(e.target.value)}
                disabled={false}
              />
              <TextBoxWithLabel
                label="名"
                labelWidth="40px"
                width="12vw" // Uncomment to set a custom width
                value={textValue5}
                onChange={(e: any) => setTextValue5(e.target.value)}
                disabled={false}
              />
            </Box>

            <SelectOption
              label="通訳言語："
              options={options}
              width={150}
              value={selectedOption}
              onChange={setSelectedOption}
            />

            <Box className="search-button">
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <ButtonAtom
                onClick={searchConditions}
                label="新規"

            /> */}
      <DataTable // Customize header height
        headers={headers}
        data={tableData}
        maxHeight="calc(87vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToInterpreterCreate}
      />
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
        onClick={handleDeleteInterpreters}
        disabled={selectedData.length <= 0}
        label="削除"
      />
    </Box>
  );
}

export default InterpretersList;
