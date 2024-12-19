import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../InterpretersListStyles/InterpretersList.scss";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import SelectableModal from "../../../../../components/LV1/SelectableModal/SelectableModal";
import { useForm } from "react-hook-form";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import ValidateSelectMultipleOptions from "../../../../../components/LV1/SelectOption/validateMultipleOptions";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
import { UserCreateFormValues } from "../../../../../types/UserTypes/UserTypes";

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
  const [isStoresExist, setIsStoresExist] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );

  // Handler for onChange to update the selected options
  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setSelectedOptions(value); // Update the state with selected options
  };

  const [formData, setFormData] = useState<UserCreateFormValues>({
    company_no: "",
    company_name: "",
    store_no: "",
    store_name: "",
    user_name_last: "",
    user_name_last_furigana: "",
    user_name_first: "",
    user_name_first_furigana: "",
    mail_address: "",
    tel1: "",
    tel2: "",
    tel3: "",
    tel_extension: "",
    translate_languages: [],
    password_expire: "",
    user_password: "",
  });

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
        formData.company_no
      );
      console.log(247, response);
      setStoreData(response);
      setIsStoresExist(true);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      setIsStoresExist(false);
      alert("no stores exist");
      // console.error("Error fetching companies:", error);
    }
  };

  // const [selectedCompany, setSelectedCompany] = useState<any>(null);
  // const [selectedCompanyNo, setSelectedCompanyNo] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedStoreNo, setSelectedStoreNo] = useState<string>("");
  const [selectedStoreName, setSelectedStoreName] = useState<string>("");
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    if (!isCompanyNoEmpty) {
      fetchStoreNames();
    }
  }, [formData.company_no]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCompanySelect = (company: any) => {
    const { company_no, company_name } = company;

    // Set isCompanyNoEmpty to true if company_no is an empty string or undefined
    setCompanyNoIsEmpty(!company_no || company_no === "");

    updateFormData("company_no", company_no);
    updateFormData("company_name", company_name);

    setValue("company_no", company_no);
    setValue("company_name", company_name);
  };

  const handleStoreSelect = (store: any) => {
    const { store_no, store_name } = store;

    updateFormData("store_no", store_no);
    updateFormData("store_name", store_name);

    setValue("store_no", store_no);
    setValue("store_name", store_name);
  };

  const createInterpreter = () => {};

  const borderStyle = "1px solid #ccc";
  return (
    <Box
      className="interpreters-list-navigate"
      onSubmit={handleSubmit(createInterpreter)}
      component="form"
    >
      <MenuHeader title="管理者情報" />
      <p> {String(isStoresExist)} </p>
      <p> {String(isCompanyNoEmpty)} </p>
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
              value={formData.company_no}
              // onChange={(e: any) => setSelectedCompanyNo(e.target.value)}
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
              value={formData.company_name}
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
              disabled={!(!isCompanyNoEmpty && isStoresExist)}
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
              value={formData.store_no}
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
              // error={errors.store_no?.message} // Separate error for "furigana"
              value={formData.store_name}
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
          <ValidateSelectMultipleOptions
            isSubmitted={isSubmitted}
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
              {/* <PasswordBoxWithLabel
                label="パスワード"
                width="15vw"
                labelWidth="125px"
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="password" // Name for the phonetic spelling
                labelWidth="125px"
                label="パスワード"
                width="15vw"
                register={register}
                maxLength={128}
                type="password"
                value={""}
                onChange={handleChange}
              />
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="password_reenter" // Name for the phonetic spelling
                labelWidth="125px"
                label="（再入力）"
                width="15vw"
                register={register}
                maxLength={128}
                type="password"
                value={""}
                onChange={handleChange}
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
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="ミーティングID"
                width="15vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="password_reenter" // Name for the phonetic spelling
                labelWidth="125px"
                label="ミーティングID"
                width="15vw"
                register={register}
                maxLength={128}
                value={""}
                onChange={handleChange}
              />
              {/* <TextBoxWithLabel
                labelWidth="125px"
                label="パスコード"
                width="15vw"
                value={textValue1}
                onChange={(e: any) => setTextValue1(e.target.value)}
              /> */}
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="password_reenter" // Name for the phonetic spelling
                labelWidth="125px"
                label="パスコード"
                width="15vw"
                register={register}
                maxLength={128}
                value={""}
                onChange={handleChange}
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
        <ValidationButton label="保存" width="100px" type="submit" />
      </Box>
    </Box>
  );
}

export default InterpretersListInfo;
