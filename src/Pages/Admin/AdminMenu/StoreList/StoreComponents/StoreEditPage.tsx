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
import { useLocation, useNavigate } from "react-router-dom";
import { StoreInfoFormValues } from "../../../../../types/StoreTypes/StoreTypes";
import { convertToJST } from "../../../../../utils/utils";

function StoreListInfo() {
  const { state } = useLocation();
  const selectedStoreNo = state?.selectedStoreNo;
  //   console.log(115, selectedStoreNo);
  const [selectedCompanyNo, setSelectedCompanyNo] = useState<string>("");
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
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
    const fetchStore = async () => {
      if (!selectedStoreNo) return;
      console.log(148, selectedStoreNo);
      try {
        const storeDetails = await StoreApiService.fetchStore(selectedStoreNo);
        // console.log(148, storeDetails);

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

    fetchStore();
    // }, [selectedCompanyNo, setValue]);
  }, [selectedStoreNo]);

  const [textValue1, setTextValue1] = useState<string>("");
  const [textValue2, setTextValue2] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const [selectedOption, setSelectedOption] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
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
      formData.store_name,
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

  const [companyData, setCompanyData] = useState<any[]>([]);
  const [store_note, setNote] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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
    // setValue("company_no", company.company_no);
    // setValue("company_name", company.company_name);
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
    <Box
      className="store-list-navigate"
      onSubmit={handleSubmit(editStore)}
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
              value={convertToJST(formData.created_at ?? "")}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="300px" // Uncomment to set a custom width
              value={convertToJST(formData.updated_at ?? "")}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
          </Box>
          <Box className="delete-flag">
            <TextBoxWithLabel
              labelWidth="100px"
              label="削除フラグ"
              width="10vw" // Uncomment to set a custom width
              value={formData.store_delete}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
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

            <ValidationInputField
              name="company_no" // Name for the phonetic spelling
              labelWidth="125px"
              label="企業No"
              width="300px"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={formData.company_no}
              onChange={(e: any) => setSelectedCompanyNo(e.target.value)}
              // // disabled={true}
              type="none"
            />

            <ValidationInputField
              name="company_name" // Name for the phonetic spelling
              labelWidth="125px"
              label="企業名"
              width="300px"
              register={register}
              maxLength={128}
              // error={errors.company_no?.message} // Separate error for "furigana"
              value={formData.company_name}
              onChange={(e: any) => setSelectedCompanyName(e.target.value)}
              // // disabled={true}
              type="none"
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
              value={formData.store_no}
              //   disabled={false}
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box className="name-row">
              <Box>
                <ValidationInputField
                  label="フリガナ"
                  name="store_name_furigana" // Name for the phonetic spelling
                  labelWidth="125px"
                  width="300px"
                  register={register}
                  maxLength={128}
                  // error={errors.store_name_furigana?.message} // Separate error for "furigana"
                  value={formData.store_name_furigana}
                  onChange={handleChange}
                />
                <ValidationInputField
                  name="store_name" // Name for the phonetic spelling
                  labelWidth="125px"
                  label="店舗名"
                  width="300px"
                  register={register}
                  maxLength={128}
                  // error={errors.store_name?.message} // Separate error for "furigana"
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
                      //   // disabled={true}
                      value={formData.zip1}
                      onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip1"
                    />
                    <Typography component="span">-</Typography>
                    <NumberInput
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
                    width={150}
                    value={formData.pref}
                    onChange={handleSelectChange}
                    labelWidth="75px"
                    // disabled={true}
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
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.tel1}
                    name="tel1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.tel2}
                    name="tel2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    // disabled={true}
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
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.fax1}
                    name="fax1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    // disabled={true}
                    onChange={handleChange}
                    value={formData.fax2}
                    name="fax2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
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
  );
}

export default StoreListInfo;
