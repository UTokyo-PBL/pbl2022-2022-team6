import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

const FillPageWithSidePic: React.FC<PropsWithChildren> = (props) => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random?purple,dark,books)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default FillPageWithSidePic;
