import { Add, Google, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Box,
  Checkbox,
  Divider,
  Fab,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import SignUpAndLoginTop from "../SignUpAndLoginTop";
import AppCtx, {
  AppCtxUpdater,
  TRANSLATION_KEYS,
} from "../../../store/app-state-context";
import SelectLanguage from "../../../components/selectLanguage";
import { useLocation, useNavigate } from "react-router-dom";
import UserController from "../../../controllers/user/user.controller";
import { UserFromBackend, UserSignUp } from "../../../types/common/axios.types";
import GeneralController from "../../../controllers/general.controller";

export default function CreateProfile() {
  const ctx = useContext(AppCtx);
  const contextUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];

  const [_profilePic, setProfilePic] = useState<undefined | File>();
  const [profileURL, setProfileURL] = useState("empty");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  // const [uploadedimg, setUploadedimg] = useState(false);
  const fileInput = useRef<any>();

  const location = useLocation();
  const navigate = useNavigate();

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.value.trimStart().toLocaleLowerCase();
    const [firstname, lastname] = name.split(" ", 2);
    setName(name);
    setFirstname(firstname.trim());
    setLastname((lastname || "").trim());
  };

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value.trim().toLocaleLowerCase());
  };

  const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    // event.persist();
    const file = event.target.files[0];
    setProfilePic(file);
    setProfileURL(URL.createObjectURL(file));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log("Came here");
    const userData: UserSignUp = {
      username,
      email: location.state.email as string,
      password: location.state.password as string,
      firstname,
      middlename: "",
      lastname,
      primary_lang: ctx.nativeLanguage,
      favourite_langs: ["ja"],
    };

    const user: UserFromBackend = await GeneralController.signup(userData);
    localStorage.setItem(
      "auth-token",
      `Bearer ${user.token.access_token_data}`
    );
    contextUpdater(function (oldCtx) {
      return {
        ...oldCtx,
        isLoggedIn: true,
        username: username,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        favouriteLanguages: new Set(
          user.favourite_languages.map(({ code }) => code)
        ),
      };
    });
    navigate(`/dashboard/${username}`);
  };

  useEffect(() => {
    console.log(location.state);
    if (!location.state || !location.state.email || !location.state.password)
      navigate("/sign-up");
  }, []);

  return (
    <FillPageWithSidePic>
      <Stack>
        <SignUpAndLoginTop
          backTo="/sign-up"
          title={t("LETS_SETUP")}
          subtitle={t("CREATE_PROFILE")}
        />

        <Stack component="form" p={4} spacing={2} onSubmit={onSubmit}>
          <Box marginX={"auto"}>
            <Avatar
              sx={{
                width: { xs: "100px", sm: "200px" },
                height: { xs: "100px", sm: "200px" },
              }}
              src={profileURL}
            />
            <Box
              position="relative"
              sx={{
                bottom: { xs: "50px", sm: "50px" },
                left: { xs: "50px", sm: "150px" },
              }}
            >
              <Fab color="secondary" onClick={() => fileInput.current.click()}>
                <input
                  hidden
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={changeImage}
                />
                <Add />
              </Fab>
            </Box>
          </Box>

          <TextField
            fullWidth
            variant="standard"
            placeholder="Full Name"
            name="name"
            id="name"
            value={name}
            onChange={onNameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="standard"
            placeholder="username"
            name="username"
            id="username"
            value={username}
            onChange={onUsernameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="h6" mr={1}>
                    @
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          <SelectLanguage />

          <FormControlLabel
            sx={{ width: "100%" }}
            control={<Checkbox defaultChecked />}
            label={t("KEEP_ME_SIGNED_IN")}
          />

          <FormControlLabel
            sx={{ width: "100%" }}
            control={<Checkbox defaultChecked />}
            label={t("MAIL_ME_ABOUT_OFFERS")}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!username}
          >
            {t("CREATE_ACCOUNT")}
          </Button>

          <Divider>{t("OR_SIGN_IN_WITH")}</Divider>

          <Button startIcon={<Google />}>Google</Button>
          <Button href="/signin">{t("ALREADY_HAVE_ACCOUNT?")}</Button>
        </Stack>
      </Stack>
    </FillPageWithSidePic>
  );
}
