import { LayerGroup, LayersControl } from "react-leaflet";
import React, { useContext, useEffect } from "react";
import type { NotificationLocation } from "../../types";
import { getNotificationLocationMarker, isWithinDateRange, isWithinRadius } from "../../utils";
import { SelectedNotificationContext } from "../../contexts";
import { spreadingPeriod, spreadingRadius } from "../../consts";

type MapNotificationsLayer = {
    notificationLocations?: Array<NotificationLocation>,
};

function MapNotificationsLayer(props: MapNotificationsLayer) {

    const selectedNofication = useContext(SelectedNotificationContext);

    const handleMarkerClick = (notificationLocation: NotificationLocation) => {
        if (!selectedNofication) return;

        selectedNofication.setSelectedNotificationLocation(notificationLocation)
        if (notificationLocation.notifications.length === 1)
            selectedNofication.setSelectedNumeroNotificacao(notificationLocation.notifications[0].numeroNotificacao);
        else
            selectedNofication.setSelectedNumeroNotificacao("-1");
    };

    useEffect(() => {
        if (!selectedNofication) return;

        selectedNofication.setRelatedNotificationLocations(props.notificationLocations?.map(relatedNotificationLocation => {
            const relatedNotifications = relatedNotificationLocation.notifications.filter(notification => {
                if (!notification.dataDiagnosticoSintomaParsed || !selectedNofication.selectedNotificationDataSintomas || !selectedNofication.selectedNotificationLocation)
                    return false;
                if (notification.numeroNotificacao === selectedNofication.selectedNumeroNotificacao)
                    return false;

                if (!isWithinRadius(
                    [relatedNotificationLocation.latitude, relatedNotificationLocation.longitude],
                    [selectedNofication.selectedNotificationLocation.latitude, selectedNofication.selectedNotificationLocation.longitude],
                    // Spreading radius in Km
                    spreadingRadius / 1000
                ))
                    return false;

                return isWithinDateRange(
                    notification.dataDiagnosticoSintomaParsed,
                    selectedNofication.selectedNotificationDataSintomas,
                    spreadingPeriod
                );
            });

            return {
                ...relatedNotificationLocation,
                notifications: relatedNotifications,
            };
        }).filter(notificationLocation => notificationLocation.notifications.length > 0));
    }, [selectedNofication?.selectedNotificationDataSintomas]);

    return (
        <LayersControl.Overlay name={"notifications"} checked={true}>
            <LayerGroup>
                {props.notificationLocations?.map((notificationLocation, index) => {
                    return getNotificationLocationMarker(
                        index,
                        notificationLocation,
                        selectedNofication?.selectedNotificationLocation,
                        !["0", "-1", "-2"].includes(selectedNofication?.selectedNumeroNotificacao ?? "") && selectedNofication?.selectedNotificationLocation !== undefined,
                        handleMarkerClick
                    );
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    );
}

export default MapNotificationsLayer;
