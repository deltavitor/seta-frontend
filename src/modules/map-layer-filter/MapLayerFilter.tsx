import "./MapLayerFilter.scss";
import React, { useContext } from "react";
import { Marker, MenuOption } from "../core";
import classNames from "classnames";
import { MapPin, Thermometer } from "lucide-react";
import { NotificationFilterContext } from "../../contexts";
import type { NotificationType } from "../../types";

type MapLayerFilterProps = {
    hidden?: boolean;
};

function MapLayerFilter(props: MapLayerFilterProps) {

    const notificationFilters = useContext(NotificationFilterContext);

    const toggleNotificationLayers = () => {
        const layerControlInputs = document.querySelectorAll<HTMLInputElement>(".leaflet-control-layers-selector");
        const notificationsLayerInput = layerControlInputs[0];
        const relatedNotificationsLayerInput = layerControlInputs[1];
        notificationsLayerInput.click();
        relatedNotificationsLayerInput.click();
    };

    const toggleHeatmapLayer = () => {
        const layerControlInputs = document.querySelectorAll<HTMLInputElement>(".leaflet-control-layers-selector");
        const heatmapLayerInput = layerControlInputs[2];
        heatmapLayerInput.click();
    };

    const toggleFilter = (filterName: NotificationType, isEnabled: boolean) => {
        if (!notificationFilters) return;

        const newFiltersState = {
            ...notificationFilters.notificationTypeFilter,
            [filterName]: isEnabled,
        };
        notificationFilters.setNotificationTypeFilter(newFiltersState);
    };

    const classes = classNames({
        "seta__map-layer-filter": true,
        "seta__map-layer-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <div>
                <span className={"seta__map-layer-filter__title"}>Camadas</span>
                <MenuOption handleToggle={toggleNotificationLayers}
                            checked={notificationFilters?.mapLayerFilter.notifications}>
                    <MapPin size={20}/>
                    <span>Notificações</span>
                </MenuOption>
                <MenuOption handleToggle={toggleHeatmapLayer} checked={notificationFilters?.mapLayerFilter.heatmap}>
                    <Thermometer size={20}/>
                    <span>Mapa de calor</span>
                </MenuOption>
            </div>
            <hr></hr>
            <div>
                <span className={"seta__map-layer-filter__title"}>Filtros de notificação</span>
                <MenuOption handleToggle={(isChecked) => toggleFilter("labConfirmed", isChecked)}
                            checked={notificationFilters?.notificationTypeFilter.labConfirmed}>
                    <Marker markerSize={20} shape={"diamond"} color={"red"}></Marker>
                    <span>Confirmadas (laboratório)</span>
                </MenuOption>
                <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalConfirmed", isChecked)}
                            checked={notificationFilters?.notificationTypeFilter.clinicalConfirmed}>
                    <Marker markerSize={20} shape={"circle"} color={"red"}></Marker>
                    <span>Confirmadas (clínico-epidemiológico)</span>
                </MenuOption>
                <MenuOption handleToggle={(isChecked) => toggleFilter("labDiscarded", isChecked)}
                            checked={notificationFilters?.notificationTypeFilter.labDiscarded}>
                    <Marker markerSize={20} shape={"diamond"} color={"blue"}></Marker>
                    <span>Descartadas (laboratório)</span>
                </MenuOption>
                <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalDiscarded", isChecked)}
                            checked={notificationFilters?.notificationTypeFilter.clinicalDiscarded}>
                    <Marker markerSize={20} shape={"circle"} color={"blue"}></Marker>
                    <span>Descartadas (clínico-epidemiológico)</span>
                </MenuOption>
                <MenuOption handleToggle={(isChecked) => toggleFilter("underInvestigation", isChecked)}
                            checked={notificationFilters?.notificationTypeFilter.underInvestigation}>
                    <Marker markerSize={20} shape={"circle"} color={"yellow"}></Marker>
                    <span>Em investigação e inconclusivos</span>
                </MenuOption>
            </div>
        </div>
    );
}

export default MapLayerFilter;
