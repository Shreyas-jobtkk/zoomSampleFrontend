import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import MenuHeader from "../../../LV3/Header/MenuHeader";
import DataTable from "../../../LV3/DataTable/DataTable";
import { DataTableRow } from "../../../LV3/DataTable/DataTable";
// import "./AdminMenu.scss";
import { useNavigate } from "react-router-dom";
import { convertToJST, deleteStatus } from "../../../../utils/utils";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../../api/apiService/store/store-api-service";
import { StoreInfo } from "../../../../types/StoreTypes/StoreTypes";
import SelectableModal from "../../../LV1/SelectableModal/SelectableModal";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import classes from "../styles/AdminEntities.module.scss";

function StoreList() {
  const navigate = useNavigate();

  // States for data and inputs selectedStoreNo
  const [selectedStoreNoArray, setSelectedStoreNoArray] = useState<number[]>(
    []
  );
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);

  const headers = [
    "No",
    "登録日時",
    "更新日時",
    "企業No",
    "企業名",
    "店舗No",
    "店舗名",
    "フリガナ",
    "削除",
  ];

  const [tableData, setTableData] = useState<DataTableRow[]>([]);
  const [storeNoRangeMin, setStoreNoRangeMin] = useState<string>("");
  const [storeNoRangeMax, setStoreNoRangeMax] = useState<string>("");
  const [storeNameFurigana, setStoreNameFurigana] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyNo, setCompanyNo] = useState<string>("");
  const [searchData, setSearchData] = useState<DataTableRow[]>([]);

  const searchConditions = () => {
    filterTableData();
  };

  const filterTableData = () => {
    const isInvalidRange = Number(storeNoRangeMin) > Number(storeNoRangeMax);
    const isNotEmpty = storeNoRangeMin !== "" && storeNoRangeMax !== "";

    if (isInvalidRange && isNotEmpty) {
      return alert("min is more than max");
    }

    const filtered = tableData.filter((item) => {
      const matchesCompanyNo = companyNo === "" || item["企業No"] === companyNo;

      const storeNo = Number(item["店舗No"]);

      const isInRange =
        (!storeNoRangeMin || storeNo >= Number(storeNoRangeMin)) &&
        (!storeNoRangeMax || storeNo <= Number(storeNoRangeMax));

      const matchesFilters =
        (!storeName || String(item["店舗名"]).includes(storeName)) &&
        (!storeNameFurigana ||
          String(item["フリガナ"]).includes(storeNameFurigana));

      console.log(21445, matchesFilters);

      // An item is included in the results only if it satisfies both range and search conditions
      return isInRange && matchesFilters && matchesCompanyNo;
    });

    // Update the table data to show filtered results
    setSearchData(filtered);
  };

  const fetchStoreListData = async () => {
    try {
      const response = await StoreApiService.fetchStoreAll();
      const sortedData = response
        .sort(
          (a: StoreInfo, b: StoreInfo) =>
            Number(a.store_no) - Number(b.store_no)
        )
        .map((item: StoreInfo, index: number) => ({
          No: index + 1,
          登録日時: convertToJST(item.created_at),
          更新日時: convertToJST(item.updated_at),
          企業No: item.company_no,
          企業名: item.company_name,
          店舗No: item.store_no,
          店舗名: item.store_name,
          フリガナ: item.store_name_furigana,
          削除: deleteStatus(item.store_delete),
        }));

      setTableData(sortedData); // Initial table data load
      setSearchData(sortedData);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchCompaniesNames();
    fetchStoreListData();
  }, []);

  const fetchCompaniesNames = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(145, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const [selectedData, setSelectedData] = useState<DataTableRow[]>([]);

  // Handle selection change
  const handleSelectionChange = (newSelectedData: DataTableRow[]) => {
    // Update the selected data state
    setSelectedData(newSelectedData);
    console.log(123, newSelectedData);
    // // Log the selected data to the console
    const selectedStoreNo = newSelectedData.map((item) =>
      Number(item["店舗No"])
    );
    setSelectedStoreNoArray(selectedStoreNo);
    console.log(
      "Selected Data:",
      selectedStoreNo,
      selectedData,
      newSelectedData
    );
  };

  const navigateToInfoPage = () => {
    navigate("/StoreInfo", {
      state: { selectedStoreNo: selectedStoreNoArray[0] },
    });
  };

  const navigateToEditPage = () => {
    navigate("/StoreEdit", {
      state: { selectedStoreNo: selectedStoreNoArray[0] },
    });
  };

  const handleDeleteStores = async () => {
    console.log(114, selectedStoreNoArray);
    try {
      await StoreApiService.deleteStores(selectedStoreNoArray);
      // setCompanyList(companyList.filter((company) => company.id !== id)); // Update the list locally
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while deleting the company.");
      }
    }
    await fetchStoreListData();
  };

  const navigateToStoreCreate = () => {
    navigate("/StoreCreate");
  };

  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;
    setCompanyNo(company_no);
    setCompanyName(company_name);
  };

  return (
    <Box className={classes.adminEntity}>
      <MenuHeader title="店舗一覧" />
      <Box className={classes.searchContainer}>
        <Box className={classes.searchLabel}>検索条件</Box>
        <Box className={classes.moveTop}>
          <Box>
            <SelectableModal
              title="企業検索"
              options={companyData}
              onOptionSelect={handleCompanySelect}
              label="企業検索"
              valueKey="company_no" // We use company_no for unique identification
              displayKey="company_name" // We display company_name in the list
            />
            <Box className={classes.companiesDetails}>
              <Box style={{ minWidth: "35vw" }}>
                <TextBoxWithLabel
                  label="企業No"
                  width="10vw" // Uncomment to set a custom width
                  value={companyNo}
                />
              </Box>
              <TextBoxWithLabel
                label="企業名"
                width="40vw" // Uncomment to set a custom width
                value={companyName}
              />
            </Box>
          </Box>
          <Box className={`${classes.storeDetails} ${classes.marginTop}`}>
            <Box sx={{ display: "flex", minWidth: "35vw", gap: "2vw" }}>
              <TextBoxWithLabel
                disabled={false}
                label="店舗No"
                width="10vw" // Uncomment to set a custom width
                value={storeNoRangeMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNoRangeMin(e.target.value)
                }
                type="number"
              />
              <TextBoxWithLabel
                disabled={false}
                label="~"
                width="10vw" // Uncomment to set a custom width
                value={storeNoRangeMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNoRangeMax(e.target.value)
                }
                type="number"
                labelWidth="3vw"
              />{" "}
            </Box>
            <Box>
              <TextBoxWithLabel
                disabled={false}
                label="フリガナ"
                width="40vw" // Uncomment to set a custom width
                value={storeNameFurigana}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreNameFurigana(e.target.value)
                }
                // labelWidth="70px"
              />
              <TextBoxWithLabel
                disabled={false}
                // labelWidth="70px"
                label="店舗名"
                width="40vw" // Uncomment to set a custom width
                value={storeName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStoreName(e.target.value)
                }
              />
            </Box>
            <Box className={classes.searchButton}>
              <ButtonAtom onClick={searchConditions} label="検索" />
            </Box>
          </Box>
        </Box>
      </Box>
      <DataTable // Customize header height
        headers={headers}
        data={searchData}
        maxHeight="calc(87vh - 260px)"
        onSelectionChange={handleSelectionChange}
        operationButton="新規"
        onClick={navigateToStoreCreate}
      />
      <Box className={classes.actionButtons}>
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
          onClick={handleDeleteStores}
          disabled={selectedData.length <= 0}
          label="削除"
        />
      </Box>
    </Box>
  );
}

export default StoreList;
