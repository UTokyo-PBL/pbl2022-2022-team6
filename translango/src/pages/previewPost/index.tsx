import { Grid } from "@mui/material";

import { useLocation, useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import SinglePost from "../../components/singlePost";

export default function PreviewPost(props: any) {
  const location = useLocation();
  const { translationID } = useParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user_data = {
      email: "example@translango.com",
      password: "passw0rd",
    };
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <TopNavigation />
        <Grid item xs={3}>
          <SinglePost
            photo_id={translationID}
            photo_url={location.state.rawurl}
            date={new Date().toLocaleString().split(",")[0] + ""}
          />
        </Grid>
      </Grid>
    </>
  );
}
