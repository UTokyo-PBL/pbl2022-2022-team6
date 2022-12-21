import { useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
import { InputAdornment, TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import RoomIcon from '@mui/icons-material/Room';
import { useState } from "react";


type PlacesProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setOffice }: PlacesProps) {

    const [place, setPlace] = useState<any | null>(null);


    const { ref: placesRef } = usePlacesWidget({
        apiKey: process.env.GOOGLE_API_KEY,
        onPlaceSelected: (selectedplace) => {
            setPlace(selectedplace);

            const lat = selectedplace?.geometry?.location?.lat()
            const lng = selectedplace?.geometry?.location?.lng()
            if (lat !== undefined && lng !== undefined) {
                setOffice({ lat, lng })
            }
        }
    });

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
            inputRef={placesRef}
            color="primary"
            placeholder="Tokyo, Japan"
            // fullWidth
            sx={{ m: 1, backgroundColor: 'white', width: '96%' }}
        />
    );
}
