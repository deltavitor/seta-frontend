import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { Marker } from "../modules/core";
import { MapPin } from "lucide-react";
import { defaultMarkerSize, selectedNotificationLocationMarkerSize } from "./marker-icon-sizes";
import colors from "./../styles/colors.module.scss";

const yellowDiamondIcon = new DivIcon({
    html: renderToString(
        <Marker color={"yellow"} shape={"diamond"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const redDiamondIcon = new DivIcon({
    html: renderToString(
        <Marker color={"red"} shape={"diamond"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const blueDiamondIcon = new DivIcon({
    html: renderToString(
        <Marker color={"blue"} shape={"diamond"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const yellowCircleIcon = new DivIcon({
    html: renderToString(
        <Marker color={"yellow"} shape={"circle"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const redCircleIcon = new DivIcon({
    html: renderToString(
        <Marker color={"red"} shape={"circle"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const blueCircleIcon = new DivIcon({
    html: renderToString(
        <Marker color={"blue"} shape={"circle"} markerSize={defaultMarkerSize}/>
    ),
    iconSize: [defaultMarkerSize, defaultMarkerSize],
    className: "",
});

const selectedNotificationLocationIcon = new DivIcon({
    html: renderToString(
        <MapPin size={selectedNotificationLocationMarkerSize} color={colors["teal500"]} fill={colors["white"]}/>
    ),
    iconSize: [selectedNotificationLocationMarkerSize, selectedNotificationLocationMarkerSize],
    className: "",
});

export {
    yellowDiamondIcon,
    redDiamondIcon,
    blueDiamondIcon,
    yellowCircleIcon,
    redCircleIcon,
    blueCircleIcon,
    selectedNotificationLocationIcon,
};
