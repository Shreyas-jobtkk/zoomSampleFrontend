import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../LV3/Header/MenuHeader/MenuHeader";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function AdminMenu() {
  const location = useLocation();
  const userNo = location.state?.userNo; // This will be the value passed as 'response.user_no'

  if (userNo) {
    console.log(155, userNo);
  }

  const navigate = useNavigate();

  const navigateToCompaniesList = () => {
    navigate("/CompaniesList");
  };

  const navigateToStoresList = () => {
    navigate("/StoreList");
  };

  const navigateToContractorList = () => {
    navigate("/ContractorList");
  };

  const navigateToInterpretersList = () => {
    navigate("/InterpretersList");
  };

  const navigateToAdministratorList = () => {
    navigate("/AdministratorList");
  };

  const navigateToInterpreterEvaluationList = () => {
    navigate("/AdminsInterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/AdminMeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/AdminMeetingInvitationList");
  };

  const navigateToLanguagesSupportList = () => {
    navigate("/LanguagesSupportList");
  };

  const navigateToLogList = () => {
    navigate("/LogList");
  };

  return (
    <Box>
      <MenuHeader title="管理者メニュー" />
      <Box>
        <ButtonAtom
          onClick={navigateToCompaniesList}
          label="企業一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />
        <ButtonAtom
          onClick={navigateToInterpreterEvaluationList}
          label="通訳評価一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />

        <ButtonAtom
          onClick={navigateToStoresList}
          label="店舗一覧"
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
          onClick={navigateToContractorList}
          label="応対者一覧"
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

        <ButtonAtom
          onClick={navigateToInterpretersList}
          label="通訳者一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />
        <ButtonAtom
          onClick={navigateToLanguagesSupportList}
          label="対応言語一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />

        <ButtonAtom
          onClick={navigateToAdministratorList}
          label="管理者一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />
        <ButtonAtom
          onClick={navigateToLogList}
          label="ログ一覧"
          width="40vw"
          padding="5vh 5vw 5vh 2vw"
          margin="2vh 5vw"
        />
        {/* <button >管理者一覧</button>
                <button >ログ一覧</button> */}
      </Box>
    </Box>
  );
}

export default AdminMenu;
