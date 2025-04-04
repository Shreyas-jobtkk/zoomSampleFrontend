import ButtonAtom from "../../components/LV1/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader/MenuHeader";
import { Box } from "@mui/material";

function AdminMenu() {
  const navigate = useNavigate();

  const navigateToCompaniesList = () => {
    navigate("/Admin/Companies/List");
  };

  const navigateToStoresList = () => {
    navigate("/Admin/Store/List");
  };

  const navigateToContractorList = () => {
    navigate("/Admin/User/List/Contractor");
  };

  const navigateToInterpretersList = () => {
    navigate("/Admin/User/List/Interpreters");
  };

  const navigateToAdministratorList = () => {
    navigate("/Admin/User/List/Administrator");
  };

  const navigateToInterpreterEvaluationList = () => {
    navigate("/Admin/InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/Admin/MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/Admin/MeetingInvitationList");
  };

  const navigateToLanguagesSupportList = () => {
    navigate("/Admin/LanguagesSupport/List");
  };

  const navigateToLogList = () => {
    navigate("/Admin/LogList");
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
      </Box>
    </Box>
  );
}

export default AdminMenu;
