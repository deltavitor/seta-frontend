import "@fontsource-variable/inter";
import "./App.scss";
import { Map, MapLayerFilter, NotificationFilter, StartupCard } from "./modules";
import { useFindNotificationLocations } from "./hooks";
import { useEffect, useState } from "react";
import { Button } from "./modules/core";
import { Filter, Layers } from "lucide-react";
import { getNotificationType } from "./utils";
import type { MapLayerFilter as MapLayerFilterType, Notification, NotificationLocation, NotificationTypeFilter } from "./types";
import NotificationPane from "./modules/notification-pane/NotificationPane";

function App() {

    const { data: notificationLocationData, isLoading } = useFindNotificationLocations();

    const [notificationLocations, setNotificationLocations] = useState<Array<NotificationLocation>>();
    const [validNotificationLocations, setValidNotificationLocations] = useState<Array<NotificationLocation>>();
    const [filteredNotificationLocations, setFilteredNotificationLocations] = useState<Array<NotificationLocation>>();
    const [notificationLocation, setNotificationLocation] = useState<NotificationLocation>();
    const [numeroNotificacao, setNumeroNotificacao] = useState<Notification["numeroNotificacao"]>("0");

    // Visibility / UI states
    const [controlPanelFiltersVisibility, setControlPanelFiltersVisibility] = useState({
        notificationFilters: false,
        mapLayerFilters: false,
    });

    const [notificationTypeFilter, setNotificationTypeFilter] = useState<NotificationTypeFilter>({
        labConfirmed: true,
        labDiscarded: true,
        clinicalConfirmed: true,
        clinicalDiscarded: true,
        underInvestigation: true,
    });
    const [mapLayerFilter, setMapLayerFilter] = useState<MapLayerFilterType>({
        notifications: true,
        heatmap: false,
    });

    const toggleControlPanelFilter = (filterKey: keyof typeof controlPanelFiltersVisibility) => {
        setControlPanelFiltersVisibility(prevState =>
            Object.assign(
                {},
                ...Object.keys(prevState).map(key => ({ [key]: key === filterKey ? !prevState[filterKey] : false }))
            )
        );
    };

    const isValidNotificationLocation = (notificationLocation: NotificationLocation) => {
        return notificationLocation.locationType !== "APPROXIMATE";
    };

    useEffect(() => {
        setFilteredNotificationLocations(validNotificationLocations?.map(notificationLocation => {
            const filteredNotifications = notificationLocation.notifications.filter(notification => {
                return notificationTypeFilter[getNotificationType(notification)];
            });

            return {
                ...notificationLocation,
                notifications: filteredNotifications
            };
        }).filter(notificationLocation => notificationLocation.notifications.length > 0));
    }, [notificationTypeFilter]);

    useEffect(() => {
        setNotificationLocations(notificationLocationData);
    }, [notificationLocationData]);

    useEffect(() => {
        setValidNotificationLocations(notificationLocations?.filter(isValidNotificationLocation));
    }, [notificationLocations]);

    // TODO improve this
    return (
        <div>
            { isLoading && <h1>Loading...</h1> }
            { !isLoading && notificationLocations?.length == 0 && <StartupCard /> }
            { notificationLocations && notificationLocations.length > 0 && !isLoading &&
                <div>
                    <div style={{
                        position: "absolute",
                        zIndex: 1000,
                        left: 20,
                        bottom: 20,
                        display: "inline-flex",
                        gap: "2rem"
                    }}>
                        <div style={{position: "relative", display: "inline-block"}}>
                            <MapLayerFilter hidden={!controlPanelFiltersVisibility.mapLayerFilters}
                                            filters={mapLayerFilter} setMapLayerFilter={setMapLayerFilter}/>
                            <Button kind={"primary"} onClick={() => toggleControlPanelFilter("mapLayerFilters")}>
                                Camadas <Layers size={20}/>
                            </Button>
                        </div>
                        <div style={{position: "relative", display: "inline-block"}}>
                            <NotificationFilter hidden={!controlPanelFiltersVisibility.notificationFilters}
                                                filters={notificationTypeFilter} setNotificationTypeFilter={setNotificationTypeFilter}/>
                            <Button kind={"primary"} onClick={() => toggleControlPanelFilter("notificationFilters")}>
                                Filtros <Filter size={20}/>
                            </Button>
                        </div>
                    </div>
                    <NotificationPane numeroNotificacao={numeroNotificacao} setNumeroNotificacao={setNumeroNotificacao}
                                      notificationLocation={notificationLocation}/>
                    <Map
                        notificationLocations={filteredNotificationLocations || validNotificationLocations || notificationLocations}
                        setNumeroNotificacao={setNumeroNotificacao}
                        notificationLocation={notificationLocation}
                        setNotificationLocation={setNotificationLocation}
                        mapLayerFilter={mapLayerFilter}
                    />
                </div>
            }
        </div>
    )
}

export default App;
