import "./NotificationTypeFilter.scss";
import { MenuOption, Marker } from "../core";
import React, { useContext } from "react";
import classNames from "classnames";
import type { NotificationType } from "../../types";
import { NotificationFilterContext } from "../../contexts";

type NotificationFilterProps = {
    hidden?: boolean;
};

function NotificationTypeFilter(props: NotificationFilterProps) {

    const notificationFilters = useContext(NotificationFilterContext);

    const toggleFilter = (filterName: NotificationType, isEnabled: boolean) => {
        if (!notificationFilters) return;

        const newFiltersState = {
            ...notificationFilters.notificationTypeFilter,
            [filterName]: isEnabled,
        };
        notificationFilters.setNotificationTypeFilter(newFiltersState);
    };

    const classes = classNames({
        "seta__notification-filter": true,
        "seta__notification-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__notification-filter__title"}>Filtros de notificação</span>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labConfirmed", isChecked)} checked={notificationFilters?.notificationTypeFilter.labConfirmed}>
                <Marker markerSize={20} shape={"diamond"} color={"red"}></Marker>
                <span>Confirmadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("labDiscarded", isChecked)} checked={notificationFilters?.notificationTypeFilter.labDiscarded}>
                <Marker markerSize={20} shape={"diamond"} color={"blue"}></Marker>
                <span>Descartadas por laboratório</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalConfirmed", isChecked)} checked={notificationFilters?.notificationTypeFilter.clinicalConfirmed}>
                <Marker markerSize={20} shape={"circle"} color={"red"}></Marker>
                <span>Confirmadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("clinicalDiscarded", isChecked)} checked={notificationFilters?.notificationTypeFilter.clinicalDiscarded}>
                <Marker markerSize={20} shape={"circle"} color={"blue"}></Marker>
                <span>Descartadas por clínico-epidemio.</span>
            </MenuOption>
            <MenuOption handleToggle={(isChecked) => toggleFilter("underInvestigation", isChecked)} checked={notificationFilters?.notificationTypeFilter.underInvestigation}>
                <Marker markerSize={20} shape={"circle"} color={"yellow"}></Marker>
                <span>Em investigação</span>
            </MenuOption>
        </div>
    );
}

export default NotificationTypeFilter;
