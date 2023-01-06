import { ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Box,
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
import { ChangeEvent, useContext, useState } from "react";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import SelectLanguage from "../../components/selectLanguage";
import TopNavigation from "../../components/TopNavigation";
import AppCtx, {
  AppCtxUpdater,
  TRANSLATION_KEYS,
} from "../../store/app-state-context";

const SelectLanguagesPage: React.FC = () => {
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  const [filterText, setFilterText] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(
    Object.entries(ctx.availableLanguages).filter(([_code, name]) =>
      name.toLocaleLowerCase().includes(filterText)
    )
  );

  const languageFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowercase_searchTerm = event.target.value.trim().toLocaleLowerCase();
    setFilterText(lowercase_searchTerm);
    setFilteredLanguages(
      Object.entries(ctx.availableLanguages).filter(([_code, name]) =>
      name.toLocaleLowerCase().includes(filterText)
    )
    );
  };

  const onCheckboxChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const lang_code = value;

    if (checked) {
      ctx.favouriteLanguages.add(lang_code);
    } else {
      ctx.favouriteLanguages.delete(lang_code);
    }

    ctxUpdater({ ...ctx });
  };

  return (
    <FillPageWithSidePic>
      <Stack>
        <TopNavigation />
        <Stack
          direction="row"
          p={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>{t("SELECT_NATIVE_LANG")}</Typography>
          <SelectLanguage />
        </Stack>
        <Card>
          <CardHeader
            sx={{ color: "primary.main" }}
            title={t("SELECT_PREFERRED_LANGS")}
            subheader={t("PREFERRED_LANGS_USAGE")}
          />
          <CardContent
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="standard"
                value={filterText}
                onChange={languageFilterHandler}
              />
              <FormControl component="fieldset">
                <FormGroup>
                  {filteredLanguages.map(
                    ([code, name]) => {
                      return (
                        <Stack
                          key={code}
                          direction="row"
                          justifyContent="space-between"
                          justifyItems="center"
                        >
                          {/* <Stack alignItems="center" direction="row" spacing={2} justifyItems="center"> */}
                          <Typography>{`${name}`}</Typography>
                          {/* </Stack> */}
                          <Checkbox
                            name={name}
                            checked={ctx.favouriteLanguages.has(code)}
                            onChange={onCheckboxChanged}
                            value={code}
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
