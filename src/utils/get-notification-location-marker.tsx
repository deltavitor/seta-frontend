import type { NotificationLocation } from "../types";
import React, { type ReactNode } from "react";
import { defaultMarkerSize, selectedNotificationLocationIcon } from "../consts";
import { getNotificationIcon } from "./index";
import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { Marker as SetaMarker } from "../modules/core";
import { Marker } from "react-leaflet";

function getNotificationLocationMarker(
    index: number,
    notificationLocation: NotificationLocation,
    selectedNotificationLocation: NotificationLocation | undefined,
    isBlurred: boolean,
    onClick: (notificationLocation: NotificationLocation) => any,
): ReactNode {
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
                    isBlurred={isBlurred}
                />
            ),
            iconSize: [defaultMarkerSize, defaultMarkerSize],
            className: "",
        });
    else
        icon = getNotificationIcon(firstNotification, isBlurred);

    return (
        <Marker
            key={index}
            icon={icon}
            position={[latitude, longitude]}
            eventHandlers={{
                click: () => onClick(notificationLocation)
            }}
        />
    );
}

export default getNotificationLocationMarker;
