// components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../Header/LoginHeader";
import LoginButton from "../../components/LV1/Button/LoginButton/LoginButton";

import TextWithBorder from "../../components/LV1/TextWithBorder/TextWithBorder";
import TextInput from "../../components/LV1/TextInput/TextInput";

import PasswordInput from "../../components/LV1/PasswordInput/PasswordInput";
import { Box } from "@mui/material";

import PasswordBoxWithLabel from "../../components/LV1/TextBox/PasswordBoxWithLabel";
import TextBoxWithLabel from "../../components/LV1/TextBox/TextBoxWithLabel";

// let homePage = "https://zoomsamplebackend.onrender.com"
// let homePage = "http://localhost:4000"

import { homePage } from "../../components/constants";
import { useTranslation } from "react-i18next";

const ResponderLogin: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const { t } = useTranslation();

  const handleButtonClick = () => {
    // setLoading(true); // Set loading to true when fetching starts
    fetch(`${homePage}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        // setUsers(data);
        console.log(45);
        console.log("Fetched users:", data); // Log the fetched users
        // setLoading(false); // Set loading to false after data is fetched
        const userData = data.find(
          (person: any) => person.name_of_institution === inputValue
        );

        if (userData) {
          // Perform some action here if found
          console.log(133, userData);
          navigate("/ResponderMenu", {
            state: {
              message: userData,
            },
          });
        } else {
          // Handle the case where no match is found
          console.log("No match found");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // setLoading(false); // Set loading to false if there's an error
      });
  };

  return (
    <Box>
      <LoginHeader />

      <Box className="login-layout">
        <Box className="login-container">
          {/* <Box className='login-id'>
            <TextWithBorder
              text="ユーザーＩＤ"
            />
            <TextInput
              value={inputValue}
              onChange={handleInputChange} />
          </Box> */}

          {/* <Box className="login-id">
            <TextWithBorder text="ユーザーＩＤ" />
            <TextInput value={inputValue} onChange={handleInputChange} />
          </Box>
          <Box className="login-id">
            <TextWithBorder text="パスワード" />
            <PasswordInput
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </Box> */}
          <TextBoxWithLabel
            label="ユーザーＩＤ"
            width="250px" // Uncomment to set a custom width
            labelWidth="100px"
            value={inputValue}
            onChange={handleInputChange}
            disabled={false}
          />
          <PasswordBoxWithLabel
            label="パスワード"
            width="250px" // Uncomment to set a custom width
            labelWidth="100px"
          />
          <Box className="login-button">
            <LoginButton onClick={handleButtonClick} label="ログイン" />
          </Box>
        </Box>

        {/* <main><button onClick={handleButtonClick}>{t('User Login')}</button></main> */}
      </Box>
    </Box>
  );
};

export default ResponderLogin;

// /*
//   X-Content-Type-Options: nosniff
//   Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
//   Referrer-Policy: no-referrer
