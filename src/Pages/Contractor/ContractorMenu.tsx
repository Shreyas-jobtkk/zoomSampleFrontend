import ButtonAtom from "../../components/LV1/ButtonAtom/ButtonAtom";
import { useNavigate, useLocation } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader/MenuHeader";
import { Box } from "@mui/material";
import classes from "../../styles/ContractorMenu.module.scss";

function ResponderMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const navigateToUserMenu = () => {
    // Navigate to UserMenu and pass the message data along
    navigate("/Contractor/InterpretRequest", {
      state: { message },
    });
  };

  const navigateToInterpreterEvaluationList = () => {
    navigate("/Contractor/InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/Contractor/MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/Contractor/MeetingInvitationList");
  };

  return (
    <Box>
      <MenuHeader title="応対者メニュー" />
      <Box className={classes.responderMenuContainer}>
        <Box className={classes.listNavColumn}>
          <ButtonAtom
            onClick={navigateToInterpreterEvaluationList}
            label="通訳評価一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToMeetingHistoryList}
            label="ミーティング履歴一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToMeetingInvitationList}
            label="ミーティング招待一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
        </Box>
        <ButtonAtom
          onClick={navigateToUserMenu}
          label="通訳希望者メニュー"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />
      </Box>
    </Box>
  );
}

export default ResponderMenu;
