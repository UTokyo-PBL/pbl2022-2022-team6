import { Avatar } from "@mui/material";
import TranslanGoIcon from "../Assets/TranslanGoIcon.svg";

const MainIcon: React.FC<{ background: string }> = ({ background }) => {
  const avatarStyle = {
    bgcolor: background,
    m: 2,
  };
  return (
    <Avatar variant="square" sx={avatarStyle} sizes="(max-height: 100%)">
      <img src={TranslanGoIcon} alt="translango-icon" height="100%" />
    </Avatar>
  );
};

export default MainIcon;
