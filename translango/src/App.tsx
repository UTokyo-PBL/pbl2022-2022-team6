import classes from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewImage from './pages/viewimage';
import WelcomePage from './pages/welcome';
import { ThemeProvider } from '@mui/system';
import theme from './theme/theme';
import SignInPage from './pages/signin';
// import { TestImage } from './pages/test/test';

import './i18n.tsx'
import GetSignUpDetails from './pages/sign-up/get-sign-up-details/GetSignUpDetails';
import ConfirmEmail from './pages/sign-up/confirm-email/ConfirmEmail';
import CreateProfile from './pages/sign-up/create-profile/CreateProfile';
import Dashboard from './pages/dashboard/Dashboard';
import SelectLanguagesPage from './pages/select-languages/SelectLanguagesPage';
import ViewObject from './components/viewObject';
import ViewTranslations from './pages/viewtranslation';


function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              {/* <Route path='/test' element={<TestImage />} /> */}
              <Route path='/' element={<WelcomePage />} />
              <Route path="/view-image" element={<ViewImage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/select-favourite-languages" element={<SelectLanguagesPage />} />
              <Route path='/sign-up'>
                <Route index element={<GetSignUpDetails />} />
                <Route path='confirm-email' element={<ConfirmEmail />} />
                <Route path='create-profile' element={<CreateProfile />} />
              </Route>
              <Route path='/viewtranslations' element={<ViewTranslations />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
