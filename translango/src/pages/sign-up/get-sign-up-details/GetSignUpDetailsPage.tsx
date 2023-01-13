import { Email, Lock } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import AppCtx, { TRANSLATION_KEYS } from "../../../store/app-state-context";
import SignUpAndLoginTop from "../SignUpAndLoginTop";

export default function GetSignUpDetails() {
  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user_data = {
      email,
      password,
    };
    console.log(user_data);

    navigate("/sign-up/create-profile", { state: user_data });
  };

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value.trim());
  };

  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value.trim());
  };
  const onConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setConfirmPassword(e.target.value.trim());
  };

  return (
    <FillPageWithSidePic>
      <Box sx={{ maxWidth: "100vh" }}>
        <SignUpAndLoginTop
          backTo="/"
          title={t("LETS_REGISTER")}
          subtitle={t("DISCOVERY_AWAITS")}
        />
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit}
          p={2}
          spacing={4}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="example@translango.com"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="standard"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            required
            placeholder={t("PASSWORD")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            variant="standard"
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required
            placeholder={t("CONFIRM_PASSWORD")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          {/* <Box bgcolor="success.light" borderRadius="50px">
            <Typography variant="subtitle2" color="white" p={1} textAlign="center">
              
            </Typography>
          </Box> */}
          {!email ? (
            <Alert severity="warning">{t("MAIL_IS_REQD")}</Alert>
          ) : password && password !== confirmPassword ? (
            <Alert severity="error">{t("PASS_DONT_MATCH")}</Alert>
          ) : (
            <Alert>{t("WE_KEEP_YOU_SAFE")}</Alert>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={!email || !password || password !== confirmPassword}
          >
            {t("SIGN_UP")}
          </Button>
          <Divider>{t("OR")}</Divider>
          <Button variant="outlined">{t("LOGIN")}</Button>
        </Stack>
      </Box>
    </FillPageWithSidePic>
  );
}
