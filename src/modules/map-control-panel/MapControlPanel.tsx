import { MapLayerFilter, NotificationTimeFilter, NotificationTimelinePlayer, NotificationTypeFilter } from "../index";
import { Button } from "../core";
import { Calendar, Clock, Filter, Layers } from "lucide-react";
import React, { useState } from "react";

type MapControlPanelProps = {
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function MapControlPanel(props: MapControlPanelProps) {

    const [controlPanelFiltersVisibility, setControlPanelFiltersVisibility] = useState({
        mapLayerFilters: false,
        notificationTypeFilters: false,
        notificationTimeFilters: false,
        notificationTimelinePlayer: false,
    });

    const toggleControlPanelFilter = (filterKey: keyof typeof controlPanelFiltersVisibility) => {
        setControlPanelFiltersVisibility(prevState =>
            Object.assign(
                {},
                ...Object.keys(prevState).map(key => ({ [key]: key === filterKey ? !prevState[filterKey] : false }))
            )
        );
    };

    return (
        <div style={{
            position: "absolute",
            zIndex: 1000,
            left: 20,
            bottom: 20,
            display: "inline-flex",
            gap: "2rem"
        }}>
            <div style={{position: "relative", display: "inline-block"}}>
                <MapLayerFilter hidden={!controlPanelFiltersVisibility.mapLayerFilters}/>
                <Button size={"small"} kind={"primary"} onClick={() => toggleControlPanelFilter("mapLayerFilters")}>
                    Camadas <Layers size={16}/>
                </Button>
            </div>
            <div style={{position: "relative", display: "inline-block"}}>
                <NotificationTypeFilter hidden={!controlPanelFiltersVisibility.notificationTypeFilters}/>
                <Button size={"small"} kind={"primary"}
                        onClick={() => toggleControlPanelFilter("notificationTypeFilters")}>
                    Filtros <Filter size={16}/>
                </Button>
            </div>
            <div style={{position: "relative", display: "inline-block"}}>
                <NotificationTimeFilter hidden={!controlPanelFiltersVisibility.notificationTimeFilters}/>
                <Button size={"small"} kind={"primary"}
                        onClick={() => toggleControlPanelFilter("notificationTimeFilters")}>
                    Filtros por tempo <Calendar size={16}/>
                </Button>
            </div>
            <div style={{position: "relative", display: "inline-block"}}>
                <NotificationTimelinePlayer
                    hidden={!controlPanelFiltersVisibility.notificationTimelinePlayer}
                    earliestNotificationDate={props.earliestNotificationDate}
                    latestNotificationDate={props.latestNotificationDate}
                />
                <Button size={"small"} kind={"primary"}
                        onClick={() => toggleControlPanelFilter("notificationTimelinePlayer")}>
                    Linha do tempo <Clock size={16}/>
                </Button>
            </div>
        </div>
    );
}

export default MapControlPanel;
