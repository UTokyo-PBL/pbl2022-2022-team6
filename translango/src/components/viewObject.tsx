import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  detectedObject: string;
  date?: Date;
  rawurl: string;
}
export default function ViewObject(props: Props) {
  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            Object: {props.detectedObject}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Taken on:{" "}
            {props.date
              ? props.date.toLocaleString().split(",")[0]
              : new Date().toLocaleString().split(",")[0] + ""}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 200, marginLeft: "auto" }}
        image={props.rawurl}
        alt="Detected Object"
      />
    </Card>
  );
}
