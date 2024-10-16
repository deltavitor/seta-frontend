import { LayerGroup, LayersControl, Marker } from "react-leaflet";
import React, { type ReactNode, useContext } from "react";
import type { NotificationLocation } from "../../types";
import { Marker as SetaMarker } from "../core";
import { defaultMarkerSize, selectedNotificationLocationIcon } from "../../consts";
import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { getNotificationIcon } from "../../utils";
import { SelectedNotificationContext } from "../../contexts";

type MapNotificationsLayer = {
    notificationLocations?: Array<NotificationLocation>,
};

function MapNotificationsLayer(props: MapNotificationsLayer) {

    const selectedNofication = useContext(SelectedNotificationContext);

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
        if (!selectedNofication) return;

        selectedNofication.setSelectedNotificationLocation(notificationLocation)
        if (notificationLocation.notifications.length === 1)
            selectedNofication.setSelectedNumeroNotificacao(notificationLocation.notifications[0].numeroNotificacao);
        else
            selectedNofication.setSelectedNumeroNotificacao("-1");
    };

    return (
        <LayersControl.Overlay name={"notifications"} checked={true}>
            <LayerGroup>
                {props.notificationLocations?.map((notificationLocation, index) => {
                    return getNotificationLocationMarker(index, notificationLocation, selectedNofication?.selectedNotificationLocation)
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    );
}

export default MapNotificationsLayer;
