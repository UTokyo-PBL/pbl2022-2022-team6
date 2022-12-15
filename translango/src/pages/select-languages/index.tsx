import { ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import AppCtx from "../../store/app-state-context";
import { ISO639_1LanguageCodes, LanguageCode2Name } from "../../store/utils";
import { ISO639_1LanguageCodeType } from "../../types/common/common.types";

interface CheckboxState {
  language_code: ISO639_1LanguageCodeType;
  language_name: string;
  checked: boolean;
}

const SelectLanguagesPage: React.FC = () => {
  const ctx = useContext(AppCtx);
  const [filteredLangCodes, setFilteredLangcodes] = useState<CheckboxState[]>(
    [...ISO639_1LanguageCodes].map((lang_code) => {
      return {
        language_code: lang_code,
        language_name: LanguageCode2Name[lang_code].toLowerCase(),
        checked: ctx.favouriteLanguages.has(lang_code),
      };
    })
  );
  const navigate = useNavigate();
  const filterRef = useRef<HTMLInputElement>(null);

  const languageFilterHandler = () => {
    const searchTerm = filterRef.current!.value.trim().toLowerCase();
    setFilteredLangcodes(
      [...ISO639_1LanguageCodes]
        .filter((code) => {
          const name = LanguageCode2Name[code as ISO639_1LanguageCodeType];
          return name.startsWith(searchTerm);
        })
        .map((lang_code) => {
          return {
            language_code: lang_code,
            language_name: LanguageCode2Name[lang_code].toLowerCase(),
            checked: ctx.favouriteLanguages.has(lang_code),
          };
        })
    );
  };

  const onCheckboxChanged = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    // const lang_code = event.target.value as ISO639_1LanguageCodeType;
    const { name, checked, value } = event.target;
    const lang_code = value as ISO639_1LanguageCodeType;
    console.log(`${name}, ${checked}, ${lang_code}`);

    if (checked) ctx.favouriteLanguages.add(lang_code);
    else ctx.favouriteLanguages.delete(lang_code);
    languageFilterHandler();
  };

  return (
    <FillPageWithSidePic>
      <Stack>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Card>
          <CardHeader
            sx={{ color: "primary.main" }}
            title="Select your preferred languages"
            subheader="Your preferred languages will be displayed first when you translate a new item. Select as much as you want!"
          />
          <CardContent component="form">
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="standard"
                inputRef={filterRef}
                onChange={languageFilterHandler}
              />
              <FormControl component="fieldset">
                <FormGroup>
                  {filteredLangCodes.map(
                    ({ language_code, language_name, checked }) => {
                      return (
                        <Stack
                          key={language_code}
                          direction="row"
                          justifyContent="space-between"
                          justifyItems="center"
                        >
                          {/* <Stack alignItems="center" direction="row" spacing={2} justifyItems="center"> */}
                          <Typography>{`${language_name}`}</Typography>
                          {/* </Stack> */}
                          <Checkbox
                            name={language_name}
                            checked={checked}
                            onChange={onCheckboxChanged}
                            value={language_code}
                          />
                        </Stack>
                      );
                    }
                  )}
                </FormGroup>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </FillPageWithSidePic>
  );
};

export default SelectLanguagesPage;
