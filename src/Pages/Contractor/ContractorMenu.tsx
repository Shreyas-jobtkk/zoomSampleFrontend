import ButtonAtom from "../../components/LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate, useLocation } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader";
import { Box } from "@mui/material";

function ResponderMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const navigateToUserMenu = () => {
    // Navigate to UserMenu and pass the message data along
    navigate("/ContractorCallingMenu", {
      state: { message },
    });
  };

  const navigateToCompaniesList = () => {};

  return (
    <Box>
      <MenuHeader title="応対者メニュー" />
      <Box className="responder-menu-button-container">
        <Box className="list-column">
          <ButtonAtom
            onClick={navigateToCompaniesList}
            label="通訳評価一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToCompaniesList}
            label="ミーティング履歴一覧"
            width="40vw"
            padding="5vh 5vw 5vh 2vw"
            margin="2vh 5vw"
          />
          <ButtonAtom
            onClick={navigateToCompaniesList}
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
