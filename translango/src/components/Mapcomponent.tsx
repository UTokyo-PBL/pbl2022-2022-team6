import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function MapComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
    });

    console.log(isLoaded)
    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

const styles = {
    width: '100%',
    height: '100vh',
};

function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap zoom={10} center={center} mapContainerStyle={styles}>
            <MarkerF position={center} />
        </GoogleMap>
    );
}