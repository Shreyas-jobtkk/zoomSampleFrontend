import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../LV3/Header/MenuHeader/MenuHeader";
import { Box } from "@mui/material";
import { isManualUrl } from "../../../utils/utils";
// import { useEffect } from "react";

function AdminMenu() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isManualUrl()) {
  //     // Navigate to the dashboard or another page
  //     navigate("/CompaniesList");
  //   }
  // }, [isManualUrl, navigate]);

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
    navigate("/InterpreterEvaluationList");
  };

  const navigateToMeetingHistoryList = () => {
    navigate("/MeetingHistoryList");
  };

  const navigateToMeetingInvitationList = () => {
    navigate("/MeetingInvitationList");
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
