import ButtonAtom from "../../components/LV1/Button/ButtonAtom/ButtonAtom";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../components/LV3/Header/MenuHeader";

function AdminMenu() {
  const navigate = useNavigate();

  const navigateToCompaniesList = () => {
    navigate("/CompaniesList");
  };

  const navigateToStoresList = () => {
    navigate("/StoreList");
  };

  const navigateToRespondersList = () => {
    navigate("/RespondersList");
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
    <div>
      {/* <div className="screen-title">画面ID:DSP10001</div> */}
      <MenuHeader title="管理者メニュー" />
      {/* <h3 className="menu-title">
                管理者メニュー
            </h3> */}
      <div>
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
          onClick={navigateToRespondersList}
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
      </div>
    </div>
  );
}

export default AdminMenu;
