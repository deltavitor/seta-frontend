import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { Marker, type MarkerProps } from "../modules/core";
import { MapPin } from "lucide-react";
import { defaultMarkerSize, selectedNotificationLocationMarkerSize } from "./marker-icon-sizes";
import colors from "./../styles/colors.module.scss";

const createMarkerIcon = (color: MarkerProps["color"], shape: MarkerProps["shape"], markerSize: MarkerProps["markerSize"], isBlurred: MarkerProps["isBlurred"] = false) => {
    return new DivIcon({
        html: renderToString(
            <Marker color={color} shape={shape} markerSize={markerSize} isBlurred={isBlurred} />
        ),
        iconSize: [markerSize, markerSize],
        className: "",
    });
};

const yellowDiamondIcon = createMarkerIcon("yellow", "diamond", defaultMarkerSize);
const blurredYellowDiamondIcon = createMarkerIcon("yellow", "diamond", defaultMarkerSize, true);

const redDiamondIcon = createMarkerIcon("red", "diamond", defaultMarkerSize);
const blurredRedDiamondIcon = createMarkerIcon("red", "diamond", defaultMarkerSize, true);

const blueDiamondIcon = createMarkerIcon("blue", "diamond", defaultMarkerSize);
const blurredBlueDiamondIcon = createMarkerIcon("blue", "diamond", defaultMarkerSize, true);

const yellowCircleIcon = createMarkerIcon("yellow", "circle", defaultMarkerSize);
const blurredYellowCircleIcon = createMarkerIcon("yellow", "circle", defaultMarkerSize, true);

const redCircleIcon = createMarkerIcon("red", "circle", defaultMarkerSize);
const blurredRedCircleIcon = createMarkerIcon("red", "circle", defaultMarkerSize, true);

const blueCircleIcon = createMarkerIcon("blue", "circle", defaultMarkerSize);
const blurredBlueCircleIcon = createMarkerIcon("blue", "circle", defaultMarkerSize, true);

const selectedNotificationLocationIcon = new DivIcon({
    html: renderToString(
        <MapPin size={selectedNotificationLocationMarkerSize} color={colors["teal500"]} fill={colors["white"]}/>
    ),
    iconSize: [selectedNotificationLocationMarkerSize, selectedNotificationLocationMarkerSize],
    className: "",
});

export {
    yellowDiamondIcon,
    blurredYellowDiamondIcon,
    redDiamondIcon,
    blurredRedDiamondIcon,
    blueDiamondIcon,
    blurredBlueDiamondIcon,
    yellowCircleIcon,
    blurredYellowCircleIcon,
    redCircleIcon,
    blurredRedCircleIcon,
    blueCircleIcon,
    blurredBlueCircleIcon,
    selectedNotificationLocationIcon,
};
