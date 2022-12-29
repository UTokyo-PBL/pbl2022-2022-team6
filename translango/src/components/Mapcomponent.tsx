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
import SmallerViewObject from "./SmallerViewObject";


export default function MapComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCNKzmgqLSVBnT05TLmkkiBR_s9JwnM2ko",
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
    fullscreenControl: false,
    rotateControl: false,
    scaleControl: false,
    mapId: '208b77f6f7536855',
    panControl: false,
    overviewMapControl: false,
    zoomControl: false,
    // scaleControl: false,
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
    const [bottom, setBottom] = useState(470)
    const mapRef = useRef<GoogleMap>();
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
        onLoad(map);
    };

    const handleOpenInfo = (event: React.MouseEvent<HTMLDivElement>, key: string) => {
        // console.log(event.currentTarget)
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

    const getItems = () => {
        DashboardController.getItems().then((OpenAPIResponse) => {
            if (OpenAPIResponse.status === 200) {
                // console.log(OpenAPIResponse)
            } else {
                alert('Something went wrong. Please check your details and try again');
            }
        })
    }

    useEffect(() => {
        getItems()
        window.addEventListener("resize", handleResize)

        if (isMobile) {
            setBottom(580)
        } else {
            setBottom(470)
        }
    }, [window.innerWidth]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <GoogleMap onLoad={handleOnLoad} zoom={7} mapContainerStyle={styles} options={DEFAULT_OPTIONS}>
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
                                    anchorPosition={{ top: bottom, left: 0 }}

                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}

                                    sx={{ width: '100%' }}
                                >
                                    <SmallerViewObject date="12/12/2022" rawurl={image_url} onLoad={handleClose} detectedObject="いぬ" />
                                </Popover>
                            </Card>
                        </InfoWindowF>
                    </MarkerF>
                ))}

            </GoogleMap>

        </ThemeProvider >

    );
}