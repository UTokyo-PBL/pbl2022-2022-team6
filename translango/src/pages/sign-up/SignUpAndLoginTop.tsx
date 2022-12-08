import { ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
interface Props {
  backTo: string;
  title: string;
  subtitle: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

const SignUpAndLoginTop: React.FC<Props> = ({ backTo, title, subtitle }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate(backTo)}
          >
            <ChevronLeft />
          </IconButton>
          <Box sx={{ flexGrow: 1, alignSelf: "flex-end" }}>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: "flex-end" }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              noWrap
              sx={{ flexGrow: 1, alignSelf: "flex-end" }}
            >
              {subtitle}
            </Typography>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default SignUpAndLoginTop;
