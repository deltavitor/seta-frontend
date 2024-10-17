import colors from "../../styles/colors.module.scss";
import { Circle, LayerGroup, LayersControl } from "react-leaflet";
import React, { useContext } from "react";
import { SelectedNotificationContext } from "../../contexts";
import { getNotificationLocationMarker } from "../../utils";
import { spreadingRadius } from "../../consts";
import type { NotificationLocation } from "../../types";

function MapRelatedNotificationsLayer() {

    const selectedNofication = useContext(SelectedNotificationContext);

    const handleMarkerClick = (notificationLocation: NotificationLocation) => {
        if (!selectedNofication) return;

        selectedNofication.setSelectedNotificationLocation(notificationLocation)
        if (notificationLocation.notifications.length === 1)
            selectedNofication.setSelectedNumeroNotificacao(notificationLocation.notifications[0].numeroNotificacao);
        else
            selectedNofication.setSelectedNumeroNotificacao("-1");
    };

    return (
        <LayersControl.Overlay name={"related-notifications"} checked={true}>
            <LayerGroup>
                {selectedNofication?.selectedNotificationLocation &&
                    <Circle
                        center={[selectedNofication?.selectedNotificationLocation.latitude, selectedNofication?.selectedNotificationLocation.longitude]}
                        radius={spreadingRadius}
                        color={colors["red800"]}
                        opacity={0.3}
                        fillOpacity={0.1}
                        interactive={false}
                    />
                }
                {selectedNofication?.relatedNotificationLocations?.map((relatedNotificationLocation, index) => {
                    return getNotificationLocationMarker(index, relatedNotificationLocation, selectedNofication?.selectedNotificationLocation, false, handleMarkerClick);
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    );
}

export default MapRelatedNotificationsLayer;
