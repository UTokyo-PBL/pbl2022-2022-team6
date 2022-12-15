import { createContext, PropsWithChildren } from "react"
import { ISO3166_2letter_country_codes, ISO639_1LanguageCodeType } from "../types/common/common.types";

export interface AppContextInterface {
    isLoggedIn: boolean;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    countryCode: ISO3166_2letter_country_codes;
    profile_pic_url?: string;
    nativeLanguage?: ISO639_1LanguageCodeType;
    favouriteLanguages: Set<ISO639_1LanguageCodeType>;
    theme: "light" | "dark";
};

const defaultCtx: AppContextInterface = {
    isLoggedIn: false,
    firstName: "Hey",
    lastName: "User!",
    username: "user",
    countryCode: "JP",
    nativeLanguage: "en",
    favouriteLanguages: new Set<ISO639_1LanguageCodeType>(["ja"]),
    theme: "light"
}

const AppCtx = createContext<AppContextInterface>(defaultCtx);

export const AppCtxProvider: React.FC<PropsWithChildren> = (props) => {
    return (
        <AppCtx.Provider value={defaultCtx}>
            {props.children}
        </AppCtx.Provider>
    );
};

export default AppCtx;