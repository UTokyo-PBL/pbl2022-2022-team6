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
import AppCtx, { AppCtxUpdater } from "../../store/app-state-context";
import { Language } from "../../types/common/common.types";

const SelectLanguagesPage: React.FC = () => {
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  
  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');

  const languageFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowercase_searchTerm = event.target.value.trim().toLocaleLowerCase();
    setFilterText(lowercase_searchTerm);
  };

  const onCheckboxChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    const lang_code = value;

    if (checked) {ctx.favouriteLanguages.add(lang_code);}
    else {ctx.favouriteLanguages.delete(lang_code);}
    
    ctxUpdater({...ctx});
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
                value={filterText}
                onChange={languageFilterHandler}
              />
              <FormControl component="fieldset">
                <FormGroup>
                  {Object.entries(ctx.availableLanguages).map(
                    ([ code, name ]) => {
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
