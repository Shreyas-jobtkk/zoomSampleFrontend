import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "./styles/User.module.scss";
// import { useLocation } from "react-router-dom";
import NumberInput from "../../../components/LV1/NumberInput/NumberInput";
import TextAreaWithLabel from "../../../components/LV1/TextArea/TextAreaWithLabel";
import { UserApiService } from "../../../api/apiService/user/user-api-service";
import { UserInfo } from "../../../types/UserTypes/UserTypes";
import { convertToJST, deleteStatus } from "../../../utils/utils";
import { useForm } from "react-hook-form";
import { StoreApiService } from "../../../api/apiService/store/store-api-service";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import SelectableModal from "../../../components/LV1/SelectableModal/SelectableModal";
import { LanguageApiService } from "../../../api/apiService/languages/languages-api-service";
import ValidationInputField from "../../../components/LV1/ValidationInputField/ValidationInputField";
import ValidateSelectMultipleOptions from "../../../components/LV1/SelectOption/validateMultipleOptions";
import { CompanyInfo } from "../../../types/CompanyTypes/CompanyTypes";
import { StoreInfo } from "../../../types/StoreTypes/StoreTypes";
import { LanguageInfo } from "../../../types/LanguageTypes/LanguageTypes";
import { getUserTitle } from "./userTitle"; // Adjust the path as necessary
import { useNavigate, useSearchParams } from "react-router-dom";

function UserUpdate() {
  const navigate = useNavigate();

  // State hooks
  const [optionValue, setOptionValue] = useState<Array<number | string>>([]);
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [isStoresExist, setIsStoresExist] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const selectedUserNo = Number(searchParams.get("selectedUserNo"));
  const userType: string = searchParams.get("userType") as string;
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);

  // Initialize form data with default values
  const [formData, setFormData] = useState<UserInfo>({
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
    translate_languages: null,
    password_expire: "",
    user_password: "",
    user_password_confirm: "",
    // meeting_id: null,
    // meeting_passcode: null,
    user_note: "",
    updated_at: "",
    created_at: "",
    user_deleted: false,
  });

  // Function to fetch the list of companies
  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesAll(
        "",
        "",
        "",
        "",
        "",
        ""
      );
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

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Function to update form data state
  const updateFormData = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handles company selection and fetches store names
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

  // Handles store selection and updates form data
  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    updateFormData("store_no", store_no);
    updateFormData("store_name", store_name);

    setValue("store_no", store_no);
    setValue("store_name", store_name);
  };

  // React Hook Form methods
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<UserInfo>();

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle input change and update the corresponding field in the form data
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch user details when the component is mounted or selectedUserNo changes
  useEffect(() => {
    fetchUserDetails();
  }, [selectedUserNo]);

  // Update the translate_languages field when its value changes
  useEffect(() => {
    if (
      Array.isArray(formData.translate_languages) &&
      formData.translate_languages.length > 0
    ) {
      setLanguageValue();
    }
  }, [formData.translate_languages]);

  // Fetch available languages and companies on initial render
  useEffect(() => {
    fetchLanguagesAllNames();
    fetchCompaniesListData();
    console.log(2477, formData.company_no);
  }, []);

  // Fetch all language names for the select dropdown
  const fetchLanguagesAllNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAllNames();

      console.log(1778, response);

      response = response.map((item: LanguageInfo) => ({
        label: item.language_name_furigana, // Map 'language_name' to 'label'
        value: item.languages_support_no, // Map 'languages_support_no' to 'value'
      }));

      setLanguagesSupport(response);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch user details based on the selected user number
  const fetchUserDetails = async () => {
    if (!selectedUserNo) return; // Early return if no selectedUserNo

    try {
      const userDetails = await UserApiService.fetchUser(selectedUserNo);
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
        // meeting_id,
        // meeting_passcode,
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
        // meeting_id,
        // meeting_passcode,
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
      // setValue("meeting_id", apiFormData.meeting_id);
      // setValue("meeting_passcode", apiFormData.meeting_passcode);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Set selected language values from form data
  const setLanguageValue = async () => {
    console.log(289, formData);

    setOptionValue(formData.translate_languages);
  };

  // Handle language selection change and update state
  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setOptionValue(value); // Update the state with selected options

    setFormData((prevData) => ({
      ...prevData,
      translate_languages: value, // Convert array to a string if needed
    }));
  };

  // Fetch store names based on selected company
  useEffect(() => {
    if (formData.company_no !== "") {
      fetchStoreNames();
    }
  }, [formData.company_no]);

  // Fetch store names based on company number
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

  // Normalize user data for comparison
  function normalizeUserData(user: any) {
    return {
      user_no: user.user_no,
      company_no: user.company_no,
      store_no: user.store_no,
      user_name_first: user.user_name_first,
      user_name_first_furigana: user.user_name_first_furigana,
      user_name_last: user.user_name_last,
      user_name_last_furigana: user.user_name_last_furigana,
      mail_address: user.mail_address,
      tel: `${user.tel1}-${user.tel2}-${user.tel3}`, // Merge tel parts
      tel_extension: `${user.tel_extension}`, // Merge fax parts
      translate_languages: user.translate_languages,
      user_password: user.user_password,
      // meeting_id: user.meeting_id,
      // meeting_passcode: user.meeting_passcode,
      password_expire: user.password_expire,
      user_note: user.user_note,
    };
  }

  // Check if there are no changes in the form data
  function checkForNoChange(obj1: any, obj2: any) {
    return Object.keys(obj1).every((key) => {
      // Check if key exists in both objects and values match (deep comparison for arrays)
      if (Array.isArray(obj1[key])) {
        return JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]);
      }
      return obj1[key] === obj2[key];
    });
  }

  // Update user details if changes are made
  const updateUser = async () => {
    const userDetails = await UserApiService.fetchUser(selectedUserNo);
    console.log(155, userDetails);
    console.log(1155, formData);

    if (formData.user_password !== formData.user_password_confirm) {
      return; // Prevent form submission if passwords don't match
    }

    if (checkForNoChange(normalizeUserData(formData), userDetails)) {
      alert("No changes made.");
      return;
    }

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
      // formData.meeting_id,
      // formData.meeting_passcode,
      formData.store_no
    );
    navigate(
      `/UserUpdateConfirm?selectedUserNo=${selectedUserNo}&userType=${userType}`
    );
  };

  if (!selectedUserNo || !userType) {
    return null;
  }

  return (
    <Box onSubmit={handleSubmit(updateUser)} component="form">
      <MenuHeader title={`${getUserTitle(userType)}情報`} />
      <Box className={classes.userContent}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="150px"
              label="登録日時"
              width="calc(45vw-100px)"
              value={convertToJST(formData.created_at) ?? ""}
            />
            <TextBoxWithLabel
              labelWidth="150px"
              label="更新日時"
              width="calc(45vw-100px)"
              value={convertToJST(formData.updated_at) ?? ""}
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={deleteStatus(formData.user_deleted ?? false)}
            />
          </Box>
        </Box>
        <Box className={classes.companyStoreInfo}>
          <Box className={classes.companyInfo}>
            <Box className={classes.descriptionLabel}>企業情報</Box>
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
              labelWidth="150px"
              label="企業No"
              width="calc(45vw-100px)"
              register={register}
              maxLength={128}
              value={formData.company_no}
              type="none"
            />
            <ValidationInputField
              isSubmitted={isSubmitted}
              name="company_name" // Name for the phonetic spelling
              labelWidth="150px"
              label="企業名"
              width="calc(45vw-100px)"
              register={register}
              maxLength={128}
              value={formData.company_name}
              type="none"
            />
          </Box>
          <Box className={classes.storeInfo}>
            <Box className={classes.descriptionLabel}>店舗情報</Box>
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
              labelWidth="150px"
              label="店舗No"
              width="calc(45vw-100px)"
              register={register}
              maxLength={128}
              value={formData.store_no}
              type="none"
            />
            <ValidationInputField
              isSubmitted={isSubmitted}
              name="store_name" // Name for the phonetic spelling
              labelWidth="150px"
              label="店舗名"
              width="calc(45vw-100px)"
              register={register}
              maxLength={128}
              value={formData.store_name}
              type="none"
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <TextBoxWithLabel
            labelWidth="125px"
            label="No"
            width="calc(35vw - 80px);"
            value={formData.user_no}
          />
          <Box className={classes.nameRow}>
            <Box className={classes.lastName}>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                name="user_name_last_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="calc(35vw - 80px);"
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
                width="calc(35vw - 80px);"
                register={register}
                maxLength={128}
                value={formData.user_name_last}
                onChange={handleChange}
              />
            </Box>
            <Box className={classes.firstName}>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
                name="user_name_first_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                width="calc(35vw - 80px);"
                register={register}
                maxLength={128}
                value={formData.user_name_first_furigana}
                onChange={handleChange}
              />
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                name="user_name_first" // Name for the phonetic spelling
                labelWidth="125px"
                width="calc(35vw - 80px);"
                register={register}
                maxLength={128}
                value={formData.user_name_first}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box className={classes.contactDetails}>
            <Box className={classes.mailAddress}>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="メールアドレス"
                name="mail_address" // Name for the phonetic spelling
                labelWidth="125px"
                width="calc(35vw - 80px);"
                register={register}
                maxLength={128}
                value={formData.mail_address}
                onChange={handleChange}
                type="email"
              />
            </Box>
            <Box className={classes.telDetails}>
              <Box className={classes.telNo}>
                <Typography component="span">
                  TEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>

                <NumberInput
                  width="5vw"
                  onChange={handleChange}
                  value={formData.tel1}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="5vw"
                  onChange={handleChange}
                  value={formData.tel2}
                  name="tel2"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="5vw"
                  onChange={handleChange}
                  value={formData.tel3}
                  name="tel3"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
              <Box className={classes.telExtension}>
                <Typography component="span">
                  内線&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>

                <NumberInput
                  width="5vw"
                  onChange={handleChange}
                  value={formData.tel_extension}
                  name="tel_extension"
                  maxLength={4}
                  margin="0 8px"
                />
              </Box>
            </Box>
          </Box>
          {userType === "interpreter" && (
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
          )}
        </Box>
        <Box className={classes.passwordMeetingInfo}>
          <Box className={classes.passwordInfo}>
            <Box className={classes.descriptionLabel}>パスワード情報</Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="有効期限"
              width="15vw"
              value={convertToJST(formData.password_expire) ?? ""}
            />
            <Box className={classes.passwordInput}>
              <ValidationInputField
                isSubmitted={isSubmitted}
                error={
                  formData.user_password !== formData.user_password_confirm &&
                  isSubmitted
                }
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
                error={
                  formData.user_password !== formData.user_password_confirm &&
                  isSubmitted
                }
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
          <Box className={classes.meetingInfo}>
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
        <Box className={classes.actionButtons}>
          <ButtonAtom onClick={handleBack} label="破棄" width="100px" />
          <ButtonAtom label="保存" width="100px" type="submit" />
        </Box>
      </Box>
    </Box>
  );
}

export default UserUpdate;
