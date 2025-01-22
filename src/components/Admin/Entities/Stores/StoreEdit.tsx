import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
// import "../StoreStyles/StoreList.scss";
// import ValidationTextArea from "../../../../components/LV1/ValidationTextArea/ValidationTextArea";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";
// import { fetchCompaniesAll } from "../../../../api/apiService/company/company";
import SelectableModal from "../../../LV1/SelectableModal/SelectableModal";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import NumberInput from "../../../LV1/NumberInput/NumberInput";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import JapanPrefectures from "../../../../JapanPrefectures/JapanPrefectures";
import { StoreApiService } from "../../../../api/apiService/store/store-api-service";
import ValidationInputField from "../../../LV1/ValidationInputField/ValidationInputField";
import ValidationButton from "../../../LV1/Button/ValidationButton/ValidationButton";
// import { StoreCreateFormValues } from "../../../../../CompanyTypes/CompanyTypes";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { StoreInfoFormValues } from "../../../../types/StoreTypes/StoreTypes";
import { convertToJST } from "../../../../utils/utils";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import classes from "./styles/StoreList.module.scss";

function StoreListInfo() {
  const { state } = useLocation();
  const selectedStoreNo = state?.selectedStoreNo;
  const [formData, setFormData] = useState<StoreInfoFormValues>({
    company_no: "",
    company_name: "",
    store_name: "",
    store_no: "",
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
    updated_at: "",
    created_at: "",
    store_delete: false,
  });

  useEffect(() => {
    fetchStore();
  }, [selectedStoreNo]);

  const fetchStore = async () => {
    if (!selectedStoreNo) return;
    console.log(148, selectedStoreNo);
    try {
      const storeDetails = await StoreApiService.fetchStore(selectedStoreNo);
      const [zip1, zip2] = storeDetails.zip.split("-");
      const [tel1, tel2, tel3] = storeDetails.tel.split("-");
      const [fax1, fax2, fax3] = storeDetails.fax.split("-");

      // Update the formData state with the values
      setFormData({
        company_no: storeDetails.company_no,
        company_name: storeDetails.company_name,
        store_name: storeDetails.store_name,
        store_no: storeDetails.store_no,
        store_name_furigana: storeDetails.store_name_furigana,
        zip1,
        zip2,
        pref: storeDetails.pref,
        city: storeDetails.city,
        street: storeDetails.street,
        building_name: storeDetails.building_name,
        tel1,
        tel2,
        tel3,
        fax1,
        fax2,
        fax3,
        store_note: storeDetails.store_note,
        updated_at: storeDetails.updated_at,
        created_at: storeDetails.created_at,
        store_delete: storeDetails.store_delete,
      });

      setValue("company_no", storeDetails.company_no);
      setValue("company_name", storeDetails.company_name);
      setValue("store_name", storeDetails.store_name);
      setValue("store_name_furigana", storeDetails.store_name_furigana);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted, isValid },
  } = useForm<StoreInfoFormValues>();

  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  const editStore = () => {
    console.log(1123, formData);
    StoreApiService.updateStore(
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
      formData.store_note,
      formData.store_no
    );
  };

  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(144, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
  const handleCompanySelect = (company: CompanyInfo) => {
    console.log(147, isValid);

    setFormData((prevData) => ({
      ...prevData,
      company_no: company.company_no,
      company_name: company.company_name,
    }));
  };

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
    <Box onSubmit={handleSubmit(editStore)} component="form">
      <MenuHeader title="店舗情報" />
      <Box className={classes.storeEditContainer}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.created_at ?? "")}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at ?? "")}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={formData.store_delete}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
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
              // // disabled={true}
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
              // onChange={(e: any) => setSelectedCompanyName(e.target.value)}
              // // disabled={true}
              type="none"
            />
          </Box>
        </Box>
        <Box className={classes.basicInfo}>
          <Box className={classes.descriptionLabel}>基本情報</Box>
          <Box>
            <TextBoxWithLabel
              labelWidth="125px"
              label="店舗No"
              width="30vw" // Uncomment to set a custom width
              value={formData.store_no}
              //   disabled={false}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box className={classes.nameRow}>
              <Box>
                <ValidationInputField
                  isSubmitted={isSubmitted}
                  label="フリガナ"
                  name="store_name_furigana" // Name for the phonetic spelling
                  labelWidth="125px"
                  width="30vw"
                  register={register}
                  maxLength={128}
                  // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                  value={formData.store_name_furigana}
                  onChange={handleChange}
                />
                <ValidationInputField
                  isSubmitted={isSubmitted}
                  name="store_name" // Name for the phonetic spelling
                  labelWidth="125px"
                  label="店舗名"
                  width="30vw"
                  register={register}
                  maxLength={128}
                  // error={errors.store_name?.message} // Separate error for "furigana"
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
                      //   // disabled={true}
                      value={formData.zip1}
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip1"
                    />
                    <Typography component="span">-</Typography>
                    <NumberInput
                      width="5vw"
                      //   // disabled={true}
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
                    // disabled={true}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="市区町村"
                    width="30vw" // Uncomment to set a custom width
                    onChange={handleChange}
                    value={formData.city}
                    name="city"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="番地"
                    width="30vw" // Uncomment to set a custom width
                    onChange={handleChange}
                    value={formData.street}
                    name="street"
                    disabled={false}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="建物名等"
                    width="30vw" // Uncomment to set a custom width
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
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.tel1}
                    name="tel1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.tel2}
                    name="tel2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
                    // disabled={true}
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
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.fax1}
                    name="fax1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.fax2}
                    name="fax2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    width="5vw"
                    // disabled={true}
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
          // disabled={true}
        />
        <Box className={classes.actionButtons}>
          <ButtonAtom label="破棄" width="100px" />
          {/* <ButtonAtom onClick={createStore} label="編集" width="100px" /> */}
          <ValidationButton
            label="編集"
            width="100px"
            //   onClick={saveCompanyInfo}
            type="submit"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default StoreListInfo;
