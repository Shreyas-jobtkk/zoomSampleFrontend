import MenuHeader from "../../../LV3/Header/MenuHeader/MenuHeader";
import TextBoxWithLabel from "../../../LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../LV1/Button/ButtonAtom/ButtonAtom";
// import "../StoreStyles/StoreList.scss";
// import ValidationTextArea from "../../../../Pages/LV1/ValidationTextArea/ValidationTextArea";
import TextAreaWithLabel from "../../../LV1/TextArea/TextAreaWithLabel";
// import { fetchCompaniesAll } from "../../../../api/apiService/company/company";
import SelectableModal from "../../../LV1/SelectableModal/SelectableModal";
import { CompanyApiService } from "../../../../api/apiService/company/company-api-service";
import NumberInput from "../../../LV1/NumberInput/NumberInput";
import SelectOption from "../../../LV1/SelectOption/SelectOption";
import JapanPrefectures from "../../../../JapanPrefectures/JapanPrefectures";
import { StoreApiService } from "../../../../api/apiService/store/store-api-service";
import ValidationInputField from "../../../LV1/ValidationInputField/ValidationInputField";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreInfoFormValues } from "../../../../types/StoreTypes/StoreTypes";
import { convertToJST } from "../../../../utils/utils";
import { CompanyInfo } from "../../../../types/CompanyTypes/CompanyTypes";
import classes from "./styles/StoreList.module.scss";

function StoreUpdate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract selectedStoreNo from URL parameters and convert it to a number
  const selectedStoreNo = Number(searchParams.get("selectedStoreNo"));

  // State to store the list of companies
  const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);

  // Define the initial form state
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
    if (!selectedStoreNo) {
      navigate("/BadRequest");
    }
    fetchStore();
  }, [selectedStoreNo]);

  const fetchStore = async () => {
    try {
      // Fetch store details from API
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

  // Normalize store data for comparison before updating
  function normalizeStoreData(store: any) {
    return {
      store_no: store.store_no,
      company_no: store.company_no,
      store_name: store.store_name,
      store_name_furigana: store.store_name_furigana,
      zip: `${store.zip1}-${store.zip2}`, // Merge zip1 and zip2
      tel: `${store.tel1}-${store.tel2}-${store.tel3}`, // Merge tel parts
      fax: `${store.fax1}-${store.fax2}-${store.fax3}`, // Merge fax parts
      store_note: store.store_note,
      pref: store.pref,
      city: store.city,
      street: store.street,
      building_name: store.building_name,
      created_at: store.created_at,
      updated_at: store.updated_at,
      store_delete: store.store_delete,
    };
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitted, isValid },
  } = useForm<StoreInfoFormValues>();

  useEffect(() => {
    fetchCompaniesListData();
  }, []);

  // Check if two objects have identical values
  function checkForNoChange(obj1: any, obj2: any) {
    return Object.keys(obj1).every((key) => {
      // Check if key exists in both objects and values match (deep comparison for arrays)
      if (Array.isArray(obj1[key])) {
        return JSON.stringify(obj1[key]) === JSON.stringify(obj2[key]);
      }
      return obj1[key] === obj2[key];
    });
  }

  // Handle update action
  const handleUpdate = async () => {
    const storeDetails = await StoreApiService.fetchStore(selectedStoreNo);

    if (checkForNoChange(normalizeStoreData(formData), storeDetails)) {
      alert("No changes made.");
      return;
    }

    // Proceed with the update if changes are detected
    await StoreApiService.updateStore(
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
    navigate(`/StoreUpdateConfirm?selectedStoreNo=${selectedStoreNo}`);
  };

  // Fetch company list from API
  const fetchCompaniesListData = async () => {
    try {
      const response = await CompanyApiService.fetchCompaniesNameDetails();
      console.log(144, response);
      setCompanyData(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Handle selection of a company from the list
  const handleCompanySelect = (company: CompanyInfo) => {
    console.log(147, isValid);

    setFormData((prevData) => ({
      ...prevData,
      company_no: company.company_no,
      company_name: company.company_name,
    }));
  };

  // Handle back button action
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle text input changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select dropdown change
  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      pref: value,
    }));
  };

  if (!selectedStoreNo) {
    return null;
  }

  return (
    <Box onSubmit={handleSubmit(handleUpdate)} component="form">
      <MenuHeader title="店舗情報" />
      <Box className={classes.storeEditContainer}>
        <Box className={classes.timeDetailsDeleteFlag}>
          <Box className={classes.timeDetails}>
            <TextBoxWithLabel
              labelWidth="125px"
              label="登録日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.created_at) ?? ""}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="30vw" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at) ?? ""}
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
          maxLength={64}
          register={register}
          name="store_note"
          // disabled={true}
        />
        <Box className={classes.actionButtons}>
          <ButtonAtom onClick={handleBack} label="破棄" width="100px" />
          {/* <ButtonAtom onClick={createStore} label="編集" width="100px" /> */}
          <ButtonAtom
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

export default StoreUpdate;
