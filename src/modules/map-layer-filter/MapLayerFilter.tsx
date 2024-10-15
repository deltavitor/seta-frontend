import "./MapLayerFilter.scss";
import type { MapLayer, MapLayerFilter } from "../../types";
import React from "react";
import { MenuOption } from "../core";
import classNames from "classnames";
import { MapPin, Thermometer } from "lucide-react";

type MapLayerFilterProps = {
    hidden?: boolean;
    filters: MapLayerFilter;
    setMapLayerFilter: React.Dispatch<React.SetStateAction<MapLayerFilter>>;
};

function MapLayerFilter(props: MapLayerFilterProps) {

    const toggleFilter = (filterName: MapLayer, isEnabled: boolean) => {
        const newFiltersState = {
            ...props.filters,
            [filterName]: isEnabled,
        };
        props.setMapLayerFilter(newFiltersState);
    };

    const classes = classNames({
        "seta__map-layer-filter": true,
        "seta__map-layer-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__map-layer-filter__title"}>Camadas</span>
            <MenuOption handleToggle={(isChecked) => toggleFilter("notifications", isChecked)} checked={props.filters.notifications}>
                <MapPin size={20} />
                <span>Notificações</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("heatmap", isChecked)} checked={props.filters.heatmap}>
                <Thermometer size={20} />
                <span>Mapa de calor</span>
            </MenuOption>
        </div>
    );
}

export default MapLayerFilter;
