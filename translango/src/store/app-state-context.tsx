import { createContext, PropsWithChildren } from "react"
import { lang_country_two_letter_codes } from "../types/common/common.types";

export interface AppContextInterface {
    isLoggedIn: boolean;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    profile_pic_url?: string;
    nativeLanguage?: lang_country_two_letter_codes;
    favouriteLanguages: Set<lang_country_two_letter_codes>;
    theme: "light" | "dark";
};

const defaultCtx: AppContextInterface = {
    isLoggedIn: false,
    firstName: "Hey",
    lastName: "User!",
    username: "user",
    nativeLanguage: "en-US",
    favouriteLanguages: new Set<lang_country_two_letter_codes>(["ja-JP"]),
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