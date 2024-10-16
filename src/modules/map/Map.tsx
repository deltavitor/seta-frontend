import { MapContainer, TileLayer } from "react-leaflet";
import type { NotificationLocation } from "../../types";
import React from "react";
import { MapLayersControl } from "../index";

type MapProps = {
    notificationLocations: Array<NotificationLocation>;
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function Map(props: MapProps) {

    const centerLatitude = props.notificationLocations[0]?.latitude;
    const centerLongitude = props.notificationLocations[0]?.longitude;

    return (
        <MapContainer center={[centerLatitude, centerLongitude]} zoom={14} zoomControl={false}
                      attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapLayersControl
                notificationLocations={props.notificationLocations}
                earliestNotificationDate={props.earliestNotificationDate}
                latestNotificationDate={props.latestNotificationDate}
            />
        </MapContainer>
    );
}

export default Map;
