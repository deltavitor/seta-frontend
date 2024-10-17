import type { Notification, NotificationSummary } from "../types";
import {
    blueCircleIcon,
    blueDiamondIcon,
    blurredBlueCircleIcon,
    blurredBlueDiamondIcon, blurredRedCircleIcon,
    blurredRedDiamondIcon,
    blurredYellowCircleIcon,
    blurredYellowDiamondIcon,
    ClassificacoesFinais,
    CriteriosConfirmacao,
    redCircleIcon,
    redDiamondIcon,
    yellowCircleIcon,
    yellowDiamondIcon
} from "../consts";

function getNotificationIcon(notification: Notification | NotificationSummary, isBlurred: boolean) {
    const isDiamond = notification.criterioConfirmacao === CriteriosConfirmacao.ConfirmedThroughLabAnalysis;
    const shape = isDiamond ? "diamond" : "circle";

    let color = "red";
    if (notification.classificacaoFinal === ClassificacoesFinais.Empty || notification.classificacaoFinal === ClassificacoesFinais.Inconclusive) {
        color = "yellow";
    } else if (notification.classificacaoFinal === ClassificacoesFinais.Discarded) {
        color = "blue";
    }

    if (shape === "diamond") {
        if (color === "yellow") return isBlurred ? blurredYellowDiamondIcon : yellowDiamondIcon;
        if (color === "blue") return isBlurred ? blurredBlueDiamondIcon : blueDiamondIcon;
        return isBlurred ? blurredRedDiamondIcon : redDiamondIcon;
    } else {
        if (color === "yellow") return isBlurred ? blurredYellowCircleIcon : yellowCircleIcon;
        if (color === "blue") return isBlurred ? blurredBlueCircleIcon : blueCircleIcon;
        return isBlurred ? blurredRedCircleIcon : redCircleIcon;
    }
}

export default getNotificationIcon;
