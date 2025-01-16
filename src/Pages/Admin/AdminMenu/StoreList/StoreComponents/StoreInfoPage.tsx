import MenuHeader from "../../../../../components/LV3/Header/MenuHeader";
import TextBoxWithLabel from "../../../../../components/LV1/TextBox/TextBoxWithLabel";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ButtonAtom from "../../../../../components/LV1/Button/ButtonAtom/ButtonAtom";
// import "../StoreStyles/StoreList.scss";
import TextAreaWithLabel from "../../../../../components/LV1/TextArea/TextAreaWithLabel";
import NumberInput from "../../../../../components/LV1/NumberInput/NumberInput";
import SelectOption from "../../../../../components/LV1/SelectOption/SelectOption";
import JapanPrefectures from "../JapanPrefectures/JapanPrefectures";
import { StoreApiService } from "../../../../../api/apiService/store/store-api-service";
import { useLocation } from "react-router-dom";
import { StoreInfoFormValues } from "../../../../../types/StoreTypes/StoreTypes";
import { convertToJST } from "../../../../../utils/utils";

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
      console.log(147, storeDetails);

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
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  return (
    <Box className="store-list-navigate">
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
            <ButtonAtom label="企業検索" disabled={true} />

            <TextBoxWithLabel
              label="企業No"
              labelWidth="125px"
              width="300px" // Uncomment to set a custom width
              value={formData.company_no}
            />

            <TextBoxWithLabel
              labelWidth="125px"
              label="更新日時"
              width="300px" // Uncomment to set a custom width
              value={formData.company_name}
              //  onChange={(e: any) => setSelectedCompanyName(e.target.value)}
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
              //  onChange={(e: any) => setTextValue1(e.target.value)}
            />
            <Box className="name-row">
              <Box>
                <TextBoxWithLabel
                  labelWidth="125px"
                  label="フリガナ"
                  width="300px" // Uncomment to set a custom width
                  value={formData.store_name_furigana}
                  //  onChange={handleChange}
                />

                <TextBoxWithLabel
                  labelWidth="125px"
                  label="店舗名"
                  width="300px" // Uncomment to set a custom width
                  value={formData.store_name}
                  //  onChange={handleChange}
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
                      disabled={true}
                      value={formData.zip1}
                      //  onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                      name="zip1"
                    />
                    <Typography component="span">-</Typography>
                    <NumberInput
                      disabled={true}
                      value={formData.zip2}
                      name="zip2"
                      //  onChange={handleChange}
                      maxLength={4}
                      margin="0 8px"
                    />
                  </Box>

                  <SelectOption
                    label="都道府県"
                    options={JapanPrefectures}
                    width={150}
                    value={formData.pref}
                    // onChange={handleSelectChange}
                    labelWidth="75px"
                    disabled={true}
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="市区町村"
                    width="300px" // Uncomment to set a custom width
                    //  onChange={handleChange}
                    value={formData.city}
                    name="city"
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="番地"
                    width="300px" // Uncomment to set a custom width
                    //  onChange={handleChange}
                    value={formData.street}
                    name="street"
                  />
                  <TextBoxWithLabel
                    labelWidth="75px"
                    label="建物名等"
                    width="300px" // Uncomment to set a custom width
                    //  onChange={handleChange}
                    value={formData.building_name}
                    name="building_name"
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
                    disabled={true}
                    //  onChange={handleChange}
                    value={formData.tel1}
                    name="tel1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    disabled={true}
                    //  onChange={handleChange}
                    value={formData.tel2}
                    name="tel2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    disabled={true}
                    //  onChange={handleChange}
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
                    disabled={true}
                    //  onChange={handleChange}
                    value={formData.fax1}
                    name="fax1"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    disabled={true}
                    //  onChange={handleChange}
                    value={formData.fax2}
                    name="fax2"
                    maxLength={4}
                    margin="0 8px"
                  />
                  <Typography component="span">-</Typography>
                  <NumberInput
                    disabled={true}
                    //  onChange={handleChange}
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
          //  onChange={handleChange}
          label="備考"
          margin="0 0 0 40vw"
          labelWidth="25px"
          maxLength={5}
          name="store_note"
          disabled={true}
        />
        <ButtonAtom label="閉じる" width="100px" />
        {/* <ButtonAtom onClick={createStore} label="編集" width="100px" /> */}
      </Box>
    </Box>
  );
}

export default StoreListInfo;
