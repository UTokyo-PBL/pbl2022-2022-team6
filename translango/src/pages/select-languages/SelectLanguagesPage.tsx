import { ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import AppCtx from "../../store/app-state-context";
import { CountryCode2letter2Name, LanguageCode2Name, lang_code_list } from "../../store/utils";
import { ISO3166_2letter_country_codes, ISO639_1LanguageCodeType } from "../../types/common/common.types";


const SelectLanguagesPage: React.FC = () => {
    const ctx = useContext(AppCtx);
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
            <FormControl component="fieldset">
              <FormGroup>
                {[...lang_code_list].map((lang_code) => {
                    const language_code = lang_code.split('-')[0] as ISO639_1LanguageCodeType;
                    const country_code = lang_code.split('-')[1] as ISO3166_2letter_country_codes;
                    const language_name = LanguageCode2Name[language_code];
                    const country_name = CountryCode2letter2Name[country_code];
                    const is_favourite = ctx.favouriteLanguages.has(lang_code);
                  return (
                    <Stack
                    key={lang_code}
                      direction="row"
                      justifyContent="space-between"
                      justifyItems="center"
                    >
                      <Stack alignItems="center" direction="row" spacing={2} justifyItems="center">
                        <ReactCountryFlag
                        style={{
                            fontSize: '3em'
                        }}
                          countryCode={country_code}
                        />
                        <Typography>{`${language_name} (${country_name})`}</Typography>
                      </Stack>
                      <Checkbox name="favourite_languages" checked={is_favourite}/>
                    </Stack>
                  );
                })}
              </FormGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Stack>
    </FillPageWithSidePic>
  );
};

export default SelectLanguagesPage;
