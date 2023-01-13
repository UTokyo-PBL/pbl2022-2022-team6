import { InputAdornment, TextField } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { useState } from "react";

type PlacesProps = {
  setOffice: (position: any) => void;
};

export default function Places({ setOffice }: PlacesProps) {
  const [place, setPlace] = useState<any | null>(null);

  return (
    <TextField
      variant="filled"
      label="Location"
      name="location"
      id="location"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <RoomIcon color="primary" />
          </InputAdornment>
        ),
      }}
      // inputRef={placesRef}
      color="primary"
      placeholder="Tokyo, Japan"
      // fullWidth
      sx={{ m: 1.8, backgroundColor: "white", width: "94%" }}
    />
  );
}
