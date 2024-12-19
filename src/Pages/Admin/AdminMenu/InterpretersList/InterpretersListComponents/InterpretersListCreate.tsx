import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PasswordInput from "../../../../../components/LV1/PasswordInput/PasswordInput";
import PasswordBoxWithLabel from "../../../../../components/LV1/TextBox/PasswordBoxWithLabel";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../InterpretersListStyles/InterpretersList.scss";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import SelectableModal from "../../../../../components/LV1/SelectableModal/SelectableModal";
import { useForm } from "react-hook-form";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import SelectMultipleOptions from "../../../../../components/LV1/SelectOption/validateMultipleOptions";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";

function InterpretersListInfo() {
  const [textValue1, setTextValue1] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const searchConditions = () => {};

  const handleChange = () => {};

  const [companyData, setCompanyData] = useState<any[]>([]);
  const [storeData, setStoreData] = useState<any[]>([]);
  const [languagesSupport, setLanguagesSupport] = useState<any[]>([]);

  const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
    { label: "Option 4", value: 4 },
  ];

  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );

  // Handler for onChange to update the selected options
  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setSelectedOptions(value); // Update the state with selected options
  };

  // const [formData, setFormData] = useState<StoreCreateFormValues>({
  //   company_no: "",
  //   company_name: "",
  //   store_name: "",
  //   store_name_furigana: "",
  //   zip1: "",
  //   zip2: "",
  //   pref: "",
  //   city: "",
  //   street: "",
  //   building_name: "",
  //   tel1: "",
  //   tel2: "",
  //   tel3: "",
  //   fax1: "",
  //   fax2: "",
  //   fax3: "",
  //   store_note: "",
  // });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted, errors, isValid },
  } = useForm<any>();

  useEffect(() => {
    fetchCompaniesNames();
    fetchLanguageNames();
  }, []);

  const fetchLanguageNames = async () => {
    // console.log(244, await LanguageApiService.fetchLanguageNames());
    try {
      let response = await LanguageApiService.fetchLanguageNames();

      response = response.map((item: any) => ({
        label: item.language_name, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchCompaniesNames = async () => {
    console.log(244, await LanguageApiService.fetchLanguageNames());
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      setCompanyData(response);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchStoreNames = async () => {
    try {
      const response = await StoreApiService.fetchStoreNamesByCompany(
        selectedCompanyNo
      );
      console.log(247, response);
      setStoreData(response);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      alert("no stores exist");
      // console.error("Error fetching companies:", error);
    }
  };

  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedCompanyNo, setSelectedCompanyNo] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedStoreNo, setSelectedStoreNo] = useState<string>("");
  const [selectedStoreName, setSelectedStoreName] = useState<string>("");
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    if (!isCompanyNoEmpty) {
      fetchStoreNames();
    }
  }, [selectedCompanyNo]);

  const handleCompanySelect = (company: any) => {
    const { company_no, company_name } = company;

    setSelectedCompany(company);
    setSelectedCompanyNo(company_no);
    setSelectedCompanyName(company_name);

    console.log(147, typeof company_no);

    // Set isCompanyNoEmpty to true if company_no is an empty string or undefined
    setCompanyNoIsEmpty(!company_no || company_no === "");

    setValue("company_no", company_no);
    setValue("company_name", company_name);
  };

  const handleStoreSelect = (store: any) => {
    console.log(147, store);
    const { store_no, store_name } = store;

    setSelectedStore(store);
    setSelectedStoreNo(store_no);
    setSelectedStoreName(store_name);

    // updateFormData("company_no", company_no);
    // updateFormData("company_name", company_name);

    setValue("company_no", store_no);
    setValue("company_name", store_name);
  };

  const borderStyle = "1px solid #ccc";
  return (
    <Box className="interpreters-list-navigate">
      <MenuHeader title="管理者情報" />
      <Box className="interpreters-list-navigate-content">
        <Box className="time-details">
          <TextBoxWithLabel
            labelWidth="125px"
            label="登録日時"
            width="30vw"
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <TextBoxWithLabel
            labelWidth="125px"
            label="更新日時"
            width="30vw"
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
        </Box>
        <Box className="company-store-info">
          <Box className="company-info">
            <Box className="description-label">企業情報</Box>
            <SelectableModal
              title="企業検索"
              options={companyData}
              onOptionSelect={handleCompanySelect}
              label="企業検索"
              valueKey="company_no" // We use company_no for unique identification
              displayKey="company_name" // We display company_name in the list
            />

            <ValidationInputField
              isSubmitted={isSubmitted}
              name="company_no" // Name for the phonetic spelling
              labelWidth="125px"
              label="企業No"
              width="30vw"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={selectedCompanyNo}
              onChange={(e: any) => setSelectedCompanyNo(e.target.value)}
              // disabled={true}
              type="none"
            />
            <ValidationInputField
              isSubmitted={isSubmitted}
              name="company_name" // Name for the phonetic spelling
              labelWidth="125px"
              label="企業名"
              width="30vw"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={selectedCompanyName}
              onChange={(e: any) => setSelectedCompanyName(e.target.value)}
              // disabled={true}
              type="none"
            />
          </Box>
          <Box className="store-info">
            <Box className="description-label">店舗情報</Box>
            <SelectableModal
              title="店舗検索"
              options={storeData}
              onOptionSelect={handleStoreSelect}
              label="店舗検索"
              valueKey="store_no" // We use company_no for unique identification
              displayKey="store_name" // We display company_name in the list
              disabled={isCompanyNoEmpty}
            />

            <ValidationInputField
              isSubmitted={isSubmitted}
              name="store_no" // Name for the phonetic spelling
              labelWidth="125px"
              label="店舗No"
              width="30vw"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={selectedStoreNo}
              onChange={(e: any) => setSelectedStoreNo(e.target.value)}
              // disabled={true}
              type="none"
            />
            <ValidationInputField
              isSubmitted={isSubmitted}
              name="store_name" // Name for the phonetic spelling
              labelWidth="125px"
              label="店舗名"
              width="30vw"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={selectedStoreName}
              onChange={(e: any) => setSelectedStoreName(e.target.value)}
              // disabled={true}
              type="none"
            />
          </Box>
        </Box>
        <Box className="basic-info">
          <Box className="description-label">基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="30vw"
            value={textValue1}
            onChange={(e: any) => setTextValue1(e.target.value)}
          />
          <Box className="name-row">
            <Box className="last-name">
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                width="30vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                name="store_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                value={""}
                onChange={handleChange}
              />

              <ValidationInputField
                isSubmitted={isSubmitted}
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                name="store_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                value={""}
                onChange={handleChange}
              />
            </Box>
            <Box className="first-name">
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                width="30vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                name="store_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                value={""}
                onChange={handleChange}
              />
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                width="30vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                name="store_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                value={""}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box className="contact-details">
            <Box className="mail-address">
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="メールアドレス"
                width="30vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="メールアドレス"
                name="store_name_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                value={""}
                onChange={handleChange}
              />
            </Box>
            <Box className="tel-no">
              <Box className="tel-no">
                <Typography component="span" className="tel-label">
                  TEL
                </Typography>

                <NumberInput
                  onChange={handleChange}
                  value={""}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  onChange={handleChange}
                  value={""}
                  name="tel2"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  onChange={handleChange}
                  value={""}
                  name="tel3"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
              <Box className="tel-extension">
                <Typography component="span" className="tel-label">
                  内線
                </Typography>

                <NumberInput
                  onChange={handleChange}
                  value={""}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
            </Box>
          </Box>
          <SelectMultipleOptions
            label="通訳言語"
            labelWidth="125px"
            options={languagesSupport}
            value={selectedOptions}
            onChange={handleSelectChange}
            register={register}
            name="languages_support"
          />
        </Box>
        <Box className="password-meeting-info">
          <Box className="password-info">
            <Box className="description-label">パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={textValue1}
              onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box className="password-input">
              <PasswordBoxWithLabel
                label="パスワード"
                width="15vw"
                labelWidth="125px"
              />
              <PasswordBoxWithLabel
                label="（再入力）"
                width="15vw"
                labelWidth="125px"
              />
              {/* <ButtonAtom
              onClick={searchConditions}
              label="パスワード変更"
              width="150px"
            /> */}
            </Box>
          </Box>
          <Box className="meeting-info">
            <Box className="meeting-credentials">
              <TextBoxWithLabel
                labelWidth="125px"
                label="ミーティングID"
                width="15vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
              <TextBoxWithLabel
                labelWidth="125px"
                label="パスコード"
                width="15vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              />
            </Box>
            <TextAreaWithLabel
              label="備考"
              value={""}
              register={register}
              onChange={handleChange}
              margin="2vh 1vw 0 1vw"
              maxLength={2}
              name="company_note"
            />
          </Box>
        </Box>
        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ButtonAtom onClick={searchConditions} label="編集" width="100px" />
      </Box>
    </Box>
  );
}

export default InterpretersListInfo;
