import { createContext } from "react"

export interface AppContextInterface {
    isLoggedIn: boolean;
    username?: string;
    email?: string;
    nativeLanguage?: string;
    favouriteLanguages?: string[];
};

const AppCtx = createContext<AppContextInterface>({isLoggedIn: false});

export default AppCtx;