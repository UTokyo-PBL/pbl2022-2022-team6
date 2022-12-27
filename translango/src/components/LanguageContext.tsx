import React from "react";

// set the defaults
const LanguageContext = React.createContext({
    language: "en",
    setLanguage: (lang: string) => { }
});

export default LanguageContext;