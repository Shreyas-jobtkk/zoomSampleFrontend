import DatePicker from "../../components/LV1/DatePicker/DatePicker";
import TimePicker from "../../components/LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../components/LV1/ButtonAtom/ButtonAtom";
import MenuHeader from "../../components/LV3/Header/MenuHeader/MenuHeader";
import SelectOption from "../../components/LV1/SelectOption/SelectOption";
import DataTable from "../../components/LV3/DataTable/DataTable";
import DataTableControler from "../../components/LV3/DataTable/DataTableControler";
import classes from "../../styles/AdminEntities.module.scss";
import ContractorSearch from "../../dialog/UserSearch/ContractorSearch";
import InterpreterSearch from "../../dialog/UserSearch/InterpreterSearch";
import { CallLogApiService } from "../../api/apiService/callLog/callLog-api-service";
import { convertToJST, getCallStatus } from "../../utils/utils";

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
    "承諾/拒否",
  ];

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowLimit, setRowLimit] = useState<number>(10);

  const [interpreterNo, setIinterpreterNo] = useState<string>("");
  const [interpreterFirstName, setIinterpreterFirstName] = useState<string>("");
  const [interpreterLastName, setIinterpreterLastName] = useState<string>("");
  const [contractNo, setContractNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [tableData, setTableData] = useState<any>([]);
  const [startDateRangeMin, setStartDateRangeMin] = useState<Date | null>(null);
  const [startDateRangeMax, setStartDateRangeMax] = useState<Date | null>(null);
  const [startDateTimeRangeMin, setStartDateTimeRangeMin] = useState<any>("");
  // const [startTimeRangeMin, setStartTimeRangeMin] = useState<Date | null>(null);
  // const [startTimeRangeMax, setStartTimeRangeMax] = useState<Date | null>(null);
  const [endDateTimeRangeMax, setEndDateTimeRangeMax] = useState<any>("");

  const [callStatus, setCallStatus] = useState<string>("");
  let callStatusOptions: { label: string; value: string | number }[] = [
    { label: "Cancel", value: "callCanceled" },
    { label: "Time Out", value: "callTimeUp" },
    { label: "承諾", value: "callAccepted" },
    { label: "拒否", value: "rejected" },
  ];

  const [openContractor, setOpenContractor] = useState(false);
  const [openInterpreter, setOpenInterpreter] = useState(false);

  const handleSearchContractor = () => {
    setOpenContractor(true);
  };

  useEffect(() => {
    fetchCallLogData();
  }, [page, rowLimit]);

  const searchConditions = () => {
    fetchCallLogData();
  };

  const fetchCallLogData = async () => {
    try {
      const response = await CallLogApiService.fetchCallLog(
        page,
        rowLimit,
        contractNo,
        interpreterNo,
        "",
        startDateTimeRangeMin,
        endDateTimeRangeMax,
        callStatus
      );

      setTotalPages(Math.ceil(response.totalRecords / rowLimit));
      console.log(75589, response);
      let apiTableData: any = response.callLogs.map((item: any) => ({
        開始日時: convertToJST(item.call_start),
        終了日時: convertToJST(item.call_end),
        契約No: item.contract_no,
        企業名: item.contract_company_name,
        店舗名: item.contract_store_name,
        通訳者No: item.interpreter_no,
        通訳者名: item.interpreter_name,
        "承諾/拒否": getCallStatus(item.call_status),
        lang_no: item.language_support_no,
      }));

      let videoStartTableData = apiTableData;
      // .filter(
      //   (item: any) => item.開始日時
      // );

      videoStartTableData = videoStartTableData.map(
        (item: any, index: number) => ({
          No: index + 1, // Reassign sequential numbering
          ...item,
        })
      );
      console.log(189, videoStartTableData);
      setTableData(videoStartTableData); // Initial table data load
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const setContractorDetails = (value: any) => {
    setOpenContractor(false);
    console.log(1777, value);

    if (value && typeof value === "object") {
      setContractNo(value["契約者No"] || ""); // Provide a fallback if key is missing
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

  // Handle start date change
  const handleStartDateChange = (date: any) => {
    setStartDateRangeMin(date);
    setStartDateTimeRangeMin(date);
    console.log("Selected Start Date:", date || "None");
  };

  // Handle end date change
  const handleEndDateChange = (date: any) => {
    setEndDateTimeRangeMax(date);
    setStartDateRangeMax(date);
    console.log("Selected End Date:", date || "None"); // Log the selected end date
  };

  // Handle start time change
  const handleStartTimeChange = (newValue: any) => {
    console.log(
      "Selected Start Time:",
      newValue ? newValue.format("HH:mm") : "None"
    ); // Log the selected start time
    // setStartTimeRangeMin(newValue ? newValue.format("HH:mm") : "None");
    setStartDateTimeRangeMin(
      `${startDateRangeMin} ${newValue.format("HH:mm") || "00:00"}`
    );
  };

  // Handle end time change
  const handleEndTimeChange = (newValue: any) => {
    // setStartTimeRangeMax(newValue ? newValue.format("HH:mm") : "None");
    setEndDateTimeRangeMax(
      `${startDateRangeMax} ${newValue.format("HH:mm") || "00:00"}`
    );
  };

  const handlePageChange = (page: number) => {
    // setCurrentPage(page); // Update the page state in the parent
    console.log("Current page in parent:", page);
    setPage(page + 1);
  };

  const handleRowsPerPage = (newSelectedData: any) => {
    console.log(155, newSelectedData[0].rowsPerPage);
    setRowLimit(newSelectedData[0].rowsPerPage);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="ミーティング招待一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.selectRange}>
          <Box>通訳日時</Box>
          <Box>開始日時：</Box>
          <DatePicker label="" onDateChange={handleStartDateChange} />

          <TimePicker
            label=""
            onChange={handleStartTimeChange} // Use the separate handler for start time
            disabled={!startDateRangeMin}
          />

          <span>~</span>

          {/* <span>終了日時：</span> */}
          <span>終了日時：</span>
          <DatePicker label="" onDateChange={handleEndDateChange} />
          <TimePicker
            label=""
            onChange={handleEndTimeChange} // Use the separate handler for end time
            disabled={!startDateRangeMax}
          />
        </Box>
        <Box>
          <ButtonAtom
            onClick={handleSearchContractor}
            label="契約検索"
            width="90px"
            margin="2px"
          />
          <ContractorSearch
            open={openContractor}
            onClose={setContractorDetails}
          />

          <Box className={classes.contractorDetails}>
            <TextBoxWithLabel
              label="契約No"
              width="calc(10vw - 20px)" // Uncomment to set a custom width
              value={contractNo}
              labelWidth="70px"
            />
            <TextBoxWithLabel
              label="企業名"
              width="calc(32vw - 80px)" // Uncomment to set a custom width
              value={companyName}
              labelWidth="70px"
            />
            <TextBoxWithLabel
              label="店舗名"
              width="calc(32vw - 80px)" // Uncomment to set a custom width
              value={storeName}
              labelWidth="70px"
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
              labelWidth="70px"
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
              label="承諾/拒否"
              options={callStatusOptions}
              width={"calc(10vw - 15px)"}
              value={callStatus}
              onChange={setCallStatus}
              labelWidth={"90px"}
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
      <InterpreterSearch
        open={openInterpreter}
        onClose={setInterpreterDetails}
      />
      <DataTableControler
        onPageChange={handlePageChange}
        onSelectionChange={handleRowsPerPage}
        totalPages={totalPages}
      />
      <DataTable // Customize header height
        headers={headers}
        data={tableData}
        maxHeight="calc(82vh - 300px)"
        // onSelectionChange={handleSelectionChange}
      />
      <Box className={classes.searchButton}>
        <ButtonAtom onClick={searchConditions} label="閲覧" />
        <ButtonAtom onClick={searchConditions} label="編集" />
        <ButtonAtom onClick={searchConditions} label="削除" />
      </Box>
    </Box>
  );
}

export default InterpreterEvaluationList;
