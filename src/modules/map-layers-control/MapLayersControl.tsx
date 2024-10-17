import {
    MapHeatmapLayer,
    MapNotificationsLayer,
    MapRelatedNotificationsLayer
} from "../index";
import { LayersControl } from "react-leaflet";
import React, { useContext, useEffect, useState } from "react";
import type { Notification, NotificationLocation } from "../../types";
import { getNotificationType } from "../../utils";
import { NotificationFilterContext } from "../../contexts";
import NotificationSummary from "../../types/notification-summary";

type MapLayersControlProps = {
    notificationLocations: Array<NotificationLocation>;
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function MapLayersControl(props: MapLayersControlProps) {

    const [filteredNotificationLocations, setFilteredNotificationLocations] = useState<Array<NotificationLocation>>();
    const notificationFilters = useContext(NotificationFilterContext);

    const isNotificationWithinTimeRange = (
        notification: Notification | NotificationSummary,
        startDate: Date,
        endDate: Date
    ) => {
        return notification.dataDiagnosticoSintomaParsed &&
            notification.dataDiagnosticoSintomaParsed >= startDate && notification.dataDiagnosticoSintomaParsed <= endDate;
    };

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

    return (
        <LayersControl position={"topleft"}>
            <MapNotificationsLayer notificationLocations={filteredNotificationLocations} />
            <MapRelatedNotificationsLayer />
            <MapHeatmapLayer notificationLocations={filteredNotificationLocations} />
        </LayersControl>
    );
}

export default MapLayersControl;
