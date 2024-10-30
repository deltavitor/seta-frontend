import "./NotificationPredictionBadge.scss";
import type { Notification, Prediction } from "../../types";
import { usePredict } from "../../hooks";
import { Badge, type BadgeProps } from "../core";
import type { ReactNode } from "react";
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react";
import { getNotificationFeatures } from "../../utils";

type NotificationPredictionBadgeProps = {
    notification: Notification;
};

function NotificationPredictionBadge(props: NotificationPredictionBadgeProps) {

    const getBadgeColor = (prediction: Prediction): BadgeProps["color"] => {
        return prediction.classOneProbability >= 0.75 ? "red" :
            prediction.classOneProbability >= 0.50 ? "yellow" :
            prediction.classOneProbability < 0.50 ? "blue" : "gray";
    };

    const getBadgeIcon = (prediction: Prediction): ReactNode => {
        return prediction.classOneProbability >= 0.75 ? <ArrowUp size={16}/> :
            prediction.classOneProbability >= 0.50 ? <AlertCircle size={16}/> :
            prediction.classOneProbability < 0.50 ? <ArrowDown size={16}/> : null;
    };

    const { data: prediction, status } = usePredict(getNotificationFeatures(props.notification), props.notification.numeroNotificacao);

    return (
        <span className={"seta__notification-prediction-badge"}>
            {status === "pending" ? (
                <Badge kind={"light"} color={"gray"}>
                    Carregando...
                </Badge>
            ) : status === "error" ? (
                <Badge kind={"light"} color={"gray"}>
                    Erro
                </Badge>
            ) : (
                <Badge kind={"heavy"} color={getBadgeColor(prediction)}>
                    {getBadgeIcon(prediction)}
                    {(prediction.classOneProbability * 100).toFixed(2)}%
                </Badge>
            )}
        </span>
    );
}

export default NotificationPredictionBadge;
