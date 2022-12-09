import { Box, Button, Divider, OutlinedInput, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import FillPageWithSidePic from "../../../components/FillPageWithSidePic";
import OTPInput from "../../../components/OTPInput";
import AppCtx from "../../../store/app-state-context";
import SignUpAndLoginTop from "../SignUpAndLoginTop";
import ConfirmEmailPic from "./confirm-email-logo.svg";

const ConfirmEmail: React.FC = () => {
  const ctx = useContext(AppCtx);
  return (
    <FillPageWithSidePic>
      <SignUpAndLoginTop
        backTo="/sign-up"
        title="One more step."
        subtitle="Confirm your email address so we can get started!"
      />
      <Stack p={2} alignItems="center">
        <Box component="img" src={ConfirmEmailPic} />

        <Typography gutterBottom>
          We will send you one time password on this email address.
        </Typography>
        <Typography variant='h6' component='p' gutterBottom>({ctx.email || "example@translango.com"})</Typography>

        <OTPInput inputLength={4}></OTPInput>

        <Button fullWidth variant='contained'>Submit</Button>
      </Stack>
    </FillPageWithSidePic>
  );
};

export default ConfirmEmail;
