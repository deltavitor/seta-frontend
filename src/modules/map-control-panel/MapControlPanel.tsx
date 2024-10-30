import { MapLayerFilter, NotificationTimeFilter, NotificationTimelinePlayer } from "../index";
import { Button } from "../core";
import { Clock, Filter, Layers } from "lucide-react";
import React, { useState } from "react";

type MapControlPanelProps = {
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function MapControlPanel(props: MapControlPanelProps) {

    const [controlPanelFiltersVisibility, setControlPanelFiltersVisibility] = useState({
        mapLayerFilters: false,
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
            left: 8,
            bottom: 32,
            display: "inline-flex",
            gap: "1rem",
        }}>
            <div style={{position: "relative", display: "inline-block"}}>
                <MapLayerFilter hidden={!controlPanelFiltersVisibility.mapLayerFilters}/>
                <Button size={"small"} kind={"primary"} onClick={() => toggleControlPanelFilter("mapLayerFilters")}>
                    Camadas <Layers size={16}/>
                </Button>
            </div>
            <div style={{position: "relative", display: "inline-block"}}>
                <NotificationTimeFilter hidden={!controlPanelFiltersVisibility.notificationTimeFilters}/>
                <Button size={"small"} kind={"primary"}
                        onClick={() => toggleControlPanelFilter("notificationTimeFilters")}>
                    Filtros <Filter size={16}/>
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
