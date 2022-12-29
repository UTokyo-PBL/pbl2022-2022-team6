import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from "react";
// import { useTranslation } from 'react-i18next';
import i18next from '../i18n';
import AppCtx, { AppCtxUpdater } from "../store/app-state-context";


export const uiLanguages = [
    { value: 'en', text: "English" },
    { value: 'zh', text: "中文" },
    { value: 'hi', text: "हिन्दी" },
    { value: 'es', text: "español" },
    { value: 'ja', text: "日本語" },
];


export default function SelectLanguage() {
    // It is a hook imported from 'react-i18next'
    // const { t } = useTranslation();
    const ctx = useContext(AppCtx);
    const ctxUpdater = useContext(AppCtxUpdater);

    const handleChange = (event: SelectChangeEvent) => {
        ctx.nativeLanguage = event.target.value;
        i18next.changeLanguage(event.target.value);
        ctxUpdater({...ctx});
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    value={ctx.nativeLanguage}
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
                    {uiLanguages.map(item => {
                        return (<MenuItem key={item.value}
                            value={item.value}>{item.text}</MenuItem>);
                    })}
                </Select>
            </FormControl>
    );
}

