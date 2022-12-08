import { Email, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import SignUpAndLoginTop from "../SignUpAndLoginTop";

const GetSignUpDetails: React.FC = () => {
  return (
    <FillPageWithSidePic>
      <Box>
        <SignUpAndLoginTop
          backTo="/"
          title="Let's register"
          subtitle="Discovery awaits!"
        />
        <Stack component="form" p={2} spacing={4}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="example@translango.com"
            type="email"
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
            placeholder="confirm password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Chip
            label={
              <p>
                We keep you safe! Our password is encrypted and inaccessible to
                anyone excpept you!
              </p>
            }
            color="success"
            // sx={{
            //   bgcolor: "success.light",
            //   width: "100%",
            //   overflowWrap: 'break-word'
            //   // height: 'auto'
            // }}
          />

          <Button
            // sx={{p: 1.5}}
            variant="contained"
          >
            Sign Up
          </Button>
          <Divider>OR</Divider>
          <Button
            variant="outlined"
            // sx={{p: 1}}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </FillPageWithSidePic>
  );
};

export default GetSignUpDetails;
