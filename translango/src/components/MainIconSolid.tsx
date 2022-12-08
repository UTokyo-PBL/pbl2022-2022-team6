import { Avatar } from "@mui/material";
import TranslanGoIconWhite from "../Assets/TranslanGoIconWhite.svg";
import TranslanGoIconDark from "../Assets/TranslanGoIconDark.svg";

const MainIconSolid: React.FC<{ darklogo: boolean }> = ({ darklogo }) => {
  const icon = darklogo ? TranslanGoIconDark : TranslanGoIconWhite;
  const avatarStyle = {
    bgcolor: "transparent",
    width: 24,
    height: 24,
    m: 1,
  };

  return (
    <Avatar variant="rounded" sx={avatarStyle} sizes="(max-height: 40%)">
      <img src={icon} alt="translango-logo" height="100%" />
    </Avatar>
  );
};

export default MainIconSolid;
