// components/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../LV3/Header/LoginHeader/LoginHeader";
import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import { Box } from "@mui/material";
import { UserApiService } from "../../../api/apiService/user/user-api-service";
import ValidationInputField from "../../LV1/ValidationInputField/ValidationInputField";
import { useForm } from "react-hook-form";
import { UserAuth } from "../../../types/UserTypes/UserTypes";
import classes from "../../../styles/Login.module.scss";

const InterpreterLogin: React.FC = () => {
  const [formData, setFormData] = useState<UserAuth>({
    mail_address: "",
    user_password: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle input changes for mail_address and user_password
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch users list and check credentials
  const administratorAuth = async (
    mail_address: string,
    user_password: string
  ) => {
    try {
      console.log(455);
      const response = await UserApiService.administratorAuth(
        mail_address,
        user_password
      );

      if (response.success) {
        // Successful login
        console.log("Login successful", response.user_no);
        sessionStorage.setItem("adminNo", response.user_no);
        navigate("/AdminMenu", {
          state: {
            userNo: response.user_no,
          },
        });
      } else {
        // Handle authentication errors
        setError("invalid credentialsss.");
      }
    } catch (error) {
      // alert("server");
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  // Handle form submission
  const checkAuth = () => {
    const { mail_address, user_password } = formData;
    administratorAuth(mail_address, user_password);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<UserAuth>();

  return (
    <Box>
      <LoginHeader />
      <Box>
        <Box
          className={classes.loginContainer}
          onSubmit={handleSubmit(checkAuth)}
          component="form"
        >
          <ValidationInputField
            isSubmitted={isSubmitted}
            label="ユーザーＩＤ"
            width="250px" // Uncomment to set a custom width
            labelWidth="100px"
            name="mail_address"
            value={formData.mail_address}
            onChange={handleInputChange} // Update mail_address state on change
            register={register}
          />
          <ValidationInputField
            isSubmitted={isSubmitted}
            label="パスワード"
            width="250px" // Uncomment to set a custom width
            labelWidth="100px"
            name="user_password"
            value={formData.user_password} // Use state value for user_password
            onChange={handleInputChange} // Update user_password state on change
            register={register}
            type="password"
          />
          {error && <Box color="red">{error}</Box>}{" "}
          <Box className={classes.loginButton}>
            <ButtonAtom label="ログイン" type="submit" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterpreterLogin;
