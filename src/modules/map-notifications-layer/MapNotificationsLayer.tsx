import { LayerGroup, LayersControl, Marker } from "react-leaflet";
import React, { type ReactNode } from "react";
import type { Notification, NotificationLocation } from "../../types";
import { Marker as SetaMarker } from "../core";
import { defaultMarkerSize, selectedNotificationLocationIcon } from "../../consts";
import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { getNotificationIcon } from "../../utils";

type MapNotificationsLayer = {
    notificationLocations?: Array<NotificationLocation>,
    selectedNotificationLocation?: NotificationLocation,
    setSelectedNotificationLocation: React.Dispatch<React.SetStateAction<NotificationLocation | undefined>>,
    setSelectedNumberoNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>,
};

function MapNotificationsLayer(props: MapNotificationsLayer) {

    const getNotificationLocationMarker = (
        index: number,
        notificationLocation: NotificationLocation,
        selectedNotificationLocation: NotificationLocation | undefined,
    ): ReactNode => {

        const { latitude, longitude } = notificationLocation;
        const isSelectedNotificationLocation = notificationLocation.numeroNotificationLocation === selectedNotificationLocation?.numeroNotificationLocation;

        const firstNotification = notificationLocation.notifications[0];
        if (!firstNotification) return null;

        let icon;
        if (isSelectedNotificationLocation)
            icon = selectedNotificationLocationIcon;
        else if (notificationLocation.notifications.length > 1)
            icon = new DivIcon({
                html: renderToString(
                    <SetaMarker
                        color={"white"}
                        shape={"circle"}
                        markerSize={defaultMarkerSize}
                        label={notificationLocation.notifications.length.toString()}
                    />
                ),
                iconSize: [defaultMarkerSize, defaultMarkerSize],
                className: "",
            });
        else
            icon = getNotificationIcon(firstNotification);

        // TODO update this to better handle the focused map marker

        return (
            <Marker
                key={index}
                icon={icon}
                position={[latitude, longitude]}
                eventHandlers={{
                    click: () => handleMarkerClick(notificationLocation)
                }}
            />
        );
    };

    const handleMarkerClick = (notificationLocation: NotificationLocation) => {
        props.setSelectedNotificationLocation(notificationLocation)
        if (notificationLocation.notifications.length === 1)
            props.setSelectedNumberoNotificacao(notificationLocation.notifications[0].numeroNotificacao);
        else
            props.setSelectedNumberoNotificacao("-1");
    };

    return (
        <LayersControl.Overlay name={"notifications"} checked={true}>
            <LayerGroup>
                {props.notificationLocations?.map((notificationLocation, index) => {
                    return getNotificationLocationMarker(index, notificationLocation, props.selectedNotificationLocation)
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    );
}

export default MapNotificationsLayer;
