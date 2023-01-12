import { FormControl, FormLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import AppCtx, {
  AppCtxUpdater,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

export const uiLanguages = [
  { value: "ar", text: "عربى" },
  { value: "en", text: "English" },
  { value: "es", text: "español" },
  { value: "fr", text: "française" },
  { value: "hi", text: "हिन्दी" },
  { value: "ja", text: "日本語" },
  { value: "zh", text: "中文" },
];

export default function SelectLanguage() {
  // It is a hook imported from 'react-i18next'
  // const { t } = useTranslation();
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  const handleChange = (event: SelectChangeEvent) => {
    ctx.nativeLanguage = event.target.value;
    ctxUpdater({ ...ctx });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <FormLabel>{t("SELECT_NATIVE_LANG")}</FormLabel>
      <Select
        value={ctx.nativeLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        sx={{
          bgcolor: "white",
          color: "primary",
        }}
      >
        {uiLanguages.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
