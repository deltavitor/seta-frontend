import "./MapLayerFilter.scss";
import type { MapLayer } from "../../types";
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

    const toggleFilter = (filterName: MapLayer, isEnabled: boolean) => {
        if (!notificationFilters) return;

        const newFiltersState = {
            ...notificationFilters.mapLayerFilter,
            [filterName]: isEnabled,
        };
        notificationFilters.setMapLayerFilter(newFiltersState);
    };

    const classes = classNames({
        "seta__map-layer-filter": true,
        "seta__map-layer-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__map-layer-filter__title"}>Camadas</span>
            <MenuOption handleToggle={(isChecked) => toggleFilter("notifications", isChecked)} checked={notificationFilters?.mapLayerFilter.notifications}>
                <MapPin size={20} />
                <span>Notificações</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("heatmap", isChecked)} checked={notificationFilters?.mapLayerFilter.heatmap}>
                <Thermometer size={20} />
                <span>Mapa de calor</span>
            </MenuOption>
        </div>
    );
}

export default MapLayerFilter;
