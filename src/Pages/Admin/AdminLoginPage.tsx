import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { homePage } from "../../components/constants";
import LoginButton from "../../components/LV1/Button/LoginButton/LoginButton";
import LoginHeader from "../../Header/LoginHeader";

import TextWithBorder from "../../components/LV1/TextWithBorder/TextWithBorder";
import TextInput from "../../components/LV1/TextInput/TextInput";
import PasswordInput from "../../components/LV1/PasswordInput/PasswordInput";
import { Box } from "@mui/material";

const AdminLogin: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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
          navigate("/AdminMenu", {
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
          <Box className="login-id">
            <TextWithBorder text="ユーザーＩＤ" />
            <TextInput value={inputValue} onChange={handleInputChange} />
          </Box>

          <Box className="login-id">
            <TextWithBorder text="パスワード" />
            <PasswordInput
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </Box>
        </Box>

        {/* <main><button onClick={handleButtonClick}>{t('User Login')}</button></main> */}
        <Box className="login-button">
          <LoginButton onClick={handleButtonClick} label="ログイン" />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
