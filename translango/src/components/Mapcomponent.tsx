/// <reference types="@types/google.maps" />
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  OverlayView,
} from "@react-google-maps/api";
import { Card, CardMedia, Popover } from "@mui/material";
import DashboardController from "../controllers/dashboard/dashboard.controller";
import "./mapcomponent.css";
import Places from "./places";
import SmallerViewObject from "./SmallerViewObject";
import AppCtx, {
  GeoCoordinates,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNKzmgqLSVBnT05TLmkkiBR_s9JwnM2ko",
    libraries: ["places"],
  });

  // console.log(isLoaded)
  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

const styles = {
  width: "100%",
  height: "100vh",
};

const DEFAULT_OPTIONS = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  rotateControl: false,
  scaleControl: false,
  mapId: "208b77f6f7536855",
  panControl: false,
  overviewMapControl: false,
  zoomControl: false,
  // scaleControl: false,
};

const markers: {
  image_url: string;
  position: GeoCoordinates;
  text: string;
}[] = [
  {
    image_url:
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: { lat: 44, lng: -80 },
    text: "オウム",
  },
  {
    image_url:
      "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: { lat: 42, lng: -74 },
    text: "オウム",
  },
  {
    image_url:
      "https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // target_text: "Children",
    // target_language: "ja",
    position: { lat: 41, lng: -70 },
    text: "子供達",
  },
  {
    image_url:
      "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    text: "女の子",
    position: { lat: 45, lng: -79 },
  },
  {
    image_url:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1600",
    text: "犬",
    position: { lat: 42, lng: -81 },
  },
  {
    image_url:
      "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    text: "घोड़ा",
    position: { lat: 40, lng: -76 },
  },
];

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openId, setOpenId] = useState("");
  const [office, setOffice] = useState<google.maps.LatLngLiteral>();
  const [bottom, setBottom] = useState(470);
  const mapRef = useRef<GoogleMap>();
  const [isMobile, setIsMobile] = useState(false);

  const ctx = useContext(AppCtx);
  const t = (key: TRANSLATION_KEYS) =>
    ctx.translations[ctx.nativeLanguage]
      ? ctx.translations[ctx.nativeLanguage][key]
      : ctx.translations["en"][key];
  // const [userLocation, setUserLocation] = useState<Array<GeoCoordinates>>([]);

  const getLocation = () => {
    const index = Math.floor(Math.random() * 6);
    console.log(ctx.dummyLocations);
    if (ctx.dummyLocations) {
      const loc = ctx.dummyLocations[index];
      console.log(loc);
      if (loc) {
        loc.lat = Math.floor(Math.random() * 10) + loc.lat;
        loc.lng = Math.floor(Math.random() * 10) + loc.lng;

        return { lat: loc!.lat, lng: loc!.lng };
      }
    }
    return { lat: 44, lng: -80 };
  };

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    onLoad(map);
  };

  const handleOpenInfo = (
    event: React.MouseEvent<HTMLDivElement>,
    key: string
  ) => {
    // console.log(event.currentTarget)
    if (openId === key) {
      handleClose();
      return;
    }
    setAnchorEl(event.currentTarget);
    setOpenId(key);
  };

  const handleClose = () => {
    console.log("closing");
    setAnchorEl(null);
    setOpenId("");
  };

  const custom_marker = {
    path: "M 12 2 C 8.13 2 5 5.13 5 9 c 0 5.25 7 13 7 13 s 7 -7.75 7 -13 c 0 -3.87 -3.13 -7 -7 -7 z z",
    strokeColor: "#6938D3",
    strokeWeight: 8,
    anchor: new google.maps.Point(16, 28),
  };

  const getItems = () => {
    DashboardController.getItems().then((OpenAPIResponse) => {
      if (OpenAPIResponse.status === 200) {
        // console.log(OpenAPIResponse)
      } else {
        alert("Something went wrong. Please check your details and try again");
      }
    });
  };

  useEffect(() => {
    // getItems();
    window.addEventListener("resize", handleResize);

    if (isMobile) {
      setBottom(580);
    } else {
      setBottom(470);
    }
  }, [window.innerWidth]);

  return (
    <>
      <GoogleMap
        onLoad={handleOnLoad}
        zoom={7}
        mapContainerStyle={styles}
        options={DEFAULT_OPTIONS}
      >
        <Places
          setOffice={(position) => {
            console.log(position);
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {markers.map(({ image_url, position, text }, key) => (
          <MarkerF key={key} position={getLocation()} icon={custom_marker}>
            <InfoWindowF
              position={position}
              options={{ pixelOffset: new window.google.maps.Size(0, 24) }}
            >
              <Card
                sx={{ maxHeight: 60, maxWidth: 60 }}
                id={`${key}`}
                onClick={(event) => handleOpenInfo(event, `${key}`)}
              >
                <CardMedia
                  component="img"
                  image={image_url}
                  alt="A photo"
                  sx={{ paddingLeft: 0.5, objectFit: "contain" }}
                />
                <Popover
                  id={`${key}`}
                  open={openId === `${key}`}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: bottom, left: 0 }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{ width: "100%" }}
                >
                  <SmallerViewObject
                    date="12/12/2022"
                    rawurl={image_url}
                    onLoad={handleClose}
                    detectedObject={text}
                  />
                </Popover>
              </Card>
            </InfoWindowF>
          </MarkerF>
        ))}
      </GoogleMap>
    </>
  );
}
