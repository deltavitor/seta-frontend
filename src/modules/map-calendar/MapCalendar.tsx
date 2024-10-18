import "./MapCalendar.scss";
import { useContext } from "react";
import { NotificationFilterContext } from "../../contexts";

function MapCalendar() {

    const notificationFilters = useContext(NotificationFilterContext);

    const timelineIsRunning = notificationFilters?.notificationTimeFilter.endDate !== notificationFilters?.notificationTimeFilter.originalEndDate;

    return timelineIsRunning ? (
        <div className={"seta__map-calendar"}>
            <span className={"seta__map-calendar__label"}>Linha do tempo - Data atual</span>
            <span className={"seta__map-calendar__date"}>
                {notificationFilters?.notificationTimeFilter.endDate ? notificationFilters.notificationTimeFilter.endDate.toLocaleDateString() : null}
            </span>
        </div>
    ) : null;
}

export default MapCalendar;
