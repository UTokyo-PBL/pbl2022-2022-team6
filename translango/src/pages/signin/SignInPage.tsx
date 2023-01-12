import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import FillPageWithSidePic from "../../components/FillPageWithSidePic";
import AppCtx, {
  AppCtxUpdater,
  TRANSLATION_KEYS,
} from "../../store/app-state-context";
import GeneralController from "../../controllers/general.controller";
import { Alert } from "@mui/material";
import { useContext, useState } from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="subtitle1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">TranslanGo</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInPage() {
  const ctx = useContext(AppCtx);
  const ctxUpdater = useContext(AppCtxUpdater);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUsername(event.target.value.trim());
  };

  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await GeneralController.signin(username, password);
      localStorage.setItem(
        "auth-token",
        `Bearer ${user.token.access_token_data}`
      );
      ctxUpdater(function (oldCtx) {
        return {
          ...oldCtx,
          isLoggedIn: true,
          username: user.username,
          email: user.email,
          firstName: user.firstname,
          lastName: user.lastname,
          favouriteLanguages: new Set(
            user.favourite_languages.map(({ code }) => code)
          ),
          nativeLanguage: user.primary_lang,
        };
      });
      navigate("/");
    } catch (e) {
      // try ends
      localStorage.removeItem("auth-token");
      setShowError(true);
      setPassword("");
    } // catch(e) ends
  };

  return (
    <FillPageWithSidePic>
      <TopNavigation />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("SIGN_IN")}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t("USERNAME")}
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={onUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onPasswordChange}
          />
          {showError && (
            <Alert severity="error">{t("USERNAME_OR_PASSWORD_IS_WRONG")}</Alert>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("SIGN_IN")}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {t("FORGOT_PASS")}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {t("DONT_HAVE_ACCOUNT_SIGN_UP")}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </FillPageWithSidePic>
  );
}
