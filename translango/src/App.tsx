import classes from './App.module.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PreviewImage from './pages/viewimage/ViewImagePage';
import { ThemeProvider } from '@mui/system';
import theme from './theme/theme';
import SignInPage from './pages/signin';
// import { TestImage } from './pages/test/test';

import ConfirmEmail from './pages/sign-up/confirm-email';
import CreateProfile from './pages/sign-up/create-profile/SignUpCreateProfile';
import Dashboard from './pages/dashboard/DashboardPage';
import SelectLanguagesPage from './pages/select-languages/SelectLanguagesPage';
import ViewTranslations from './pages/viewtranslations/viewtranslations';
import CreatePost from './pages/createPost';
import { TestImage } from './pages/test/test';
import PreviewPost from './pages/previewPost';
import ProfilePage from './pages/profilePage';
import GameScreen from './pages/gameScreen';
import PracticeScreen from './pages/practiceScreen';
import QuizScreen from './pages/quizScreen';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import AppCtx, { AppCtxUpdater, saveContext } from './store/app-state-context';
import GeneralController from './controllers/general.controller';
import { LoadingButton } from '@mui/lab';

const GetSignUpDetails = React.lazy(() => import('./pages/sign-up/get-sign-up-details'));
const WelcomePage = React.lazy(() => import('./pages/welcome/WelcomePage'));

function App() {
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const [areLanguagesReady, setAreLanguagesReady] = useState<boolean>(false);
  /**
   * Use useEffect to load available languages
   */
  useEffect(()=>{
    GeneralController.getAllLanguages(ctx.nativeLanguage).then((data) => {
      ctx.availableLanguages = data;

      if (ctx.translations[ctx.nativeLanguage] === undefined) {
        Promise.all(Object.entries(ctx.translations['en']).map(async ([key, engText]) => {
            const tr = await GeneralController.getTranslation(engText, ctx.nativeLanguage, 'en');
            return {key, translation: tr.translatedText};
        })).then((values) => {
            // @ts-ignore: ignore next line because we're soon giving them values
            ctx.translations[ctx.nativeLanguage] = {}; 
            values.forEach(({key, translation}) => {
              ctx.translations[ctx.nativeLanguage][key] = translation;
            })
        }).finally(() => {
          ctxUpdater({...ctx});
        })
      }

      setAreLanguagesReady(true);
      ctxUpdater({...ctx});
    });
  }, [ctx.nativeLanguage]);

  useEffect(() => saveContext(ctx));

  return (<>
    <div className={classes.App}>
      {areLanguagesReady && <header className={classes.AppHeader}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingButton loading sx={{width: "100%", alignSelf: "center"}}/>}>
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
              <Route path='/game/:userID' element={<GameScreen />} />
              <Route path='/practice/:userID' element={<PracticeScreen />} />
              <Route path='/quiz/:userID' element={<QuizScreen />} />
              <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
          </Router>
          </Suspense>
        </ThemeProvider>
      </header>}
    </div></>
  );
}

export default App;
