import "./UnmappedNotificationsButton.scss";
import { CircleAlert } from "lucide-react";
import colors from "../../styles/colors.module.scss";
import React, { useContext } from "react";
import type { NotificationSummary } from "../../types";
import { SelectedNotificationContext } from "../../contexts";

type UnmappedNotificationsButtonProps = {
    unmappedNotifications: Array<NotificationSummary>,
};

function UnmappedNotificationsButton(props: UnmappedNotificationsButtonProps) {

    const selectedNofication = useContext(SelectedNotificationContext);

    const toggleInvalidNotificationsView = () => {
        selectedNofication?.setSelectedNumeroNotificacao("-2");
        selectedNofication?.setRelatedNotificationLocations(undefined);
        selectedNofication?.setSelectedNotificationLocation(undefined);
    };

    return (
        <button className={"seta__invalid-notifications-button"}
            title={`Há ${props.unmappedNotifications.length} notificações não-georreferenciadas`}
            onClick={toggleInvalidNotificationsView}
        >
            <CircleAlert size={56} color={colors["red800"]}/>
        </button>
    )
}

export default UnmappedNotificationsButton;
