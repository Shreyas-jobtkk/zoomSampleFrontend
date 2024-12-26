import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginHeader from "../../Header/LoginHeader";
import LoginButton from "../../components/LV1/Button/LoginButton/LoginButton";
import { Box } from "@mui/material";
import TextBoxWithLabel from "../../components/LV1/TextBox/TextBoxWithLabel";
import PasswordBoxWithLabel from "../../components/LV1/TextBox/PasswordBoxWithLabel";

// let homePage = "https://zoomsamplebackend.onrender.com"
// let homePage = "http://localhost:4000"

import { homePage } from "../../components/constants";

function TranslatorLogin() {
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
        {/* <Box className="login-button">
          <LoginButton onClick={handleButtonClick} label="ログイン" />
        </Box> */}
      </Box>
    </Box>
  );
}

export default TranslatorLogin;
