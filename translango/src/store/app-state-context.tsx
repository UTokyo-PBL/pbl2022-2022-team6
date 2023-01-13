import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ISO3166_2letter_country_codes } from "../types/common/common.types";

export type TRANSLATION_KEYS =
  | "WELCOME"
  | "CHOOSE_TRANSLATE"
  | "OR"
  | "DISCOVER_MORE_BELOW"
  | "SIGN_IN"
  | "SIGN_UP"
  | "CAMERA"
  | "TEXT"
  | "READY_TO_SCAN"
  | "CHOOSE_TEXT_OR_OBJECT_DETECTION"
  | "CHANGE_PICTURE"
  | "SCAN"
  | "MY_ACCOUNT"
  | "LOG_OUT"
  | "SETTINGS"
  | "TRANSLATE_ON_THE_GO"
  | "SKIP_AND_EXPLORE"
  | "FAVORITE_LANGS"
  | "SELECT_NATIVE_LANG"
  | "SELECT_PREFERRED_LANGS"
  | "PREFERRED_LANGS_USAGE"
  | "WRITE_TEXT_TO_TRANSLATE"
  | "TEXT_WILL_BE_TRANSLATED"
  | "TRANSLATE"
  | "LANGUAGE_QUIZ"
  | "PRACTICE"
  | "QUIZ"
  | "QUIZ_TEXT"
  | "LETS_REGISTER"
  | "DISCOVERY_AWAITS"
  | "WE_KEEP_YOU_SAFE"
  | "LOGIN"
  | "PASSWORD"
  | "CONFIRM_PASSWORD"
  | "SOMETHING_WENT_WRONG_TRY_AGAIN"
  | "LETS_SETUP"
  | "CREATE_PROFILE"
  | "KEEP_ME_SIGNED_IN"
  | "MAIL_ME_ABOUT_OFFERS"
  | "CREATE_ACCOUNT"
  | "OR_SIGN_IN_WITH"
  | "ALREADY_HAVE_ACCOUNT?"
  | "PASS_DONT_MATCH"
  | "MAIL_IS_REQD"
  | "LIST"
  | "HOME"
  | "DASHBOARD"
  | "PROFILE"
  | "PLAY"
  | "LANGUAGES"
  | "GAME"
  | "EMAIL"
  | "USERNAME"
  | "FORGOT_PASS"
  | "DONT_HAVE_ACCOUNT_SIGN_UP"
  | "USERNAME_OR_PASSWORD_IS_WRONG";

type TranslateMappingType = {
  [key in TRANSLATION_KEYS]: string;
};

type TranslationObjType = {
  [code in string]: TranslateMappingType;
};

export type GeoCoordinates = {
  lat: number;
  lng: number;
};

export interface AppContextInterface {
  version: string;
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  username: string;
  userid: string;
  email?: string;
  countryCode: ISO3166_2letter_country_codes;
  profile_pic_url?: string;
  nativeLanguage: string;
  favouriteLanguages: Set<string>;
  theme: "light" | "dark";
  availableLanguages: Record<string, string>;
  translations: TranslationObjType;
  dummyLocations: Array<GeoCoordinates>;
}

export const saveContext = (obj: AppContextInterface) => {
  localStorage.setItem(
    "TRANSLANGO_APP_CTX",
    JSON.stringify({
      ...obj,
      favouriteLanguages: Array.from(obj.favouriteLanguages.keys()),
      // availableLanguages: Object.entries(obj.availableLanguages)
    })
  );
};

export const defaultCtx: AppContextInterface = {
  version: "0.0.20",
  isLoggedIn: false,
  firstName: "Hey",
  lastName: "User!",
  username: "user",
  userid: "userid",
  countryCode: "JP",
  nativeLanguage: "hi",
  favouriteLanguages: new Set<string>(["ja"]),
  theme: "light",
  availableLanguages: {},
  dummyLocations: [
    { lat: 35.652832, lng: 139.839478 },
    { lat: 28.6448, lng: 77.216721 },
    { lat: 25.276987, lng: 55.296249 },
    { lat: 42.361145, lng: -71.057083 },
    { lat: 19.432608, lng: -99.133209 },
    { lat: 39.916668, lng: 116.383331 },
  ],
  translations: {
    en: {
      WELCOME: "Welcome",
      CHOOSE_TRANSLATE: "Choose how you'd like to translate",
      OR: "Or",
      DISCOVER_MORE_BELOW: "Discover more below!",
      SIGN_IN: "Sign in",
      SIGN_UP: "Sign up",
      CAMERA: "Camera",
      TEXT: "Text",
      READY_TO_SCAN: "Ready to scan?",
      CHOOSE_TEXT_OR_OBJECT_DETECTION:
        "Choose between text or object translation",
      CHANGE_PICTURE: "Change picture",
      SCAN: "Scan",
      MY_ACCOUNT: "My Account",
      SETTINGS: "Settings",
      LOG_OUT: "Log Out",
      TRANSLATE_ON_THE_GO: "Translate on the go",
      SKIP_AND_EXPLORE: "Skip and explore!",
      FAVORITE_LANGS: "Favourite languages",
      SELECT_NATIVE_LANG: "Select your native language",
      SELECT_PREFERRED_LANGS: "Select your preferred languages",
      PREFERRED_LANGS_USAGE:
        "New texts and objects will be translated to your preferred languages. Select as much as you want!",
      WRITE_TEXT_TO_TRANSLATE:
        "Write the text that you want to translate here!",
      TEXT_WILL_BE_TRANSLATED:
        "The text will be translated to your favourite languages",
      TRANSLATE: "Translate",
      LANGUAGE_QUIZ: "Language Quiz!",
      QUIZ: "QUIZ",
      PRACTICE: "PRACTICE",
      QUIZ_TEXT: "Test or practice your knowledge with this short quiz",
      LETS_REGISTER: "Let's register",
      DISCOVERY_AWAITS: "Discovery awaits!",
      PASSWORD: "Password",
      CONFIRM_PASSWORD: "Confirm password",
      LOGIN: "Login",
      WE_KEEP_YOU_SAFE:
        "We keep you safe! Your password is encrypted and inaccesible to anyone except you!",
      SOMETHING_WENT_WRONG_TRY_AGAIN: "Something went wrong! Please try again",
      LETS_SETUP: "Let's setup",
      CREATE_PROFILE: "Create your profile here!",
      KEEP_ME_SIGNED_IN: "Keep me signed in",
      MAIL_ME_ABOUT_OFFERS: "Email me about special pricing and more!",
      CREATE_ACCOUNT: "Create account",
      "ALREADY_HAVE_ACCOUNT?": "Already have an account? Log in",
      OR_SIGN_IN_WITH: "Or sign in with",
      PASS_DONT_MATCH: "Both passwords do not match",
      MAIL_IS_REQD: "Email is required!",
      DASHBOARD: "Dashboard",
      GAME: "Game",
      HOME: "Home",
      LANGUAGES: "Languages",
      LIST: "List",
      PLAY: "Play",
      PROFILE: "Profile",
      EMAIL: "Email address",
      USERNAME: "Username",
      FORGOT_PASS: "Forgot password?",
      DONT_HAVE_ACCOUNT_SIGN_UP: "Don't have an account? Sign Up",
      USERNAME_OR_PASSWORD_IS_WRONG: "Either username or password is wrong!",
    },
  },
};

const AppCtx = createContext<AppContextInterface>(defaultCtx);
export const AppCtxUpdater = createContext<
  Dispatch<SetStateAction<AppContextInterface>>
>(() => {});

export const AppCtxProvider: React.FC<PropsWithChildren> = (props) => {
  const [contextState, setContextState] = useState<AppContextInterface>(() => {
    const ctxStringInStorage = localStorage.getItem("TRANSLANGO_APP_CTX");
    if (ctxStringInStorage) {
      const ctx: AppContextInterface = JSON.parse(ctxStringInStorage);
      if (!ctx.version || ctx.version !== defaultCtx.version) return defaultCtx;
      return {
        ...ctx,
        favouriteLanguages: new Set<string>(ctx.favouriteLanguages),
      };
    } else {
      return defaultCtx;
    }
  });

  return (
    <>
      <AppCtx.Provider value={contextState}>
        <AppCtxUpdater.Provider value={setContextState}>
          {props.children}
        </AppCtxUpdater.Provider>
      </AppCtx.Provider>
    </>
  );
};

export default AppCtx;
