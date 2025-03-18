import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
import classes from "./styles/StoreList.module.scss";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";
import SelectableModal from "../../../LV1/SelectableModal/SelectableModal";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import NumberInput from "../../../LV1/NumberInput/NumberInput";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import JapanPrefectures from "../../../../JapanPrefectures/JapanPrefectures";
import { StoreApiService } from "../../../../api/apiService/store/store-api-service";
import ValidationInputField from "../../../LV1/ValidationInputField/ValidationInputField";
import { useForm } from "react-hook-form";
import { StoreCreateFormValues } from "../../../../types/StoreTypes/StoreTypes";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import { useNavigate } from "react-router-dom";

function StoreCreate() {
  const navigate = useNavigate();

  // State to manage store form data
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

  // State to store the list of companies
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);

  /**
   * Handles form submission and saves store info
   */
  const createStore = async () => {
    try {
      const response = await StoreApiService.createStore(
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
      navigate(`/StoreInfo?selectedStoreNo=${response.store_no}`);
    } catch (error) {
      alert("error");
      console.error("Error saving company:", error);
    }
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted },
  } = useForm<StoreCreateFormValues>();

  // Fetch company data when the component mounts
  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  // Function to fetch the list of companies from the API
  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(144, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Function to update form state dynamically
  const updateFormData = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to handle company selection and update form state
  const handleCompanySelect = (company: CompanyInfo) => {
    const { company_no, company_name } = company;

    updateFormData("company_no", company_no);
    updateFormData("company_name", company_name);

    setValue("company_no", company_no);
    setValue("company_name", company_name);
  };

  // Function to handle changes in input fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };

  // Function to handle changes in a select dropdown
  const handleSelectChange = (value: string) => {
    updateFormData("pref", value);
  };

  // Function to navigate to the Store List page
  const navigateToStoreList = () => {
    navigate("/StoreList");
  };

  return (
    <Box onSubmit={handleSubmit(createStore)} component="form">
      <MenuHeader title="店舗情報" />
      <Box className={classes.storeCreateContainer}>
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
              width="10vw"
            />
          </Box>
        </Box>
        <Box className={classes.companyInfo}>
          <Box className={classes.descriptionLabel}>企業情報</Box>
          <Box>
            <SelectableModal
              title="企業検索"
              options={companyData}
              onOptionSelect={handleCompanySelect}
              label="企業検索"
              valueKey="company_no"
              displayKey="company_name"
            />

            <ValidationInputField
              isSubmitted={isSubmitted}
              name="company_no"
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
              name="company_name"
              labelWidth="125px"
              label="企業名"
              width="30vw"
              register={register}
              maxLength={128}
              value={formData.company_name}
              type="none"
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <Box>
            <TextBoxWithLabel labelWidth="125px" label="店舗No" width="30vw" />
            <Box className={classes.nameRow}>
              <Box>
                <ValidationInputField
                  isSubmitted={isSubmitted}
                  label="フリガナ"
                  name="store_name_furigana"
                  labelWidth="125px"
                  width="30vw"
                  register={register}
                  maxLength={128}
                  value={formData.store_name_furigana}
                  onChange={handleChange}
                />
                <ValidationInputField
                  isSubmitted={isSubmitted}
                  name="store_name"
                  labelWidth="125px"
                  label="店舗名"
                  width="30vw"
                  register={register}
                  maxLength={128}
                  value={formData.store_name}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box className={classes.storeDetails}>
              <Box className={classes.addressContainer}>
                <Box className={classes.addressLabel}>住所</Box>
                <Box className={classes.addressDetails}>
                  <Box>
                    <Typography
                      component="span"
                      className={classes.pinCodeLabel}
                    >
                      〒
                    </Typography>

                    <NumberInput
                      width="5vw"
                      value={formData.zip1}
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip1"
                    />
                    <Typography component="span">-</Typography>
                    <NumberInput
                      width="5vw"
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
                    width={"15vw"}
                    value={formData.pref}
                    onChange={handleSelectChange}
                    labelWidth="75px"
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="市区町村"
                    width="30vw"
                    onChange={handleChange}
                    value={formData.city}
                    name="city"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="番地"
                    width="30vw"
                    onChange={handleChange}
                    value={formData.street}
                    name="street"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="建物名等"
                    width="30vw"
                    onChange={handleChange}
                    value={formData.building_name}
                    name="building_name"
                    disabled={false}
                  />
                </Box>
              </Box>
              <Box className={classes.contactDetails}>
                <Box>
                  <Typography component="span" className={classes.telLabel}>
                    TEL
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
                <Box>
                  <Typography component="span" className={classes.faxLabel}>
                    FAX
                  </Typography>

                  <NumberInput
                    width="5vw"
                    onChange={handleChange}
                    value={formData.fax1}
                    name="fax1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
                    onChange={handleChange}
                    value={formData.fax2}
                    name="fax2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
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
        <Box className={classes.actionButtons}>
          <ButtonAtom
            onClick={navigateToStoreList}
            label="閉じる"
            width="100px"
          />
          <ButtonAtom label="保存" width="100px" type="submit" />
        </Box>
      </Box>
    </Box>
  );
}

export default StoreCreate;
