import DatePicker from "../../../LV1/DatePicker/DatePicker";
import TimePicker from "../../../LV1/TimePicker/TimePicker"; // Adjust the import path as needed
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import DataTable from "../../../LV3/DataTable/DataTable";
// import classes from "../../../../components/Admin/Entities/styles/AdminEntities.module.scss";
import classes from "../styles/ContractorEntities.module.scss";
// import ContractorSearch from "c:/Users/g_shreyas/Desktop/zoomFrontend/zoomSampleFrontend/src/components/Admin/Entities/User/Contractor/ContractorSearch";
import { CallLogApiService } from "../../../../api/apiService/callLog/callLog-api-service";
import { convertToJST } from "../../../../utils/utils";
import { LanguageApiService } from "../../../../api/apiService/languages/languages-api-service";
import { LanguageInfo } from "../../../../types/LanguageTypes/LanguageTypes";

function InterpreterEvaluationList() {
  const headers = [
    "No",
    "開始日時",
    "終了日時",
    "通訳者No",
    "通訳者名",
    "通訳言語",
    "評価",
  ];

  const [tableData, setTableData] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>([]);
  const [startDateRangeMin, setStartDateRangeMin] = useState<Date | null>(null);
  const [startDateRangeMax, setStartDateRangeMax] = useState<Date | null>(null);
  const [startDateTimeRangeMin, setStartDateTimeRangeMin] = useState<any>(null);
  // const [startTimeRangeMin, setStartTimeRangeMin] = useState<Date | null>(null);
  // const [startTimeRangeMax, setStartTimeRangeMax] = useState<Date | null>(null);
  const [startDateTimeRangeMax, setStartDateTimeRangeMax] = useState<any>(null);
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const fetchLanguageNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguageNames();

      console.log(177, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCallLogData();
    fetchLanguageNames();
  }, []);

  const searchConditions = () => {
    filterTableData();
  };

  const filterTableData = () => {
    console.log(1557, selectedLanguage);
    const filtered = tableData.filter((item: any) => {
      const matchesLangNo =
        selectedLanguage === "" || item["lang_no"] === selectedLanguage;

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

      return matchesStartTimeMin && matchesStartTimeMax && matchesLangNo;
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
        通訳者No: item.interpreter_no,
        通訳者名: item.interpreter_name,
        通訳言語: item.language_name,
        評価: item.feed_back,
        lang_no: item.language_support_no,
      }));

      let videoStartTableData = apiTableData.filter(
        (item: any) => item.開始日時
      );

      videoStartTableData = videoStartTableData.map(
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
          <Box className={classes.lastRow}>
            <SelectOption
              label="通訳言語："
              options={languagesSupport}
              width={"calc(10vw - 15px)"}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              labelWidth={"85px"}
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
