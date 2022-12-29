import { Email, Lock } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import SignUpAndLoginTop from "../SignUpAndLoginTop";

export default function GetSignUpDetails(props: any) {

  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = event.currentTarget;
    // const isValid = data.email.value !== '' && data.password.value !== '';

    const user_data = {
      email: data.email.value,
      password: data.password.value,
      confirmpassword: data.confirmpassword.value,
    };
    console.log(user_data)

    if ((user_data.password !== user_data.confirmpassword) || (!user_data.email) || (!user_data.password) || (!user_data.confirmpassword)) {
      setInvalidPassword(true);
    }
    else {
      navigate('/sign-up/create-profile', { state: user_data })
    }
  }

  return (
    <FillPageWithSidePic>
      <Box sx={{ maxWidth: '100vh' }}>
        <SignUpAndLoginTop
          backTo="/"
          title="Let's register"
          subtitle="Discovery awaits!"
        />
        <Stack component="form" noValidate onSubmit={handleSubmit} p={2} spacing={4}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="example@translango.com"
            type="email"
            id="email"
            name="email"
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
            placeholder="password"
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
            placeholder="confirm password"
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
          {invalidPassword ? <Alert severity="error">Something went wrong, please try again</Alert> : <Alert>We keep you safe! Our password is encrypted and inaccessible to
            anyone excpept you!</Alert>}

          <Button
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
          <Divider>OR</Divider>
          <Button
            variant="outlined"
          >
            Login
          </Button>
        </Stack>
      </Box>
    </FillPageWithSidePic>
  );
};
