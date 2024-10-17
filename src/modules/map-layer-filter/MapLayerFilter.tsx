import "./MapLayerFilter.scss";
import React, { useContext } from "react";
import { MenuOption } from "../core";
import classNames from "classnames";
import { MapPin, Thermometer } from "lucide-react";
import { NotificationFilterContext } from "../../contexts";

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

    const classes = classNames({
        "seta__map-layer-filter": true,
        "seta__map-layer-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__map-layer-filter__title"}>Camadas</span>
            <MenuOption handleToggle={toggleNotificationLayers} checked={notificationFilters?.mapLayerFilter.notifications}>
                <MapPin size={20} />
                <span>Notificações</span>
            </MenuOption>
            <MenuOption handleToggle={toggleHeatmapLayer} checked={notificationFilters?.mapLayerFilter.heatmap}>
                <Thermometer size={20} />
                <span>Mapa de calor</span>
            </MenuOption>
        </div>
    );
}

export default MapLayerFilter;
