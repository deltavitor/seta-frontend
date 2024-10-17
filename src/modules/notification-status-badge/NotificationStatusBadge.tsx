import type { Notification, NotificationSummary } from "../../types";
import { Badge, type BadgeProps } from "../core";
import { getNotificationType } from "../../utils";

type NotificationStatusBadgeProps = {
    size?: BadgeProps["size"];
    notification: Notification | NotificationSummary,
};

function NotificationStatusBadge(props: NotificationStatusBadgeProps) {

    const getNotificationStatusBadgeColor = (notification: Notification | NotificationSummary) => {
        const notificationType = getNotificationType(notification);
        return notificationType === "labConfirmed" || notificationType === "clinicalConfirmed" ? "red" :
            notificationType === "labDiscarded" || notificationType === "clinicalDiscarded" ? "blue" : "yellow";
    };

    const getNotificationStatusBadgeLabel = (notification: Notification | NotificationSummary) => {
        const notificationType = getNotificationType(notification);
        switch (notificationType) {
            case "labConfirmed":
                return "Confirmado laboratório";
            case "clinicalConfirmed":
                return "Confirmado clínico-epidem.";
            case "labDiscarded":
                return "Descartado laboratório";
            case "clinicalDiscarded":
                return "Descartado clínico-epidem.";
            case "underInvestigation":
                return "Sob investigação";
            default:
                return "NA";
        }
    }

    return (
        <Badge size={props.size} kind={"light"} color={getNotificationStatusBadgeColor(props.notification)}>
            {getNotificationStatusBadgeLabel(props.notification)}
        </Badge>
    );
}

export default NotificationStatusBadge;
