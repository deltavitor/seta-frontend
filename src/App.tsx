import "@fontsource-variable/inter";
import "./App.scss";
import { Map, MapControlPanel, MapFooter, StartupCard } from "./modules";
import { useFindNotificationLocations } from "./hooks";
import React, { useEffect, useState } from "react";
import { parseDate } from "./utils";
import type { NotificationLocation } from "./types";
import NotificationPane from "./modules/notification-pane/NotificationPane";
import { NotificationFilterContextProvider, SelectedNotificationContextProvider } from "./contexts";

function App() {

    const { data: notificationLocationData, isLoading } = useFindNotificationLocations();

    const [notificationLocations, setNotificationLocations] = useState<Array<NotificationLocation>>();
    const [validNotificationLocations, setValidNotificationLocations] = useState<Array<NotificationLocation>>();
    const [earliestDate, setEarliestDate] = useState(new Date());
    const [latestDate, setLatestDate] = useState(new Date(0));

    const getEarliestAndLatestNotifications = (notificationLocations: Array<NotificationLocation>) => {
        let earliest = new Date();
        // Create at the epoch
        let latest = new Date(0);

        notificationLocations?.forEach(notificationLocation => {
            notificationLocation.notifications.forEach((notification) => {
                if (notification.dataNotificacaoParsed) {
                    if (notification.dataNotificacaoParsed < earliest) earliest = notification.dataNotificacaoParsed;
                    if (notification.dataNotificacaoParsed > latest) latest = notification.dataNotificacaoParsed;
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
    }, [notificationLocationData]);

    useEffect(() => {
        if (!notificationLocations) return;

        setValidNotificationLocations(notificationLocations.filter(isValidNotificationLocation));
    }, [notificationLocations]);

    useEffect(() => {
        if (!validNotificationLocations) return;

        const { earliest, latest } = getEarliestAndLatestNotifications(validNotificationLocations);
        setEarliestDate(earliest);
        setLatestDate(latest);
    }, [validNotificationLocations]);

    // TODO improve this
    return (
        <div>
            { isLoading && <h1>Loading...</h1> }
            { !isLoading && notificationLocations?.length == 0 && <StartupCard /> }
            { notificationLocations && notificationLocations.length > 0 && !isLoading &&
                <div>
                    <SelectedNotificationContextProvider>
                        <NotificationPane />
                        <NotificationFilterContextProvider>
                            <Map
                                notificationLocations={validNotificationLocations || notificationLocations}
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
