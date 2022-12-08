import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from "react";
import { useTranslation } from 'react-i18next';
import i18next from '../i18n';





export default function SelectLanguage(props: any) {
    // It is a hook imported from 'react-i18next'
    const { t } = useTranslation();
    const [language, setLanguage] = React.useState(i18next.language);

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
        let loc = "http://localhost:3000";
        window.location.replace(loc + "?lng=" + event.target.value);
        i18next.changeLanguage(language);
    };

    const languages = [
        // { value: '', text: "Language" },
        { value: 'en', text: "English" },
        { value: 'zh', text: "中文" },
        { value: 'hi', text: "हिन्दी" },
        { value: 'es', text: "español" },
        { value: 'ja', text: "日本語" },
    ]

    const language_map = {
        en: 'English',
        zh: "中文",
        hi: "हिन्दी",
        es: "español",
        ja: "日本語",
    }


    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">

            <Select
                value={language}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                sx={{
                    bgcolor: 'white',

                    color: 'primary'
                }}
            >
                {languages.map(item => {
                    return (<MenuItem key={item.value}
                        value={item.value}>{item.text}</MenuItem>);
                })}
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
    );
}

