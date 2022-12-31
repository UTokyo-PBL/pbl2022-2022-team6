import React, { Suspense, useContext, useEffect, useState } from 'react';
import classes from './App.module.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/system';
import theme from './theme/theme';
// import { TestImage } from './pages/test/test';
import AppCtx, { AppCtxUpdater, saveContext } from './store/app-state-context';
import GeneralController from './controllers/general.controller';
import { TestImage } from './pages/test/test';
import { LoadingButton } from '@mui/lab';

const GetSignUpDetails = React.lazy(() => import('./pages/sign-up/get-sign-up-details'));
const WelcomePage = React.lazy(() => import('./pages/welcome/WelcomePage'));
const PreviewImage = React.lazy(() => import('./pages/viewimage/ViewImagePage'));
const SignInPage = React.lazy(() => import('./pages/signin'));
const ConfirmEmail = React.lazy(() => import('./pages/sign-up/confirm-email'));
const CreateProfile = React.lazy(() => import('./pages/sign-up/create-profile/SignUpCreateProfile'));
const Dashboard = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const SelectLanguagesPage = React.lazy(() => import('./pages/select-languages/SelectLanguagesPage'));
const ViewTranslations = React.lazy(() => import('./pages/viewtranslations/viewtranslations'));
const CreatePost = React.lazy(() => import('./pages/createPost'));
const PreviewPost = React.lazy(() => import('./pages/previewPost'));
const ProfilePage = React.lazy(() => import('./pages/profilePage'));
const GameScreen = React.lazy(() => import('./pages/gameScreen'));
const PracticeScreen = React.lazy(() => import('./pages/practiceScreen'));
const QuizScreen = React.lazy(() => import('./pages/quizScreen'));



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
