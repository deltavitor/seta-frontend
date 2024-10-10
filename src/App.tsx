import "@fontsource-variable/inter";
import "./App.scss";
import { Map, NotificationFilter, StartupCard } from "./modules";
import { useFindNotificationLocations } from "./hooks";
import { useEffect, useState } from "react";
import { Button } from "./modules/core";
import { Filter } from "lucide-react";
import { getNotificationType } from "./utils";
import type { NotificationLocation, NotificationTypeFilter } from "./types";

function App() {

    const { data: notificationLocationData, isLoading } = useFindNotificationLocations();
    const [notificationLocations, setNotificationLocations] = useState<Array<NotificationLocation>>();
    const [filteredNotificationLocations, setFilteredNotificationLocations] = useState<Array<NotificationLocation>>();
    const [notificationFiltersAreVisible, setNotificationFiltersAreVisible] = useState(true);

    const handleNotificationsFilterChange = (filters: NotificationTypeFilter) => {
        setFilteredNotificationLocations(notificationLocations?.map(notificationLocation => {
            const filteredNotifications = notificationLocation.notifications.filter(notification => {
                return filters[getNotificationType(notification)];
            });

            return {
                ...notificationLocation,
                notifications: filteredNotifications
            };
        }).filter(notificationLocation => notificationLocation.notifications.length > 0));
    };

    useEffect(() => {
        setNotificationLocations(notificationLocationData);
    }, [notificationLocationData]);

    // TODO improve this
    return (
        <div>
            { isLoading && <h1>Loading...</h1> }
            { !isLoading && notificationLocations?.length == 0 && <StartupCard /> }
            { notificationLocations && notificationLocations.length > 0 && !isLoading &&
                <div>
                    <div style={{position: "absolute", zIndex: 1000, left: 20, bottom: 20}}>
                        <NotificationFilter hidden={!notificationFiltersAreVisible} handleFilterChange={(filters) => handleNotificationsFilterChange(filters)}></NotificationFilter>
                        <Button kind={"primary"} onClick={() => setNotificationFiltersAreVisible(!notificationFiltersAreVisible)}>
                            Filtros <Filter size={20} />
                        </Button>
                    </div>
                    <Map notificationLocations={filteredNotificationLocations || notificationLocations}></Map>
                </div>
            }
        </div>
    )
}

export default App;
