import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../InterpretersListStyles/InterpretersList.scss";
import { useLocation } from "react-router-dom";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import { UserApiService } from "../../../../../api/apiService/user/user-api-service";
import { InterpreterInfo } from "../../../../../types/UserTypes/UserTypes";
import { convertToJST, deleteStatus } from "../../../../../utils/utils";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
import { useForm } from "react-hook-form";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import SelectableModal from "../../../../../components/LV1/SelectableModal/SelectableModal";
import { LanguageApiService } from "../../../../../api/apiService/languages/languages-api-service";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import ValidateSelectMultipleOptions from "../../../../../components/LV1/SelectOption/validateMultipleOptions";
import { CompanyInfo } from "../../../../../types/CompanyTypes/CompanyTypes";
import { StoreInfo } from "../../../../../types/StoreTypes/StoreTypes";
import { LanguageInfo } from "../../../../../types/LanguageTypes/LanguageTypes";

function InterpretersListUpdate() {
  const [optionValue, setOptionValue] = useState<Array<number | string>>([]);
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [isStoresExist, setIsStoresExist] = useState<boolean>(true);

  const { state } = useLocation();
  const selectedInterpreterNo = state?.selectedInterpreterNo;

  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);

  console.log(1557, selectedInterpreterNo);

  const [formData, setFormData] = useState<InterpreterInfo>({
    user_no: "",
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
    user_password_confirm: "",
    meeting_id: "",
    meeting_passcode: "",
    user_note: "",
    updated_at: "",
    created_at: "",
    user_deleted: false,
  });

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

  const updateFormData = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;

    updateFormData("company_no", company_no);
    updateFormData("company_name", company_name);

    setValue("company_no", company_no);
    setValue("company_name", company_name);

    updateFormData("store_no", "");
    updateFormData("store_name", "");

    fetchStoreNames();
  };

  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    updateFormData("store_no", store_no);
    updateFormData("store_name", store_name);

    setValue("store_no", store_no);
    setValue("store_name", store_name);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<InterpreterInfo>();

  const searchConditions = () => {};

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchUserDetails();
  }, [selectedInterpreterNo]);

  useEffect(() => {
    if (formData.translate_languages.length > 0) {
      fetchLanguagesById();
    }
  }, [formData.translate_languages]);

  useEffect(() => {
    fetchLanguageNames();
    fetchCompaniesListData();
    console.log(2477, formData.company_no);
  }, []);

  const fetchLanguageNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAll();

      console.log(177, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name_furigana, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);

      // const response = await axios.get(`${homePage}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchUserDetails = async () => {
    if (!selectedInterpreterNo) return; // Early return if no selectedInterpreterNo

    try {
      const userDetails = await UserApiService.fetchUser(selectedInterpreterNo);
      const {
        tel,
        user_no,
        company_no,
        company_name,
        store_no,
        store_name,
        user_name_last,
        user_name_last_furigana,
        user_name_first,
        user_name_first_furigana,
        mail_address,
        tel_extension,
        translate_languages,
        password_expire,
        user_password,
        meeting_id,
        meeting_passcode,
        user_note,
        updated_at,
        created_at,
        user_deleted,
      } = userDetails;

      const [tel1, tel2, tel3] = tel.split("-");

      console.log(166, userDetails);

      const apiFormData = {
        user_no,
        company_no,
        company_name,
        store_no,
        store_name,
        user_name_last,
        user_name_last_furigana,
        user_name_first,
        user_name_first_furigana,
        mail_address,
        tel1,
        tel2,
        tel3,
        tel_extension,
        translate_languages,
        password_expire,
        user_password,
        user_password_confirm: user_password,
        meeting_id,
        meeting_passcode,
        user_note,
        updated_at,
        created_at,
        user_deleted,
      };

      setFormData(apiFormData);

      setValue("company_no", apiFormData.company_no);
      setValue("company_name", apiFormData.company_name);
      setValue("store_no", apiFormData.store_no);
      setValue("store_name", apiFormData.store_name);
      setValue("user_name_last", apiFormData.user_name_last);
      setValue("user_name_last_furigana", apiFormData.user_name_last_furigana);
      setValue("user_name_first", apiFormData.user_name_first);
      setValue(
        "user_name_first_furigana",
        apiFormData.user_name_first_furigana
      );
      setValue("mail_address", apiFormData.mail_address);
      setValue("translate_languages", apiFormData.translate_languages);
      setValue("user_password", apiFormData.user_password);
      setValue("user_password_confirm", apiFormData.user_password);
      setValue("meeting_id", apiFormData.meeting_id);
      setValue("meeting_passcode", apiFormData.meeting_passcode);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchLanguagesById = async () => {
    console.log(289, formData);

    const languageDetails = await LanguageApiService.fetchLanguagesById(
      formData.translate_languages
    );
    console.log(189, languageDetails);
    const transformedOptions = languageDetails.map(
      (language: LanguageInfo) => ({
        value: language.languages_support_no,
        label: language.language_name_furigana,
      })
    );

    console.log(transformedOptions);
    console.log(997, typeof formData.translate_languages);
    console.log(998, formData.translate_languages);

    setOptionValue(formData.translate_languages);
  };

  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setOptionValue(value); // Update the state with selected options

    setFormData((prevData) => ({
      ...prevData,
      translate_languages: value, // Convert array to a string if needed
    }));
  };

  useEffect(() => {
    if (formData.company_no !== "") {
      fetchStoreNames();
    }
  }, [formData.company_no]);

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

  const updateInterpreter = () => {
    console.log(1555, formData);
    UserApiService.updateUser(
      formData.user_no,
      formData.user_name_last,
      formData.user_name_last_furigana,
      formData.user_name_first,
      formData.user_name_first_furigana,
      formData.mail_address,
      formData.user_password,
      formData.tel1,
      formData.tel2,
      formData.tel3,
      formData.tel_extension,
      formData.user_note,
      formData.translate_languages,
      formData.meeting_id,
      formData.meeting_passcode,
      formData.store_no
    );
  };

  return (
    <Box
      className="interpreters-list-navigate"
      onSubmit={handleSubmit(updateInterpreter)}
      component="form"
    >
      <MenuHeader title="通訳者情報" />
      <Box className="interpreters-list-navigate-content">
        <Box className="time-details-delete-flag">
          <Box className="time-details">
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
              value={convertToJST(formData.created_at ?? "")}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
              value={convertToJST(formData.updated_at ?? "")}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.user_deleted ?? false)}
            />
          </Box>
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
              value={formData.company_no}
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
              value={formData.company_name}
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
              disabled={!isStoresExist}
            />
            <ValidationInputField
              isSubmitted={isSubmitted}
              name="store_no" // Name for the phonetic spelling
              labelWidth="125px"
              label="店舗No"
              width="30vw"
              register={register}
              maxLength={128}
              value={formData.store_no}
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
              value={formData.store_name}
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
            value={formData.user_no}
          />
          <Box className="name-row">
            <Box className="last-name">
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                name="user_name_last_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.user_name_last_furigana}
                onChange={handleChange}
              />

              <ValidationInputField
                isSubmitted={isSubmitted}
                label="名前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓"
                name="user_name_last" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.user_name_last}
                onChange={handleChange}
              />
            </Box>
            <Box className="first-name">
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                name="user_name_first_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.user_name_first_furigana}
                onChange={handleChange}
              />
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                name="user_name_first" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.user_name_first}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box className="contact-details">
            <Box className="mail-address">
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="メールアドレス"
                name="mail_address" // Name for the phonetic spelling
                labelWidth="125px"
                width="30vw"
                register={register}
                maxLength={128}
                value={formData.mail_address}
                onChange={handleChange}
                type="email"
              />
            </Box>
            <Box className="tel-no">
              <Box className="tel-no">
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
              <Box className="tel-extension">
                <Typography component="span" className="tel-label">
                  内線
                </Typography>

                <NumberInput
                  onChange={handleChange}
                  value={formData.tel_extension}
                  name="tel_extension"
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
            value={optionValue}
            onChange={handleSelectChange}
            register={register}
            name="translate_languages"
          />
        </Box>
        <Box className="password-meeting-info">
          <Box className="password-info">
            <Box className="description-label">パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={convertToJST(formData.password_expire ?? "")}
            />
            <Box className="password-input">
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="user_password" // Name for the phonetic spelling
                labelWidth="125px"
                label="パスワード"
                width="15vw"
                register={register}
                maxLength={128}
                type="password"
                value={formData.user_password}
                onChange={handleChange}
              />
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="user_password_confirm" // Name for the phonetic spelling
                labelWidth="125px"
                label="（再入力）"
                width="15vw"
                register={register}
                maxLength={128}
                type="password"
                value={formData.user_password_confirm}
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
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="meeting_id" // Name for the phonetic spelling
                labelWidth="125px"
                label="ミーティングID"
                width="15vw"
                register={register}
                maxLength={128}
                value={formData.meeting_id}
                onChange={handleChange}
              />
              <ValidationInputField
                isSubmitted={isSubmitted}
                name="meeting_passcode" // Name for the phonetic spelling
                labelWidth="125px"
                label="パスコード"
                width="15vw"
                register={register}
                maxLength={128}
                value={formData.meeting_passcode}
                onChange={handleChange}
              />
            </Box>
            <TextAreaWithLabel
              label="備考"
              value={formData.user_note}
              register={register}
              onChange={handleChange}
              margin="2vh 1vw 0 1vw"
              maxLength={200}
              name="user_note"
            />
          </Box>
        </Box>
        <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
        <ValidationButton label="編集" width="100px" type="submit" />
      </Box>
    </Box>
  );
}

export default InterpretersListUpdate;
