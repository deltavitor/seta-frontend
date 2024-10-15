import "./NotificationTypeFilter.scss";
import { MenuOption, Marker } from "../core";
import React from "react";
import classNames from "classnames";
import type { NotificationType, NotificationTypeFilter } from "../../types";

type NotificationFilterProps = {
    hidden?: boolean;
    filters: NotificationTypeFilter;
    setNotificationTypeFilter: React.Dispatch<React.SetStateAction<NotificationTypeFilter>>;
};

function NotificationTypeFilter(props: NotificationFilterProps) {

    const toggleFilter = (filterName: NotificationType, isEnabled: boolean) => {
        const newFiltersState = {
            ...props.filters,
            [filterName]: isEnabled,
        };
        props.setNotificationTypeFilter(newFiltersState);
    };

    const classes = classNames({
        "seta__notification-filter": true,
        "seta__notification-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__notification-filter__title"}>Filtros de notificação</span>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labConfirmed", isChecked)} checked={props.filters.labConfirmed}>
                <Marker markerSize={20} shape={"diamond"} color={"red"}></Marker>
                <span>Confirmadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labDiscarded", isChecked)} checked={props.filters.labDiscarded}>
                <Marker markerSize={20} shape={"diamond"} color={"blue"}></Marker>
                <span>Descartadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalConfirmed", isChecked)} checked={props.filters.clinicalConfirmed}>
                <Marker markerSize={20} shape={"circle"} color={"red"}></Marker>
                <span>Confirmadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalDiscarded", isChecked)} checked={props.filters.clinicalDiscarded}>
                <Marker markerSize={20} shape={"circle"} color={"blue"}></Marker>
                <span>Descartadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("underInvestigation", isChecked)} checked={props.filters.underInvestigation}>
                <Marker markerSize={20} shape={"circle"} color={"yellow"}></Marker>
                <span>Em investigação</span>
            </MenuOption>
        </div>
    );
}

export default NotificationTypeFilter;
