import "@fontsource-variable/inter";
import "./App.scss";
import {
    Map,
    MapCalendar,
    MapControlPanel,
    MapFooter,
    SideMenu,
    StartupCard,
    UnmappedNotificationsButton
} from "./modules";
import {
    useFindAllUnmappedNotifications,
    useFindNotificationLocations
} from "./hooks";
import React, { useEffect, useState } from "react";
import { parseDate } from "./utils";
import type { NotificationLocation, NotificationSummary } from "./types";
import NotificationPane from "./modules/notification-pane/NotificationPane";
import { NotificationFilterContextProvider, SelectedNotificationContextProvider } from "./contexts";
function App() {

    const { data: notificationLocationData, isLoading } = useFindNotificationLocations();
    const { data: unmappedNotificationsData } = useFindAllUnmappedNotifications();

    const [notificationLocations, setNotificationLocations] = useState<Array<NotificationLocation>>();
    const [validNotificationLocations, setValidNotificationLocations] = useState<Array<NotificationLocation>>();
    const [invalidNotifications, setInvalidNotifications] = useState<Array<NotificationSummary>>();
    const [unmappedNotifications, setUnmappedNotifications] = useState<Array<NotificationSummary>>();
    const [earliestDate, setEarliestDate] = useState(new Date());
    const [latestDate, setLatestDate] = useState(new Date(0));

    const getEarliestAndLatestNotifications = (notificationLocations: Array<NotificationLocation>) => {
        let earliest = new Date();
        // Create at the epoch
        let latest = new Date(0);

        notificationLocations?.forEach(notificationLocation => {
            notificationLocation.notifications.forEach((notification) => {
                if (notification.dataDiagnosticoSintomaParsed) {
                    if (notification.dataDiagnosticoSintomaParsed < earliest) earliest = notification.dataDiagnosticoSintomaParsed;
                    if (notification.dataDiagnosticoSintomaParsed > latest) latest = notification.dataDiagnosticoSintomaParsed;
                }
            });
        });

        return {
            earliest,
            latest,
        };
    };

    const isValidNotificationLocation = (notificationLocation: NotificationLocation) => {
        return notificationLocation.locationType !== "APPROXIMATE";
    };

    useEffect(() => {
        // When we first render the new notificationLocationData, we'll apply
        // some changes to results so we can do some stuff internally
        const updatedNotificationLocationData = notificationLocationData?.map(notificationLocation => {
            notificationLocation.notifications.map(notification => {
                notification.dataNotificacaoParsed = parseDate(notification.dataNotificacao);
                notification.dataDiagnosticoSintomaParsed = parseDate(notification.dataDiagnosticoSintoma);
                return notification;
            });
            return notificationLocation;
        });
        setNotificationLocations(updatedNotificationLocationData);

        const validNotificationLocations: Array<NotificationLocation> = [];
        const invalidNotifications: Array<NotificationSummary> = [];
        updatedNotificationLocationData?.forEach((notificationLocation) =>
            isValidNotificationLocation(notificationLocation) ? validNotificationLocations.push(notificationLocation) : invalidNotifications.push(...notificationLocation.notifications)
        );
        setValidNotificationLocations(validNotificationLocations);
        setInvalidNotifications(invalidNotifications);

        if (!validNotificationLocations) return;
        const { earliest, latest } = getEarliestAndLatestNotifications(validNotificationLocations);
        setEarliestDate(earliest);
        setLatestDate(latest);
    }, [notificationLocationData]);

    useEffect(() => {
        setUnmappedNotifications(unmappedNotificationsData);
    }, [unmappedNotificationsData]);

    const unmapedAndInvalidNotifications = unmappedNotifications?.concat(invalidNotifications ?? []);

    // TODO improve this
    return (
        <div>
            { isLoading && <h1>Loading...</h1> }
            { !isLoading && notificationLocations?.length == 0 && <StartupCard/> }
            { validNotificationLocations && validNotificationLocations.length > 0 && !isLoading &&
                <div>
                    <SideMenu />
                    <SelectedNotificationContextProvider>
                        {unmapedAndInvalidNotifications && unmapedAndInvalidNotifications.length > 0 &&
                            <UnmappedNotificationsButton unmappedNotifications={unmapedAndInvalidNotifications} />
                        }
                        <NotificationPane unmappedNotifications={unmapedAndInvalidNotifications} />
                        <NotificationFilterContextProvider>
                            <MapCalendar />
                            <Map
                                notificationLocations={validNotificationLocations}
                                earliestNotificationDate={earliestDate}
                                latestNotificationDate={latestDate}
                            />
                            <MapControlPanel
                                earliestNotificationDate={earliestDate}
                                latestNotificationDate={latestDate}
                            />
                            <MapFooter
                                earliestNotificationDate={earliestDate}
                                latestNotificationDate={latestDate}
                            />
                        </NotificationFilterContextProvider>
                    </SelectedNotificationContextProvider>
                </div>
            }
        </div>
    )
}

export default App;
