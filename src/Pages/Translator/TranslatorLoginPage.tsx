import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginHeader from "../../Header/LoginHeader";
import TextWithBorder from "../../components/LV1/TextWithBorder/TextWithBorder";
import TextInput from "../../components/LV1/TextInput/TextInput";
import PasswordInput from "../../components/LV1/PasswordInput/PasswordInput";
import LoginButton from "../../components/LV1/Button/LoginButton/LoginButton";
import { Box } from "@mui/material";

// let homePage = "https://zoomsamplebackend.onrender.com"
// let homePage = "http://localhost:4000"

import { homePage } from "../../components/constants";

function TranslatorLogin() {
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // setLoading(true); // Set loading to true when fetching starts
    fetch(`${homePage}/api/terminals`)
      .then((response) => response.json())
      .then((data) => {
        // setUsers(data);
        console.log(45);
        console.log("Fetched users:", data); // Log the fetched users
        // setLoading(false); // Set loading to false after data is fetched
        const terminalData = data.find(
          (person: any) => person.person_name === inputValue
        );
        console.log(134, terminalData);

        if (terminalData) {
          // Perform some action here if found
          console.log(133, terminalData);
          navigate("/TranslatorMenu", {
            state: {
              message: terminalData,
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
}

export default TranslatorLogin;
