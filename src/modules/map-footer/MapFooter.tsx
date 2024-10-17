import "./MapFooter.scss";
import { useContext } from "react";
import { NotificationFilterContext } from "../../contexts";

type MapFooterProps = {
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function MapFooter(props: MapFooterProps) {

    const notificationFilters = useContext(NotificationFilterContext);

    return (
        <div className={"seta__map-footer"}>
            <span className={"seta__map-footer__field"}>SETA Dengue</span>
            <span className={"seta__map-footer__field"}>|</span>
            <span className={"seta__map-footer__label"}>Exibindo notificações de</span> {
                notificationFilters?.notificationTimeFilter.startDate && notificationFilters.notificationTimeFilter.startDate ?
                    <>
                        {notificationFilters.notificationTimeFilter.startDate.toLocaleDateString()} - {notificationFilters.notificationTimeFilter.endDate?.toLocaleDateString()}
                    </>
                    :
                    <>
                        {props.earliestNotificationDate.toLocaleDateString()} - {props.latestNotificationDate.toLocaleDateString()}
                    </>
            }
        </div>
    );
}

export default MapFooter;
