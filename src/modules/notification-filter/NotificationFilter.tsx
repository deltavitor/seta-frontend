import "./NotificationFilter.scss";
import { MenuOption, Marker } from "../core";
import { useState } from "react";
import classNames from "classnames";
import type { NotificationType, NotificationTypeFilter } from "../../types";

type NotificationFilterProps = {
    hidden?: boolean;
    handleFilterChange?: (filters: NotificationTypeFilter) => void;
};

function NotificationFilter(props: NotificationFilterProps) {

    const defaultFilters: NotificationTypeFilter = {
        labConfirmed: true,
        labDiscarded: true,
        clinicalConfirmed: true,
        clinicalDiscarded: true,
        underInvestigation: true,
    };

    const [filters, setFilters] = useState(defaultFilters);

    const toggleFilter = (filterName: NotificationType, isEnabled: boolean) => {
        const newFiltersState = {
            ...filters,
            [filterName]: isEnabled,
        };
        setFilters(newFiltersState);
        props.handleFilterChange && props.handleFilterChange(newFiltersState);
    };

    const classes = classNames({
        "seta__notification-filter": true,
        "seta__notification-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__notification-filter__title"}>Filtros de notificação</span>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labConfirmed", isChecked)} checked={defaultFilters.labConfirmed}>
                <Marker markerSize={20} shape={"diamond"} color={"red"}></Marker>
                <span>Confirmadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labDiscarded", isChecked)} checked={defaultFilters.labDiscarded}>
                <Marker markerSize={20} shape={"diamond"} color={"blue"}></Marker>
                <span>Descartadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalConfirmed", isChecked)} checked={defaultFilters.clinicalConfirmed}>
                <Marker markerSize={20} shape={"circle"} color={"red"}></Marker>
                <span>Confirmadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalDiscarded", isChecked)} checked={defaultFilters.clinicalDiscarded}>
                <Marker markerSize={20} shape={"circle"} color={"blue"}></Marker>
                <span>Descartadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("underInvestigation", isChecked)} checked={defaultFilters.underInvestigation}>
                <Marker markerSize={20} shape={"circle"} color={"yellow"}></Marker>
                <span>Em investigação</span>
            </MenuOption>
        </div>
    );
}

export default NotificationFilter;
