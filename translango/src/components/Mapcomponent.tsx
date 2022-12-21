import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, OverlayView } from "@react-google-maps/api";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Box, Card, CardContent, CardMedia, CssBaseline, Popover, ThemeProvider, Typography } from "@mui/material";
import DashboardController from "../controllers/dashboard/dashboard.controller";
import theme from "../theme/theme";
import './mapcomponent.css'
import { PropaneSharp } from "@mui/icons-material";
import { ClickAwayListener } from '@mui/base';
import ViewObject from "./viewObject";
import Places from "./places";


export default function MapComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_API_KEY,
        libraries: ['places']
    });

    // console.log(isLoaded)
    if (!isLoaded) return <div>Loading...</div>;

    return <Map />;
}

const styles = {
    width: '100%',
    height: '100vh',

};

const DEFAULT_OPTIONS = {
    mapTypeControl: false,
    streetViewControl: false,
    fullScreenControl: false,
    rotateControl: false,
    scaleControle: false,
    mapId: '208b77f6f7536855'
}

const markers = [
    {
        key: 'item1',
        image_url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        position: { lat: 44, lng: -80 }
    },
    {
        key: 'item2',
        image_url: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        position: { lat: 42, lng: -74 }
    }
]

function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);


    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [openId, setOpenId] = useState('');
    const [office, setOffice] = useState<google.maps.LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
        onLoad(map);
    };

    const handleOpenInfo = (event: React.MouseEvent<HTMLDivElement>, key: string) => {
        console.log(key)
        if (openId === key) {
            handleClose()
            return;
        }
        setAnchorEl(event.currentTarget);
        setOpenId(key);

    };

    const handleClose = () => {
        console.log("closing")
        setAnchorEl(null);
        setOpenId("")
    };

    const custom_marker = {
        path: 'M 12 2 C 8.13 2 5 5.13 5 9 c 0 5.25 7 13 7 13 s 7 -7.75 7 -13 c 0 -3.87 -3.13 -7 -7 -7 z z',
        strokeColor: "#6938D3",
        strokeWeight: 8,
        anchor: new google.maps.Point(16, 28)
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <GoogleMap onLoad={handleOnLoad} zoom={9} mapContainerStyle={styles} options={DEFAULT_OPTIONS}>
                <Places
                    setOffice={(position) => {
                        console.log(position)
                        setOffice(position);
                        mapRef.current?.panTo(position);
                    }}
                />
                {markers.map(({ key, image_url, position }) => (
                    <MarkerF
                        key={key}
                        position={position}
                        icon={custom_marker}
                    >
                        <InfoWindowF position={position} options={{ pixelOffset: new window.google.maps.Size(0, 24) }}>

                            <Card sx={{ maxHeight: 60, maxWidth: 60 }} id={key} onClick={(event) => handleOpenInfo(event, key)} >

                                <CardMedia
                                    component="img"
                                    image={image_url}
                                    alt="A photo"
                                    sx={{ paddingLeft: 0.5, objectFit: 'contain' }}
                                />
                                <Popover
                                    id={key}
                                    open={openId === key}
                                    anchorEl={anchorEl}

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: 1000, left: 0 }}

                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}

                                    sx={{ width: '80%' }}
                                >
                                    <ViewObject date="12/12/2022" rawurl={image_url} onLoad={handleClose} detectedObject="いぬ" />
                                </Popover>
                            </Card>

                        </InfoWindowF>
                    </MarkerF>
                ))}

            </GoogleMap>

        </ThemeProvider >

    );
}