import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
interface Props {
  backTo: string;
  title: string;
  subtitle: string;
}

const SignUpAndLoginTop: React.FC<Props> = ({ backTo, title, subtitle }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Stack bgcolor="primary.main" p={2} color={theme.palette.lightText!.main}>
      <Box component="span" position="relative">
        {/* <IconButton component={RouterLink} to={backTo}><ArrowBack/></IconButton> */}
        <Chip icon={<ArrowBack />} onClick={() => navigate(backTo)} />
      </Box>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h2">{subtitle}</Typography>
    </Stack>
  );
};

export default SignUpAndLoginTop;
