import classes from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviewImage from './pages/previewimage';
import WelcomePage from './pages/welcome';
import { ThemeProvider } from '@mui/system';
import theme from './theme/theme';
import SignInPage from './pages/signin';
// import { TestImage } from './pages/test/test';

import './i18n.tsx'
import GetSignUpDetails from './pages/sign-up/get-sign-up-details';
import ConfirmEmail from './pages/sign-up/confirm-email';
import CreateProfile from './pages/sign-up/create-profile';
import Dashboard from './pages/dashboard';
import SelectLanguagesPage from './pages/select-languages';
import ViewObject from './components/viewObject';
import ViewTranslations from './pages/viewtranslation';
import CreatePost from './pages/createPost';
import { TestImage } from './pages/test/test';
import PreviewPost from './pages/previewPost';
import ProfilePage from './pages/profilePage';


function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/dashboard'>
                <Route index element={<Dashboard />} />
                <Route path=':userID' element={<Dashboard />} />
              </Route>
              {<Route path='/test' element={<TestImage />} />}
              <Route path='/' element={<WelcomePage />} />
              <Route path="/view-image" element={<PreviewImage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/select-favourite-languages" element={<SelectLanguagesPage />} />
              <Route path='/sign-up'>
                <Route index element={<GetSignUpDetails />} />
                <Route path='confirm-email' element={<ConfirmEmail />} />
                <Route path='create-profile' element={<CreateProfile />} />
              </Route>
              <Route path='/viewtranslations/:translationID' element={<ViewTranslations />} />
              <Route path='/createpost/:translationID' element={<CreatePost />} />
              <Route path='/previewpost/:translationID' element={<PreviewPost />} />
              <Route path='/profilepage/:userID' element={<ProfilePage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;