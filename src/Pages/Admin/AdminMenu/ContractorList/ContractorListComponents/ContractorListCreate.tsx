import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
import "../ContractorListStyles/ContractorList.scss";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import ValidationInputField from "../../../../../components/LV1/ValidationInputField/ValidationInputField";
import SelectableModal from "../../../../../components/LV1/SelectableModal/SelectableModal";
import { useForm } from "react-hook-form";
import { CompanyApiService } from "../../../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import ValidationButton from "../../../../../components/LV1/ValidationButton/ValidationButton";
import { UserCreateFormValues } from "../../../../../types/UserTypes/UserTypes";
import { UserApiService } from "../../../../../api/apiService/user/user-api-service";
import { CompanyInfo } from "../../../../../types/CompanyTypes/CompanyTypes";
import { StoreInfo } from "../../../../../types/StoreTypes/StoreTypes";

function ContractorListInfo() {
  const [textValue1, setTextValue1] = useState<string>("");

  const searchConditions = () => {};
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };

  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);

  const [isStoresExist, setIsStoresExist] = useState<boolean>(false);

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
    password_expire: "",
    user_password: "",
    user_password_confirm: "",
    user_note: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<UserCreateFormValues>();

  useEffect(() => {
    fetchCompaniesNames();
  }, []);

  const fetchCompaniesNames = async () => {
    // console.log(244, await LanguageApiService.fetchLanguageNames());
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      setCompanyData(response);

      // const response = await axios.get(`${apiUrl}/company`);
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

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      setIsStoresExist(false);
      alert("no stores exist");
      // console.error("Error fetching companies:", error);
    }
  };

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

  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;

    // Set isCompanyNoEmpty to true if company_no is an empty string or undefined
    setCompanyNoIsEmpty(!company_no || company_no === "");

    updateFormData("company_no", company_no);
    updateFormData("company_name", company_name);

    setValue("company_no", company_no);
    setValue("company_name", company_name);

    updateFormData("store_no", "");
    updateFormData("store_name", "");
  };

  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    updateFormData("store_no", store_no);
    updateFormData("store_name", store_name);

    setValue("store_no", store_no);
    setValue("store_name", store_name);
  };

  const createInterpreter = () => {
    console.log(1555, formData);

    try {
      UserApiService.createUser(
        formData.store_no,
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
        "contractor",
        formData.user_note,
        null,
        formData.password_expire,
        null,
        null
      );
      alert("saved");
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  return (
    <Box
      className="interpreters-list-navigate"
      onSubmit={handleSubmit(createInterpreter)}
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
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
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
          <TextBoxWithLabel labelWidth="125px" label="No" width="30vw" />
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
          {/* <ValidateSelectMultipleOptions
            isSubmitted={isSubmitted}
            label="通訳言語"
            labelWidth="125px"
            options={languagesSupport}
            value={selectedOptions}
            onChange={handleSelectChange}
            register={register}
            name="translate_languages"
          /> */}
        </Box>
        <Box className="password-meeting-info">
          <Box className="password-info">
            <Box className="description-label">パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={formData.password_expire}
              onChange={(e: any) => setTextValue1(e.target.value)}
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
            </Box>
          </Box>
          <Box className="meeting-info">
            <TextAreaWithLabel
              label="備考"
              value={formData.user_note}
              register={register}
              onChange={handleChange}
              margin="2vh 1vw 0 1vw"
              maxLength={2}
              name="user_note"
            />
          </Box>
        </Box>
        <Box className="button-container">
          <ButtonAtom onClick={searchConditions} label="閉じる" width="100px" />
          <ValidationButton label="保存" width="100px" type="submit" />
        </Box>
      </Box>
    </Box>
  );
}

export default ContractorListInfo;
