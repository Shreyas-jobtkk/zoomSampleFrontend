import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PasswordInput from "../../../../../components/LV1/PasswordInput/PasswordInput";
import PasswordBoxWithLabel from "../../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../StoreStyles/StoreList.scss";
// import ValidationTextArea from "../../../../components/LV1/ValidationTextArea/ValidationTextArea";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";

// import { fetchCompaniesAll } from "../../../../api/apiService/company/company";
import SelectableModal from "../../../../../components/LV1/SelectableModal/SelectableModal";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import SelectOption from "../../../../../components/LV1/SelectOption/SelectOption";
import JapanPrefectures from "../JapanPrefectures/JapanPrefectures";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";

interface StoreFormData {
  company_no: string;
  store_name: string;
  store_name_furigana: string;
  zip1: string;
  zip2: string;
  pref: string;
  city: string;
  street: string;
  building_name: string;
  tel1: string;
  tel2: string;
  tel3: string;
  fax1: string;
  fax2: string;
  fax3: string;
  note: string;
  company_delete: boolean;
  store_delete: boolean;
}

function StoreListInfo() {
  const [selectedCompanyNo, setSelectedCompanyNo] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [formData, setFormData] = useState<StoreFormData>({
    company_no: selectedCompanyNo,
    store_name: "",
    store_name_furigana: "",
    zip1: "",
    zip2: "",
    pref: "",
    city: "",
    street: "",
    building_name: "",
    tel1: "",
    tel2: "",
    tel3: "",
    fax1: "",
    fax2: "",
    fax3: "",
    note: "",
    company_delete: false,
    store_delete: false,
  });

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const searchConditions = () => async (e: React.FormEvent) => {
    e.preventDefault();

    // Concatenate the zip codes when submitting
    const fullZip = formData.zip1 + formData.zip2; // Concatenate the two zip values

    // Concatenate the tel and fax numbers when submitting
    const fullTel = formData.tel1 + formData.tel2 + formData.tel3;
    const fullFax = formData.fax1 + formData.fax2 + formData.fax3;

    // Create the new form data with the full concatenated zip, tel, and fax
    const updatedFormData = {
      ...formData,
      zip: fullZip,
      tel: fullTel,
      fax: fullFax,
    };

    try {
      const response = await fetch("/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData), // Send the updated form data with full zip, tel, and fax
      });

      if (!response.ok) {
        throw new Error("Failed to create store.");
      }

      const result = await response.json();
      setResponseMessage(`Store created: ${result.store_name}`);
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    fetchCompaniesListData();
    setSelectedValue(value);
  };

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll();
      console.log(144, response);
      const filteredData = response.map(
        ({
          company_no,
          company_name,
        }: {
          company_no: number;
          company_name: string;
        }) => ({
          company_no,
          company_name,
        })
      );

      console.log(111, filteredData);

      setCompanyData(filteredData);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const options = JapanPrefectures;

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    setSelectedCompanyNo(company.company_no);
    setSelectedCompanyName(company.company_name);
  };

  const [companyData, setCompanyData] = useState<any[]>([]);

  const [value, setValue] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const [note, setNote] = useState<string>("");

  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Type assertion here
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create store.");
      }

      const result = await response.json();
      setResponseMessage(`Store created: ${result.store_name}`);
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Box className="store-list-navigate">
      <MenuHeader title="店舗情報" />
      <Box className="store-list-navigate-content">
        <Box className="time-details-delete-flag">
          <Box className="time-details">
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="300px" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="300px" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="company-info">
          <Box className="description-label">企業情報</Box>
          <Box className="move-top">
            <SelectableModal
              title="企業検索"
              options={companyData}
              onOptionSelect={handleCompanySelect}
              label="企業検索"
              valueKey="company_no" // We use company_no for unique identification
              displayKey="company_name" // We display company_name in the list
            />
            {/* <ButtonAtom onClick={selectCompany} label="企業検索" width="100px" /> */}
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業No"
              width="300px"
              value={selectedCompanyNo}
              onChange={(e: any) => setSelectedCompanyNo(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="企業名"
              width="300px" // Uncomment to set a custom width
              value={selectedCompanyName}
              onChange={(e: any) => setSelectedCompanyName(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <Box className="move-top">
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗No"
              width="300px" // Uncomment to set a custom width
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box className="name-row">
              <Box>
                <TextBoxWithLabel
                  labelWidth="125px"
                  label="フリガナ"
                  width="300px" // Uncomment to set a custom width
                  value={formData.store_name_furigana}
                  onChange={handleChange}
                  disabled={false}
                  name="store_name_furigana"
                />
                <TextBoxWithLabel
                  labelWidth="125px"
                  label="店舗名"
                  width="300px" // Uncomment to set a custom width
                  value={formData.store_name}
                  onChange={handleChange}
                  disabled={false}
                  name="store_name"
                />
              </Box>
            </Box>
            <Box className="store-details">
              <Box className="address-container">
                <Box className="address-label">住所</Box>
                <Box className="address-details">
                  <Box>
                    <Typography component="span" className="pin-code-label">
                      〒
                    </Typography>

                    <NumberInput
                      value={formData.zip1}
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip1"
                    />
                    <Typography component="span">-</Typography>
                    <NumberInput
                      value={formData.zip2}
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip2"
                    />
                  </Box>
                  -
                  <SelectOption
                    label="都道府県"
                    options={options}
                    width={150}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    labelWidth="75px"
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="市区町村"
                    width="300px" // Uncomment to set a custom width
                    value={textValue1}
                    onChange={(e: any) => setTextValue1(e.target.value)}
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="番地"
                    width="300px" // Uncomment to set a custom width
                    value={textValue1}
                    onChange={(e: any) => setTextValue1(e.target.value)}
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="建物名等"
                    width="300px" // Uncomment to set a custom width
                    value={textValue1}
                    onChange={(e: any) => setTextValue1(e.target.value)}
                    disabled={false}
                  />
                </Box>
                {/* <Box className="contact-details">TEL</Box> */}
              </Box>
              <Box className="contact-details">
                <Box>
                  <Typography component="span" className="tel-label">
                    TEL
                  </Typography>

                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                </Box>
                <Box>
                  <Typography component="span" className="fax-label">
                    FAX
                  </Typography>

                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    value={value}
                    onChange={handleInput}
                    maxLength={4}
                    margin="0 8px"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <TextAreaWithLabel
          value={note}
          onChange={(e: any) => setNote(e.target.value)}
          label="備考"
          margin="0 0 0 40vw"
          labelWidth="25px"
          maxLength={5}
        />
        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ButtonAtom onClick={searchConditions} label="編集" width="100px" />
      </Box>
    </Box>
  );
}

export default StoreListInfo;
