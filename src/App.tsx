// App.tsx
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import '../src/i18n.js'
import AppRoutes from './routes/AppRoutes.js';
import AppMenuRoutes from './routes/AdminMenuRoutes.js';

const App: React.FC = () => {
  // const { t, i18n } = useTranslation();

  // const changeLanguage = (lang: any) => {
  //   i18n.changeLanguage(lang);
  // };
  return (
    <Router>
      {/* <div>
        <label className="language-option">
          <input
            type="radio"
            value="en"
            checked={i18n.language === 'en'}
            onChange={() => changeLanguage('en')}
          />
          English
        </label>

        <label className="language-option">
          <input
            type="radio"
            value="ja"
            checked={i18n.language === 'ja'}
            onChange={() => changeLanguage('ja')}
          />
          日本語
        </label>
      </div> */}
      <nav>
      <ul className="app-nav-bar">
          <li>
            <Link to="/ResponderLogin">通訳希望者</Link>
          </li>   
          <li>
            <Link to="/TranslatorLogin">通訳者</Link>
          </li>
          <li>
            <Link to="/AdminLogin">管理者</Link>
          </li>
          <li>
            <Link to="/Sample">サンプル</Link>
          </li>
        </ul>
      </nav>
      <div>
      </div>
      <AppRoutes />
      <AppMenuRoutes />
    </Router>
  );
};

export default App;
