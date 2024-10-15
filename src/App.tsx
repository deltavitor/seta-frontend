import "@fontsource-variable/inter";
import "./App.scss";
import { Map, MapLayerFilter, NotificationTimeFilter, NotificationTypeFilter, StartupCard } from "./modules";
import { useFindNotificationLocations } from "./hooks";
import { useEffect, useState } from "react";
import { Button } from "./modules/core";
import { Calendar, Filter, Layers } from "lucide-react";
import { getNotificationType, parseDate } from "./utils";
import type {
    MapLayerFilter as MapLayerFilterType,
    Notification, NotificationLocation,
    NotificationTimeFilter as NotificationTimeFilterType,
    NotificationTypeFilter as NotificationTypeFilterType,
} from "./types";
import NotificationPane from "./modules/notification-pane/NotificationPane";
import NotificationSummary from "./types/notification-summary";

function App() {

    const { data: notificationLocationData, isLoading } = useFindNotificationLocations();

    const [notificationLocations, setNotificationLocations] = useState<Array<NotificationLocation>>();
    const [validNotificationLocations, setValidNotificationLocations] = useState<Array<NotificationLocation>>();
    const [filteredNotificationLocations, setFilteredNotificationLocations] = useState<Array<NotificationLocation>>();
    const [notificationLocation, setNotificationLocation] = useState<NotificationLocation>();
    const [numeroNotificacao, setNumeroNotificacao] = useState<Notification["numeroNotificacao"]>("0");

    // Visibility / UI states
    const [controlPanelFiltersVisibility, setControlPanelFiltersVisibility] = useState({
        mapLayerFilters: false,
        notificationTypeFilters: false,
        notificationTimeFilters: false,
    });

    const [notificationTypeFilter, setNotificationTypeFilter] = useState<NotificationTypeFilterType>({
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
    const [notificationTimeFilter, setNotificationTimeFilter] = useState<NotificationTimeFilterType>({
        startDate: undefined,
        endDate: undefined,
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

    const isNotificationWithinTimeRange = (
        notification: Notification | NotificationSummary,
        startDate: Date,
        endDate: Date
    ) => {
        return notification.dataNotificacaoParsed &&
            notification.dataNotificacaoParsed >= startDate && notification.dataNotificacaoParsed <= endDate;
    };

    useEffect(() => {
        setFilteredNotificationLocations(validNotificationLocations?.map(notificationLocation => {
            const filteredNotifications = notificationLocation.notifications.filter(notification => {
                const notificationTypeCondition = notificationTypeFilter[getNotificationType(notification)];
                const notificationTimeCondition = notificationTimeFilter.startDate && notificationTimeFilter.endDate ?
                    isNotificationWithinTimeRange(
                        notification,
                        notificationTimeFilter.startDate,
                        notificationTimeFilter.endDate
                    ) : true;
                return notificationTypeCondition && notificationTimeCondition;
            });

            return {
                ...notificationLocation,
                notifications: filteredNotifications
            };
        }).filter(notificationLocation => notificationLocation.notifications.length > 0));
    }, [notificationTypeFilter, notificationTimeFilter]);

    useEffect(() => {
        // When we first render the new notificationLocationData, we'll apply
        // some changes to results so we can do some stuff internally
        const updatedNotificationLocationData = notificationLocationData?.map(notificationLocation => {
           notificationLocation.notifications.map(notification => {
               notification.dataNotificacaoParsed = parseDate(notification.dataNotificacao);
               return notification;
           });
           return notificationLocation;
        });
        setNotificationLocations(updatedNotificationLocationData);
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
                            <NotificationTypeFilter hidden={!controlPanelFiltersVisibility.notificationTypeFilters}
                                                    filters={notificationTypeFilter}
                                                    setNotificationTypeFilter={setNotificationTypeFilter}/>
                            <Button kind={"primary"} onClick={() => toggleControlPanelFilter("notificationTypeFilters")}>
                                Filtros <Filter size={20}/>
                            </Button>
                        </div>
                        <div style={{position: "relative", display: "inline-block"}}>
                            <NotificationTimeFilter hidden={!controlPanelFiltersVisibility.notificationTimeFilters}
                                                    filters={notificationTimeFilter}
                                                    setNotificationTimeFilter={setNotificationTimeFilter}/>
                            <Button kind={"primary"} onClick={() => toggleControlPanelFilter("notificationTimeFilters")}>
                                Filtros por tempo <Calendar size={20}/>
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
