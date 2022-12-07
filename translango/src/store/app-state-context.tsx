import { createContext } from "react"

export interface AppContextInterface {
    isLoggedIn: boolean;
    username?: string;
    email?: string;
    nativeLanguage?: string;
    favouriteLanguages?: string[];
    theme: "light" | "dark";
};

const defaultCtx: AppContextInterface = {
    isLoggedIn: false,
    nativeLanguage: "en",
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