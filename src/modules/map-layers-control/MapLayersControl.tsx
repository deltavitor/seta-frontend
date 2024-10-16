import { MapHeatmapLayer, MapNotificationsLayer } from "../index";
import { LayersControl } from "react-leaflet";
import React, { useContext, useEffect, useState } from "react";
import type { Notification, NotificationLocation } from "../../types";
import { getNotificationType } from "../../utils";
import { NotificationFilterContext } from "../../contexts";
import NotificationSummary from "../../types/notification-summary";
import { useInterval } from "../../hooks";

type MapLayersControlProps = {
    notificationLocations: Array<NotificationLocation>;
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function MapLayersControl(props: MapLayersControlProps) {

    const [filteredNotificationLocations, setFilteredNotificationLocations] = useState<Array<NotificationLocation>>();
    const notificationFilters = useContext(NotificationFilterContext);

    // These inputs are programmatically toggled by our custom controls
    const layerControlInputs = document.querySelectorAll<HTMLInputElement>(".leaflet-control-layers-selector");

    const isNotificationWithinTimeRange = (
        notification: Notification | NotificationSummary,
        startDate: Date,
        endDate: Date
    ) => {
        return notification.dataNotificacaoParsed &&
            notification.dataNotificacaoParsed >= startDate && notification.dataNotificacaoParsed <= endDate;
    };

    useInterval(() => {
        const startDate = props.earliestNotificationDate;
        if (!notificationFilters) return;

        notificationFilters.setNotificationTimeFilter(prevFilter => {
            if (!prevFilter.endDate) return prevFilter;
            const endDate = new Date(prevFilter.endDate);
            endDate.setDate(endDate.getDate() + 1);
            if (endDate > props.latestNotificationDate) notificationFilters.setTimelineIsPlaying(false);

            return {
                startDate: startDate,
                endDate: endDate,
            };
        });
    }, notificationFilters?.timelineIsPlaying ? notificationFilters?.timelineDelay : null);

    useEffect(() => {
        if (!notificationFilters) return;

        setFilteredNotificationLocations(props.notificationLocations?.map(notificationLocation => {
            const filteredNotifications = notificationLocation.notifications.filter(notification => {
                const notificationTypeCondition = notificationFilters.notificationTypeFilter[getNotificationType(notification)];
                const notificationTimeCondition = notificationFilters.notificationTimeFilter.startDate && notificationFilters.notificationTimeFilter.endDate ?
                    isNotificationWithinTimeRange(
                        notification,
                        notificationFilters.notificationTimeFilter.startDate,
                        notificationFilters.notificationTimeFilter.endDate
                    ) : true;
                return notificationTypeCondition && notificationTimeCondition;
            });

            return {
                ...notificationLocation,
                notifications: filteredNotifications
            };
        }).filter(notificationLocation => notificationLocation.notifications.length > 0));
    }, [notificationFilters?.notificationTypeFilter, notificationFilters?.notificationTimeFilter]);

    useEffect(() => {
        layerControlInputs.forEach(input => {
            input.nextElementSibling && input.nextElementSibling.textContent?.trim() === "notifications" ? input.click() : null;
        });
    }, [notificationFilters?.mapLayerFilter.notifications]);

    useEffect(() => {
        layerControlInputs.forEach(input => {
            input.nextElementSibling && input.nextElementSibling.textContent?.trim() === "heatmap" ? input.click() : null;
        });
    }, [notificationFilters?.mapLayerFilter.heatmap]);

    return (
        <LayersControl position={"topleft"}>
            <MapNotificationsLayer
                notificationLocations={filteredNotificationLocations}
            />
            <MapHeatmapLayer
                notificationLocations={filteredNotificationLocations}
            />
        </LayersControl>
    );
}

export default MapLayersControl;
