// import MenuHeader from "../../../../../Pages/LV3/Header/MenuHeader";
import MenuHeader from "../../../components/LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../components/LV1/ButtonAtom/ButtonAtom";
import classes from "../../../styles/User.module.scss";
import NumberInput from "../../../components/LV1/NumberInput/NumberInput";
import ValidationInputField from "../../../components/LV1/Validation/ValidationInputField";
import SelectableModal from "../../../components/LV1/SelectableModal/SelectableModal";
import { useForm } from "react-hook-form";
import { CompanyApiService } from "../../../api/apiService/company/company-api-service";
import { StoreApiService } from "../../../api/apiService/store/store-api-service";
import { LanguageApiService } from "../../../api/apiService/languages/languages-api-service";
import ValidateSelectMultipleOptions from "../../../components/LV1/Validation/validateMultipleOptions";
import TextAreaWithLabel from "../../../components/LV1/TextArea/TextAreaWithLabel";
import { UserCreateFormValues } from "../../../types/UserTypes";
import { UserApiService } from "../../../api/apiService/user/user-api-service";
import { CompanyInfo } from "../../../types/CompanyTypes";
import { StoreInfo } from "../../../types/StoreTypes";
import { LanguageInfo } from "../../../types/LanguageTypes";
import { getUserTitle } from "../../../utils/userTitle"; // Adjust the path as necessary
import { useNavigate, useSearchParams } from "react-router-dom";

function UserCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType: string = searchParams.get("userType") as string;

  // State hooks
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);
  const [languagesSupport, setLanguagesSupport] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [isStoresExist, setIsStoresExist] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );
  const [isCompanyNoEmpty, setCompanyNoIsEmpty] = useState<boolean>(true);

  // Function to navigate to the appropriate user list based on user type
  const navigateToUserList = () => {
    if (userType == "contractor") {
      navigate("/Admin/User/List/Contractor");
    }

    if (userType == "interpreter") {
      navigate("/Admin/User/List/Interpreters");
    }
    if (userType == "administrator") {
      navigate("/Admin/User/List/Administrator");
    }
  };

  // Handle changes in input fields and update form data
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };

  // Handler for onChange to update the selected options
  const handleSelectChange = (value: (string | number)[]) => {
    console.log(655, value);
    setSelectedOptions(value); // Update the state with selected options

    setFormData((prevData) => ({
      ...prevData,
      translate_languages: value, // Convert array to a string if needed
    }));
  };

  // State hook to manage form data
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
    translate_languages: null,
    password_expire: "",
    user_password: "",
    user_password_confirm: "",
    // meeting_id: null,
    // meeting_passcode: null,
    user_note: "",
  });

  // Destructure form methods from react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<UserCreateFormValues>();

  // Fetch company and language data on component mount
  useEffect(() => {
    fetchCompaniesNames();
    fetchLanguagesAllNames();
  }, []);

  // Fetch all language names for the form
  const fetchLanguagesAllNames = async () => {
    try {
      let response = await LanguageApiService.fetchLanguagesAllNames();

      console.log(177, response);

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

  // Fetch company names for the form
  const fetchCompaniesNames = async () => {
    // console.log(244, await LanguageApiService.fetchLanguagesAllNames());
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      setCompanyData(response);

      // const response = await axios.get(`${apiUrl}/company`);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch store names based on selected company
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

  // Use effect to fetch store names when company number is set
  useEffect(() => {
    if (!isCompanyNoEmpty) {
      fetchStoreNames();
    }
  }, [formData.company_no]);

  // Update form data for a specific field
  const updateFormData = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle company selection from dropdown
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

  // Handle store selection from dropdown
  const handleStoreSelect = (store: StoreInfo) => {
    const { store_no, store_name } = store;

    updateFormData("store_no", store_no);
    updateFormData("store_name", store_name);

    setValue("store_no", store_no);
    setValue("store_name", store_name);
  };

  // Create new user by submitting the form
  const createUser = async () => {
    if (formData.user_password !== formData.user_password_confirm) {
      return; // Prevent form submission if passwords don't match
    }

    try {
      const response = await UserApiService.createUser(
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
        userType,
        formData.user_note,
        formData.translate_languages,
        new Date()
        // formData.meeting_id,
        // formData.meeting_passcode
      );
      // navigate(
      //   `/Admin/User/Info?selectedUserNo=${response.user_no}&userType=${userType}`
      // );
      navigate(
        `/Admin/User/UpdateConfirm?selectedUserNo=${response.user_no}&userType=${userType}`
      );
      alert("saved");
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  if (!userType) {
    return null;
  }

  return (
    <Box onSubmit={handleSubmit(createUser)} component="form">
      <MenuHeader title={`${getUserTitle(userType)}情報`} />
      <Box className={classes.userContent}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw"
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw"
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
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
              disabled={!(!isCompanyNoEmpty && isStoresExist)}
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
          />

          <Box className={classes.nameRow}>
            <Box className={classes.lastName}>
              <ValidationInputField
                isSubmitted={isSubmitted}
                label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;セイ"
                name="user_name_last_furigana" // Name for the phonetic spelling
                labelWidth="125px"
                // width="30vw"
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
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メイ"
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
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
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
                  width="calc(5vw - 10px)"
                  onChange={handleChange}
                  value={formData.tel1}
                  name="tel1"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="calc(5vw - 10px)"
                  onChange={handleChange}
                  value={formData.tel2}
                  name="tel2"
                  maxLength={4}
                  margin="0 8px"
                />
                <Typography component="span">-</Typography>
                <NumberInput
                  width="calc(5vw - 10px)"
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
                  width="calc(5vw - 10px)"
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
              value={selectedOptions}
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
              value={formData.password_expire}
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
            </Box>
          </Box>
          <Box className={classes.meetingInfo}>
            <TextAreaWithLabel
              label="備考"
              value={formData.user_note}
              register={register}
              onChange={handleChange}
              margin="2vh 1vw 0 1vw"
              maxLength={64}
              name="user_note"
            />
          </Box>
        </Box>
        <Box className={classes.actionButtons}>
          <ButtonAtom
            onClick={navigateToUserList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom label="保存" width="100px" type="submit" />
        </Box>
      </Box>
    </Box>
  );
}

export default UserCreate;
