import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const ShareButton: React.FC = () => {
  return (
    <IconButton aria-label="share">
      <ShareIcon />
    </IconButton>
  );
};

export default ShareButton;
