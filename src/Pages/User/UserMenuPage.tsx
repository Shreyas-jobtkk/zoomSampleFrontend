// import "../../App.css";
// import { ZoomMtg } from "@zoom/meetingsdk";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import io from "socket.io-client";
import ringtone from "../../components/ringtone.mp3";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { homePage } from "../../components/constants";
import MenuHeader from "../../components/LV3/Header/MenuHeader";
import RadioButtonGroupRound from "../../components/LV1/RadioButton/RadioButtonGroupRound";
import { useTranslation } from "react-i18next";
import "../../../src/i18n.js";
import ButtonAtom from "../../components/LV1/Button/ButtonAtom/ButtonAtom";

// let homePage = "https://zoomsamplebackend.onrender.com"
// let homePage = "http://localhost:4000"
// Connect to the socket.io server
const socket = io(homePage);
let zoomJoinURL: string;
let uniqueId: any = null;

function UserMenu() {
  const location = useLocation();
  const userData = location.state?.message;
  // const [language, setLanguage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "japanese";
  });
  const { t, i18n } = useTranslation();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    console.log(144, event.target.value);
    if (event.target.value === "japanese") {
      i18n.changeLanguage("ja"); // Change to Japanese
    } else if (event.target.value === "hiragana") {
      i18n.changeLanguage("jaKana"); // Change to Japanese
    } else {
      i18n.changeLanguage("en"); // Change to English
    }
    // setSelectedValue(newValue);
    localStorage.setItem("selectedLanguage", event.target.value); // Save to localStorage
  };

  useEffect(() => {
    // Retrieve the selected value from localStorage on mount
    const savedValue = localStorage.getItem("selectedLanguage");
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []);

  const radioOptions = [
    { label: "日本語", value: "japanese" },
    { label: "English", value: "english" },
    { label: "ひらがな", value: "hiragana" },
    { label: "हिन्दी", value: "hindi" },
    { label: "नेपाली", value: "nepali" },
    { label: "Tiếng Việt", value: "vietnamese" },
    { label: "汉语", value: "chinese" },
    { label: "한국어", value: "korean" },
  ];

  useEffect(() => {
    // // Handle browser/tab close
    // const handleBeforeUnload = () => {
    //     //   sendActivityStatus("inactive"); // User is closing the page (inactive)
    //     // event.preventDefault();
    //     if (typeof uniqueId == 'string') {
    //         const data = {
    //             dial: 'disconnected', // Replace with actual value
    //             institutionid: 'institutionid',
    //             uniqueId: uniqueId,
    //         };
    //         console.log(3443, data)
    //         // Emit the 'dataFromFrontend' event to the server
    //         // socket.emit('dataFromFrontend', data);
    //     }
    // };
    // // Send initial API call to mark user as active when component mounts
    // // sendActivityStatus("active");
    // // Add event listener to detect when the browser or tab is closed
    // window.addEventListener('beforeunload', handleBeforeUnload);
    // // Cleanup event listener when component unmounts
    // return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
  }, []);

  socket.on("url", (meetingData) => {
    console.log(133, meetingData.url);
    zoomJoinURL = meetingData.url;
    // setTimeout(() => {
    //     window.location.href = zoomJoinURL;
    //     // window.open(zoomJoinURL, '_blank');
    //   }, 1000);  // 1 second delay
  });

  const [ringingTime, setRingingTime] = useState(0);
  const intervalRef: MutableRefObject<number | null> = useRef(null);

  // Function to handle button press
  const playRingtone = () => {
    if (!selectedValue) {
      alert("Please select a language before joining a meeting.");
      return;
    }
    // uniqueId = uuidv4()
    uniqueId = uuidv4();

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true); // Set state to indicate ringtone is playing
    }

    // Start the interval to count ringing time in milliseconds
    intervalRef.current = window.setInterval(() => {
      setRingingTime((prevTime) => prevTime + 10); // Increment by 10 ms
    }, 10);
  };

  const stopRingtone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback to the start
      setIsPlaying(false); // Set state to indicate ringtone has stopped
    }

    // Stop the interval and reset ringing time
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRingingTime(0);

    // console.log(144, uniqueId)
    // // const data = "disconnected"
    // const data = {
    //     dial: 'disconnected', // Replace with actual value
    //     institutionid: 'institutionid2',
    //     uniqueId: uniqueId,
    // };

    // console.log(1443, data)
    // // Emit the 'dataFromFrontend' event to the server
    // socket.emit('dataFromFrontend', data);
  };

  const emitDisconnectInfo = () => {
    console.log(144, uniqueId);
    // const data = "disconnected"
    const data = {
      dial: "disconnected", // Replace with actual value
      institutionid: "institutionid2",
      uniqueId: uniqueId,
    };

    console.log(1443, data);
    // Emit the 'dataFromFrontend' event to the server
    socket.emit("dataFromFrontend", data);
  };
  // const [socketResponse, setSocketResponse] = useState(null);

  // useEffect(() => {
  //     // Listen for server response
  //     socket.on('serverResponse', (data) => {
  //         setSocketResponse(data);
  //     });

  //     // Cleanup on component unmount
  //     return () => {
  //         socket.off('serverResponse');
  //     };
  // }, []);
  // let meetingNumber = ""
  // let passWord = ""

  // const fetchData = async () => {
  //     try {
  //         // alert(language)
  //         const response = await fetch(`${homePage}/api/users`);
  //         // const userData: User[] = await response.json();
  //         // console.log('Fetched user data:', userData);

  //         // // Find an available user who speaks the selected language
  //         // const availableUser = userData.find((user: User) =>
  //         //     user.languages.includes(language!) && user.status === 'available'
  //         // );

  //         if (availableUser) {
  //             // alert(availableUser)
  //             // meetingNumber = availableUser.meetingNumber
  //             // passWord = availableUser.password
  //             // alert(meetingNumber)
  //             // alert(availableUser.meetingNumber)
  //         } else {
  //             alert('No matching users available. Please wait.');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching users:', error);
  //         alert('Error fetching users. Please try again.');
  //     }
  // };

  const getSignature = async () => {
    console.log(23, selectedValue);
    if (!selectedValue) {
      alert("Please select a language before joining a meeting.");
      return;
    }

    // console.log(158, uniqueId);
    console.log(
      158,
      new Date()
        .toLocaleString("ja-JP", {
          timeZone: "GMT",
          hour12: false,
        })
        .replace(/\//g, "-")
        .replace(",", "")
    );

    const data = {
      dial: "calling", // Replace with actual value
      institutionid: "institutionid", // Replace with actual value
      name_of_institution: userData.name_of_institution, // Replace with actual value
      translateLanguage: selectedValue,
      uniqueId: uniqueId,
      // terminal_id:userData.terminal_id
    };
    console.log(149, data);
    // Emit the 'dataFromFrontend' event to the server
    socket.emit("dataFromFrontend", data);

    // await fetchData();

    // Ensure this code only runs once by removing previous listeners
    socket.off("message").on("message", (data) => {
      console.log(135, data, uniqueId);
      // console.log("Received data:", data, uniqueId);

      if (
        data.connectingLink === "terminal joined" &&
        uniqueId === data.uniqueId
      ) {
        console.log(155123);
        stopRingtone();
        startMeeting();
      }

      if (
        data.connectingLink === "no active terminal" &&
        uniqueId === data.uniqueId
      ) {
        console.log(155123);
        stopRingtone();
        alert("no active terminal");
      }

      if (
        data.connectingLink === "forcible disconnect" &&
        uniqueId === data.uniqueId
      ) {
        const now = new Date();
        const formattedDate =
          now.toLocaleString() +
          "." +
          String(now.getMilliseconds()).padStart(3, "0");
        console.log(2123, formattedDate, data.connectingLink);
        stopRingtone();
        alert(
          "通訳者 が応答できない状態です。しばらくお待ちいただき、もう一度、Call ボタンを押してください。"
        );
      }
    });
  };

  function startMeeting() {
    // const zoomAppLink = `zoommtg://zoom.us/join?confno=${meetingNumber}&pwd=${passWord}`;
    // const zoomWebLink = `https://zoom.us/j/${meetingNumber}?pwd=${passWord}`;

    // Try to open Zoom app protocol
    // window.location.href = zoomAppLink;
    // const zoomLink = `https://zoom.us/j/7193586721?pwd=OUcLui5QIHATeQ0B0JCzl11RbRQVCO.1`;

    // Set a fallback in case it doesn't work
    console.log(155, zoomJoinURL);

    setTimeout(() => {
      window.location.href = zoomJoinURL;
      // window.open(zoomJoinURL, '_blank');
    }, 1000); // 1 second delay
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // Display only two digits for milliseconds

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  // function startMeeting() {
  //     // alert(meetingNumber)
  //     if (meetingNumber && passWord) {
  //         const zoomAppLink = `zoommtg://zoom.us/join?confno=${meetingNumber}&pwd=${passWord}`;
  //         // window.location.href = zoomAppLink;
  //         setTimeout(() => {
  //             window.open(zoomAppLink, '_blank');
  //         }, 1000);  // 1 second delay to allow the app to open first
  //     } else {
  //         alert("Meeting information is not available.");
  //     }
  // }

  return (
    <div className="user-menu">
      <MenuHeader title="通訳希望者メニュー" />
      <RadioButtonGroupRound
        options={radioOptions}
        selectedValue={selectedValue}
        onChange={handleRadioChange}
        name="options"
      />
      <div className="user-message">{t("User message")}</div>
      <div className="user-call-row">
        <ButtonAtom
          onClick={() => {
            playRingtone();
            getSignature();
          }}
          label="Call"
          width="50px"
          disabled={isPlaying}
          padding="16px"
        />
        <ButtonAtom
          onClick={() => {
            stopRingtone();
            emitDisconnectInfo();
          }}
          label="Terminate"
          width="100px"
          disabled={!isPlaying}
          padding="16px"
        />
        <p className="timer">{formatTime(ringingTime)}</p>

        {/* Hidden audio element that plays the ringtone */}
        <audio ref={audioRef} src={ringtone} />

        {/* <p>{selectedValue ? `Selected Language: ${selectedValue}` : 'No language selected'}</p>
                <p>{userData?.name_of_institution}</p> */}

        {/* <button onClick={getSignature}>Join Meeting</button> */}
      </div>
    </div>
  );
}

export default UserMenu;
