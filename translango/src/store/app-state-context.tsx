import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ISO3166_2letter_country_codes } from "../types/common/common.types";

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
  availableLanguages: {}
};

const AppCtx = createContext<AppContextInterface>(defaultCtx);
export const AppCtxUpdater = createContext<
  Dispatch<SetStateAction<AppContextInterface>>
>((value) => {});

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
