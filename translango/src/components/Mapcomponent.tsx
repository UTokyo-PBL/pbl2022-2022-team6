import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Card, CardMedia, Popover } from "@mui/material";
import DashboardController from "../controllers/dashboard/dashboard.controller";
import "./mapcomponent.css";
import Places from "./places";
import SmallerViewObject from "./SmallerViewObject";
import AppCtx, {
  GeoCoordinates,
  TRANSLATION_KEYS,
} from "../store/app-state-context";

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

export default function MapComponent() {
  const ol_map = new Map();
  return <></>;
}
