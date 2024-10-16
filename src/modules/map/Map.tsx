import { MapContainer, TileLayer } from "react-leaflet";
import type { Notification, NotificationLocation } from "../../types";
import React from "react";
import { MapLayersControl } from "../index";

type MapProps = {
    notificationLocations: Array<NotificationLocation>;
    setSelectedNumeroNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>;
    selectedNotificationLocation?: NotificationLocation;
    setSelectedNotificationLocation: React.Dispatch<React.SetStateAction<NotificationLocation | undefined>>;
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
                selectedNotificationLocation={props.selectedNotificationLocation}
                setSelectedNumeroNotificacao={props.setSelectedNumeroNotificacao}
                setSelectedNotificationLocation={props.setSelectedNotificationLocation}
                earliestNotificationDate={props.earliestNotificationDate}
                latestNotificationDate={props.latestNotificationDate}
            />
        </MapContainer>
    );
}

export default Map;
