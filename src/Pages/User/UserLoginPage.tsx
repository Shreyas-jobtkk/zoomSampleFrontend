// // components/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LoginHeader from '../../Header/LoginHeader';
// import LoginButton from '../../components/LV1/Button/LoginButton/LoginButton';

// import TextWithBorder from '../../components/LV1/TextWithBorder/TextWithBorder';
// import TextInput from '../../components/LV1/TextInput/TextInput';

// import PasswordInput from '../../components/LV1/PasswordInput/PasswordInput';

// // let homePage = "https://zoomsamplebackend.onrender.com"
// // let homePage = "http://localhost:4000"

// import { homePage } from '../../components/constants';
// import { useTranslation } from 'react-i18next';

// const UserLogin: React.FC = () => {

//   const [inputValue, setInputValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPasswordValue(e.target.value);
//   };


//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

  

//   const { t } = useTranslation();


//   const handleButtonClick = () => {
//     // setLoading(true); // Set loading to true when fetching starts
//     fetch(`${homePage}/api/users`)
//       .then(response => response.json())
//       .then(data => {
//         // setUsers(data);
//         console.log(45);
//         console.log('Fetched users:', data); // Log the fetched users
//         // setLoading(false); // Set loading to false after data is fetched
//         const userData = data.find((person: any) => person.name_of_institution === inputValue);

//         if (userData) {
//           // Perform some action here if found
//           console.log(133, userData);
//           navigate('/UserMenu', {
//             state: {
//               message: userData
//             }
//           });
//         } else {
//           // Handle the case where no match is found
//           console.log('No match found');
//         }

//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//         // setLoading(false); // Set loading to false if there's an error
//       });
//   };

//   return (
//     <div>
//       <LoginHeader />
      
//       <div className='login-layout'>
//         <div className='login-container' >
//         {/* <div className='login-id'>
//             <TextWithBorder
//               text="ユーザーＩＤ"
//             />
//             <TextInput
//               value={inputValue}
//               onChange={handleInputChange} />
//           </div> */}
          

//           <div className='login-id'>
//             <TextWithBorder
//               text="ユーザーＩＤ"
//             />
//             <TextInput
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className='login-id'>
//             <TextWithBorder
//               text="パスワード"
//             />
//             <PasswordInput
//               value={passwordValue}
//               onChange={handlePasswordChange}
//             />
//           </div>
//         </div>
        

//         {/* <main><button onClick={handleButtonClick}>{t('User Login')}</button></main> */}
//         <div className='login-button'>
//           <LoginButton
//             onClick={handleButtonClick}
//             label="ログイン"
//           />
//         </div>

//       </div>

//     </div>
//   );
// };

// export default UserLogin;

// // /*
// //   X-Content-Type-Options: nosniff
// //   Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
// //   Referrer-Policy: no-referrer
