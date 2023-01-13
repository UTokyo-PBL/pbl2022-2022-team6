import { Map as OlMap, View as OlView } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useEffect } from "react";
import AppCtx, {
  GeoCoordinates,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

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

export default function MapComponent() {
  useEffect(() => {
    const ol_map = new OlMap({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new OlView({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }, []);

  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
      }}
      id="map"
    ></div>
  );
}
