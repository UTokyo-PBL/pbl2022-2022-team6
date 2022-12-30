import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ISO3166_2letter_country_codes } from "../types/common/common.types";

export type TRANSLATION_KEYS = "WELCOME" | "CHOOSE_TRANSLATE" | "OR" | "DISCOVER_MORE_BELOW" | "SIGN_IN" | "SIGN_UP" | "CAMERA" | "TEXT";

type TranslateMappingType = {
  [key in TRANSLATION_KEYS]: string;
};

type TranslationObjType = {
  [code in string]: TranslateMappingType;
};

export interface AppContextInterface {
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
    'en': {
      "WELCOME": "Welcome",
      "CHOOSE_TRANSLATE": "Choose how you'd like to translate",
      "OR": "Or",
      "DISCOVER_MORE_BELOW": "Discover more below!",
      "SIGN_IN": "Sign in",
      "SIGN_UP": "Sign up",
      "CAMERA": "Camera",
      "TEXT": "Text"
    }
  }
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
      return ({
        ...ctx,
        favouriteLanguages: new Set<string>(ctx.favouriteLanguages)
      });
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
