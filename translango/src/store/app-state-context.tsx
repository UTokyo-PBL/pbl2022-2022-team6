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
  | "TRANSLATE";

type TranslateMappingType = {
  [key in TRANSLATION_KEYS]: string;
};

type TranslationObjType = {
  [code in string]: TranslateMappingType;
};

export interface AppContextInterface {
  version: string;
  isLoggedIn: boolean;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  countryCode: ISO3166_2letter_country_codes;
  profile_pic_url?: string;
  nativeLanguage: string;
  favouriteLanguages: Set<string>;
  theme: "light" | "dark";
  availableLanguages: Record<string, string>;
  translations: TranslationObjType;
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

const defaultCtx: AppContextInterface = {
  version: "0.0.8",
  isLoggedIn: false,
  firstName: "Hey",
  lastName: "User!",
  username: "user",
  countryCode: "JP",
  nativeLanguage: "en",
  favouriteLanguages: new Set<string>(["ja"]),
  theme: "light",
  availableLanguages: {},
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
      WRITE_TEXT_TO_TRANSLATE: "Write the text that you want to translate here!",
      TEXT_WILL_BE_TRANSLATED: "The text will be translated to your favourite languages",
      TRANSLATE: "Translate"
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
