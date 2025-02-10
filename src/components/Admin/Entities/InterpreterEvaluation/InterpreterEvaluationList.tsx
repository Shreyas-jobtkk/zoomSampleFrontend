import DatePicker from "../../../LV1/DatePicker/DatePicker";
import TimePicker from "../../../LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import DataTable from "../../../LV3/DataTable/DataTable";
import classes from "../styles/AdminEntities.module.scss";
import ContractorSearch from "../User/Contractor/ContractorSearch";
import InterpreterSearch from "../User/Interpreter/InterpreterSearch";
function InterpreterEvaluationList() {
  const headers = [
    "No",
    "開始日時",
    "終了日時",
    "契約No",
    "企業名",
    "店舗名",
    "通訳者No",
    "通訳者名",
    "通訳言語",
    "評価",
  ];
  const data = [
    {
      No: 1,
      開始日時: "2024-11-01 09:00",
      終了日時: "2024-11-01 10:00",
      契約No: "1001",
      企業名: "Company A",
      店舗名: "Sales",
      通訳者No: 7,
      通訳言語: "Japanese",
      通訳者名: "John",
      評価: 5,
    },
    {
      No: 2,
      開始日時: "2024-11-01 11:00",
      終了日時: "2024-11-01 12:00",
      契約No: "1002",
      企業名: "Company B",
      店舗名: "Marketing",
      通訳者No: 8,
      通訳言語: "English",
      通訳者名: "Alice",
      評価: 4,
    },
    {
      No: 3,
      開始日時: "2024-11-01 13:00",
      終了日時: "2024-11-01 14:00",
      契約No: "1003",
      企業名: "Company C",
      店舗名: "Support",
      通訳者No: 9,
      通訳言語: "Chinese",
      通訳者名: "Mike",
      評価: 3,
    },
    {
      No: 4,
      開始日時: "2024-11-01 15:00",
      終了日時: "2024-11-01 16:00",
      契約No: "1004",
      企業名: "Company D",
      店舗名: "IT",
      通訳者No: 10,
      通訳言語: "Korean",
      通訳者名: "Sarah",
      評価: 5,
    },
    {
      No: 5,
      開始日時: "2024-11-01 17:00",
      終了日時: "2024-11-01 18:00",
      契約No: "1005",
      企業名: "Company E",
      店舗名: "Finance",
      通訳者No: 11,
      通訳言語: "Japanese",
      通訳者名: "David",
      評価: 4,
    },
    {
      No: 6,
      開始日時: "2024-11-01 19:00",
      終了日時: "2024-11-01 20:00",
      契約No: "1006",
      企業名: "Company F",
      店舗名: "HR",
      通訳者No: 12,
      通訳言語: "French",
      通訳者名: "Anna",
      評価: 5,
    },
    {
      No: 7,
      開始日時: "2024-11-02 09:00",
      終了日時: "2024-11-02 10:00",
      契約No: "1007",
      企業名: "Company G",
      店舗名: "Engineering",
      通訳者No: 13,
      通訳言語: "German",
      通訳者名: "Tom",
      評価: 3,
    },
    {
      No: 8,
      開始日時: "2024-11-02 11:00",
      終了日時: "2024-11-02 12:00",
      契約No: "1008",
      企業名: "Company H",
      店舗名: "Legal",
      通訳者No: 14,
      通訳言語: "Japanese",
      通訳者名: "Emma",
      評価: 5,
    },
    {
      No: 9,
      開始日時: "2024-11-02 13:00",
      終了日時: "2024-11-02 14:00",
      契約No: "1009",
      企業名: "Company I",
      店舗名: "Operations",
      通訳者No: 15,
      通訳言語: "Spanish",
      通訳者名: "James",
      評価: 4,
    },
    {
      No: 10,
      開始日時: "2024-11-02 15:00",
      終了日時: "2024-11-02 16:00",
      契約No: "1010",
      企業名: "Company J",
      店舗名: "R&D",
      通訳者No: 16,
      通訳言語: "English",
      通訳者名: "Sophia",
      評価: 3,
    },
    {
      No: 11,
      開始日時: "2024-11-02 17:00",
      終了日時: "2024-11-02 18:00",
      契約No: "1011",
      企業名: "Company K",
      店舗名: "Customer Service",
      通訳者No: 17,
      通訳言語: "Japanese",
      通訳者名: "Liam",
      評価: 5,
    },
    {
      No: 12,
      開始日時: "2024-11-02 19:00",
      終了日時: "2024-11-02 20:00",
      契約No: "1012",
      企業名: "Company L",
      店舗名: "Logistics",
      通訳者No: 18,
      通訳言語: "Italian",
      通訳者名: "Olivia",
      評価: 4,
    },
  ];

  const [interpreterNo, setIinterpreterNo] = useState<string>("");
  const [interpreterFirstName, setIinterpreterFirstName] = useState<string>("");
  const [interpreterLastName, setIinterpreterLastName] = useState<string>("");
  const [contractNo, setContractNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");

  // const [dateRangeMin, setDateRangeMin] = useState<Date>(new Date(0));
  // const [dateRangeMax, setDateRangeMax] = useState<Date>(new Date(8.64e15));
  // const [timeRangeMin, setTimeRangeMin] = useState("");
  // const [timeRangeMax, setTimeRangeMax] = useState("");

  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { label: "None", value: "" },
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [openContractor, setOpenContractor] = useState(false);
  const [openInterpreter, setOpenInterpreter] = useState(false);

  const handleSearchContractor = () => {
    setOpenContractor(true);
  };

  const setContractorDetails = (value: any) => {
    setOpenContractor(false);

    if (value && typeof value === "object") {
      setContractNo(value["契約No"] || ""); // Provide a fallback if key is missing
      setCompanyName(value["企業名"] || "");
      setStoreName(value["店舗名"] || "");
    } else {
      console.error("Invalid value:", value);
    }
  };

  const handleSearchInterpreter = () => {
    setOpenInterpreter(true);
  };

  const setInterpreterDetails = (value: any) => {
    console.log(589, value);
    setOpenInterpreter(false);

    if (value && typeof value === "object") {
      // setContractNo(value["契約No"] || ""); // Provide a fallback if key is missing
      setIinterpreterNo(value["通訳者No"] || "");
      setIinterpreterLastName(value["名前_last"] || "");
      setIinterpreterFirstName(value["名前_first"] || "");
    } else {
      console.error("Invalid value:", value);
    }
  };

  const searchConditions = () => {};

  // Handle start date change
  const handleStartDateChange = (date: any) => {
    // setSelectedStartDate(date);
    console.log("Selected Start Date:", date || "None");
  };

  // Handle end date change
  const handleEndDateChange = (date: any) => {
    // setSelectedEndDate(date);
    console.log("Selected End Date:", date || "None"); // Log the selected end date
  };

  // Handle start time change
  const handleStartTimeChange = (newValue: any) => {
    // setSelectedStartTime(newValue);
    console.log(
      "Selected Start Time:",
      newValue ? newValue.format("HH:mm") : "None"
    ); // Log the selected start time
  };

  // Handle end time change
  const handleEndTimeChange = (newValue: any) => {
    // setSelectedEndTime(newValue);
    console.log(
      "Selected End Time:",
      newValue ? newValue.format("HH:mm") : "None"
    ); // Log the selected end time
  };

  const handleSelectionChange = (
    selectedData: Array<{ No: string | number; [key: string]: string | number }>
  ) => {
    console.log("Selected Data:", selectedData);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="通訳評価一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.selectRange}>
          <Box>通訳日時</Box>
          <Box>開始日時：</Box>
          <DatePicker label="" onDateChange={handleStartDateChange} />

          <TimePicker
            label=""
            onChange={handleStartTimeChange} // Use the separate handler for start time
          />

          <span>~</span>

          <span>終了日時：</span>
          <DatePicker label="" onDateChange={handleEndDateChange} />
          <TimePicker
            label=""
            onChange={handleEndTimeChange} // Use the separate handler for end time
          />
        </Box>
        <Box>
          <ButtonAtom
            onClick={handleSearchContractor}
            label="契約検索"
            width="90px"
            margin="2px"
          />
          <InterpreterSearch
            open={openInterpreter}
            onClose={setInterpreterDetails}
          />
          <Box className={classes.contractorDetails}>
            <TextBoxWithLabel
              label="契約No"
              width="calc(10vw - 20px)" // Uncomment to set a custom width
              value={contractNo}
            />
            <TextBoxWithLabel
              label="企業名"
              width="calc(32vw - 80px)" // Uncomment to set a custom width
              value={companyName}
            />
            <TextBoxWithLabel
              label="店舗名"
              width="calc(32vw - 80px)" // Uncomment to set a custom width
              value={storeName}
            />
          </Box>
        </Box>
        <Box>
          <ButtonAtom
            onClick={handleSearchInterpreter}
            label="通訳者検索"
            width="90px"
            margin="2px"
          />
          <Box className={classes.contractorDetails}>
            <TextBoxWithLabel
              label="通訳者No"
              width="calc(10vw - 20px)" // Uncomment to set a custom width
              value={interpreterNo}
            />
            <TextBoxWithLabel
              label="通訳者名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
              width="calc(28vw - 150px)" // Uncomment to set a custom width
              value={interpreterLastName}
              labelWidth="120px"
            />
            <TextBoxWithLabel
              label="名"
              width="calc(28vw - 150px)" // Uncomment to set a custom width
              value={interpreterFirstName}
              labelWidth="30px"
            />
            <SelectOption
              label="通訳言語："
              options={options}
              width={"calc(10vw - 15px)"}
              value={selectedOption}
              onChange={setSelectedOption}
              labelWidth={"85px"}
            />

            <Box className={classes.searchButton}>
              <ButtonAtom
                margin="0 0 4px 0"
                onClick={searchConditions}
                label="検索"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ContractorSearch open={openContractor} onClose={setContractorDetails} />
      <DataTable // Customize header height
        headers={headers}
        data={data}
        maxHeight="calc(82vh - 300px)"
        onSelectionChange={handleSelectionChange}
      />
      <Box className={classes.searchButton}>
        <ButtonAtom onClick={searchConditions} label="閲覧" />
      </Box>
    </Box>
  );
}

export default InterpreterEvaluationList;
