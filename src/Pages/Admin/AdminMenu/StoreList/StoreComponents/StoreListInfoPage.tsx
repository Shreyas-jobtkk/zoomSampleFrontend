import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, TextField, Typography, SelectChangeEvent } from "@mui/material";
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
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
// import { StoreCreateFormValues } from "../../../../../CompanyTypes/CompanyTypes";
import { useForm } from "react-hook-form";
import { StoreCreateFormValues } from "../../../../../types/StoreTypes/StoreTypes";

function StoreListInfo() {
  const [selectedCompanyNo, setSelectedCompanyNo] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedCompanyDelete, setSelectedCompanyDelete] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<StoreCreateFormValues>({
    company_no: "",
    company_name: "",
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
    store_note: "",
  });

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const [selectedOption, setSelectedOption] = useState<string>("");

  const createStore = () => {
    console.log(113, formData);
    try {
      StoreApiService.createStore(
        formData.company_no,
        formData.store_name,
        formData.store_name_furigana,
        formData.zip1,
        formData.zip2,
        formData.pref,
        formData.city,
        formData.street,
        formData.building_name,
        formData.tel1,
        formData.tel2,
        formData.tel3,
        formData.fax1,
        formData.fax2,
        formData.fax3,
        formData.store_note
      );
      // alert("saved");
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<StoreCreateFormValues>();

  useEffect(() => {
    fetchCompaniesListData();
  }, []);

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
  // const options = JapanPrefectures;

  const handleCompanySelect = (company: any) => {
    console.log(147, isValid);
    setSelectedCompany(company);
    setSelectedCompanyNo(company.company_no);
    setSelectedCompanyName(company.company_name);
    setFormData((prevData) => ({
      ...prevData,
      company_no: company.company_no,
      company_name: company.company_name,
    }));
    setValue("company_no", company.company_no);
    setValue("company_name", company.company_name);
  };

  const [companyData, setCompanyData] = useState<any[]>([]);
  const [store_note, setNote] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      pref: value,
    }));
  };

  return (
    <Box
      className="store-list-navigate"
      onSubmit={handleSubmit(createStore)}
      component="form"
    >
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

            <TextBoxWithLabel
              label="企業No"
              labelWidth="125px"
              width="300px" // Uncomment to set a custom width
              value={selectedCompanyNo}
              onChange={(e: any) => setSelectedCompanyNo(e.target.value)}
            />

            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
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
                />

                <TextBoxWithLabel
                  labelWidth="125px"
                  label="店舗名"
                  width="300px" // Uncomment to set a custom width
                  value={formData.store_name}
                  onChange={handleChange}
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
                      name="zip2"
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                    />
                  </Box>

                  <SelectOption
                    label="都道府県"
                    options={JapanPrefectures}
                    width={150}
                    value={formData.pref}
                    onChange={handleSelectChange}
                    labelWidth="75px"
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="市区町村"
                    width="300px" // Uncomment to set a custom width
                    onChange={handleChange}
                    value={formData.city}
                    name="city"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="番地"
                    width="300px" // Uncomment to set a custom width
                    onChange={handleChange}
                    value={formData.street}
                    name="street"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="建物名等"
                    width="300px" // Uncomment to set a custom width
                    onChange={handleChange}
                    value={formData.building_name}
                    name="building_name"
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
                    onChange={handleChange}
                    value={formData.tel1}
                    name="tel1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    onChange={handleChange}
                    value={formData.tel2}
                    name="tel2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    onChange={handleChange}
                    value={formData.tel3}
                    name="tel3"
                    maxLength={4}
                    margin="0 8px"
                  />
                </Box>
                <Box>
                  <Typography component="span" className="fax-label">
                    FAX
                  </Typography>

                  <NumberInput
                    onChange={handleChange}
                    value={formData.fax1}
                    name="fax1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    onChange={handleChange}
                    value={formData.fax2}
                    name="fax2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    onChange={handleChange}
                    value={formData.fax3}
                    name="fax3"
                    maxLength={4}
                    margin="0 8px"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <TextAreaWithLabel
          value={formData.store_note}
          onChange={handleChange}
          label="備考"
          margin="0 0 0 40vw"
          labelWidth="25px"
          maxLength={5}
          register={register}
          name="store_note"
        />
        <ButtonAtom onClick={createStore} label="閉じる" width="100px" />
        {/* <ButtonAtom onClick={createStore} label="編集" width="100px" /> */}
      </Box>
    </Box>
  );
}

export default StoreListInfo;
