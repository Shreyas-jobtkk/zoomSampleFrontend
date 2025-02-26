import DatePicker from "../../../LV1/DatePicker/DatePicker";
import TimePicker from "../../../LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import DataTable from "../../../LV3/DataTable/DataTable";
// import classes from "../../../../components/Admin/Entities/styles/AdminEntities.module.scss";
import classes from "../styles/InterpreterEntities.module.scss";
import ContractorSearch from "../../../../components/Admin/Entities/User/Contractor/ContractorSearch";
// import ContractorSearch from "c:/Users/g_shreyas/Desktop/zoomFrontend/zoomSampleFrontend/src/components/Admin/Entities/User/Contractor/ContractorSearch";
import { CallLogApiService } from "../../../../api/apiService/callLog/callLog-api-service";
import { convertToJST, getCallStatus } from "../../../../utils/utils";

function InterpreterEvaluationList() {
  const headers = [
    "No",
    "開始日時",
    "終了日時",
    "契約No",
    "企業名",
    "店舗名",
    "承諾/拒否",
  ];

  const [contractNo, setContractNo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [tableData, setTableData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([]);
  const [startDateRangeMin, setStartDateRangeMin] = useState<Date | null>(null);
  const [startDateRangeMax, setStartDateRangeMax] = useState<Date | null>(null);
  const [startDateTimeRangeMin, setStartDateTimeRangeMin] = useState<any>(null);
  // const [startTimeRangeMin, setStartTimeRangeMin] = useState<Date | null>(null);
  // const [startTimeRangeMax, setStartTimeRangeMax] = useState<Date | null>(null);
  const [startDateTimeRangeMax, setStartDateTimeRangeMax] = useState<any>(null);

  let callStatusOptions: { label: string; value: string | number }[] = [
    { label: "Cancel", value: "callCanceled" },
    { label: "Time Out", value: "callTimeUp" },
    { label: "承諾", value: "callAccepted" },
    { label: "拒否", value: "rejected" },
  ];

  const [openContractor, setOpenContractor] = useState(false);
  const [callStatus, setCallStatus] = useState<string>("");

  const handleSearchContractor = () => {
    setOpenContractor(true);
  };

  useEffect(() => {
    fetchCallLogData();
  }, []);

  const searchConditions = () => {
    filterTableData();
  };

  const filterTableData = () => {
    const filtered = tableData.filter((item: any) => {
      const matchesContractNo =
        contractNo === "" || item["契約No"] === contractNo;

      let startperiodRangeMin = startDateTimeRangeMin
        ? new Date(startDateTimeRangeMin)
        : null;

      const matchesStartTimeMin =
        startperiodRangeMin === null ||
        new Date(item["開始日時"]) >= startperiodRangeMin;
      console.log(144, startperiodRangeMin);
      console.log(145, matchesStartTimeMin);

      let startperiodRangeMax = startDateTimeRangeMax
        ? new Date(startDateTimeRangeMax)
        : null;

      const matchesStartTimeMax =
        startperiodRangeMax === null ||
        new Date(item["開始日時"]) <= startperiodRangeMax;

      const matchesCallStatus =
        callStatus === "" || item["承諾/拒否"] === getCallStatus(callStatus);

      return (
        matchesContractNo &&
        matchesStartTimeMin &&
        matchesStartTimeMax &&
        matchesCallStatus
      );
    });

    // Update the table data to show filtered results
    setSearchData(filtered);
  };

  const fetchCallLogData = async () => {
    try {
      const response = await CallLogApiService.fetchCallLog();
      console.log(75589, response);
      let apiTableData: any = response.map((item: any) => ({
        開始日時: convertToJST(item.call_start),
        終了日時: convertToJST(item.call_end),
        契約No: item.contract_no,
        企業名: item.contract_company_name,
        店舗名: item.contract_store_name,
        通訳者No: item.interpreter_no || null,
        通訳者名: item.interpreter_name,
        // "承諾/拒否": item.call_status,
        "承諾/拒否": getCallStatus(item.call_status),
        lang_no: item.language_support_no,
      }));

      let videoStartTableData = apiTableData.map(
        (item: any, index: number) => ({
          No: index + 1, // Reassign sequential numbering
          ...item,
        })
      );
      console.log(189, videoStartTableData);
      setTableData(videoStartTableData); // Initial table data load
      setSearchData(videoStartTableData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
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

  // Handle start date change
  const handleStartDateChange = (date: any) => {
    setStartDateRangeMin(date);
    setStartDateTimeRangeMin(date);
    console.log("Selected Start Date:", date || "None");
  };

  // Handle end date change
  const handleEndDateChange = (date: any) => {
    setStartDateTimeRangeMax(date);
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
    setStartDateTimeRangeMax(
      `${startDateRangeMax} ${newValue.format("HH:mm") || "00:00"}`
    );
  };

  const handleSelectionChange = (
    selectedData: Array<{ No: string | number; [key: string]: string | number }>
  ) => {
    console.log("Selected Data:", selectedData);
  };

  return (
    <Box className={classes.interpreterEntity}>
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
            disabled={!startDateRangeMin}
          />

          <span>~</span>

          {/* <span>終了日時：</span> */}
          <span>開始日時：</span>
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
          <Box className={classes.lastRow}>
            <SelectOption
              label="承諾/拒否"
              options={callStatusOptions}
              width={"calc(10vw - 15px)"}
              value={callStatus}
              onChange={setCallStatus}
              labelWidth={"90px"}
            />

            <Box>
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
        data={searchData}
        maxHeight="calc(82vh - 300px)"
        onSelectionChange={handleSelectionChange}
      />
      <Box className={classes.actionButtons}>
        <ButtonAtom onClick={searchConditions} label="閲覧" />
        <ButtonAtom onClick={searchConditions} label="編集" />
        <ButtonAtom onClick={searchConditions} label="削除" />
      </Box>
    </Box>
  );
}

export default InterpreterEvaluationList;
