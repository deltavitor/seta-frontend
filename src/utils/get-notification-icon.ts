import type { Notification, NotificationSummary } from "../types";
import {
    blueCircleIcon,
    blueDiamondIcon,
    ClassificacoesFinais,
    CriteriosConfirmacao, redCircleIcon,
    redDiamondIcon, yellowCircleIcon,
    yellowDiamondIcon
} from "../consts";

function getNotificationIcon(notification: Notification | NotificationSummary) {
    const isDiamond = notification.criterioConfirmacao === CriteriosConfirmacao.ConfirmedThroughLabAnalysis;
    const shape = isDiamond ? "diamond" : "circle";

    let color = "red";
    if (notification.classificacaoFinal === ClassificacoesFinais.Empty || notification.classificacaoFinal === ClassificacoesFinais.Inconclusive)
        color = "yellow";
    else if (notification.classificacaoFinal === ClassificacoesFinais.Discarded)
        color = "blue";


    if (shape === "diamond") {
        if (color === "yellow") return yellowDiamondIcon;
        if (color === "blue") return blueDiamondIcon;
        return redDiamondIcon;
    } else {
        if (color === "yellow") return yellowCircleIcon;
        if (color === "blue") return blueCircleIcon;
        return redCircleIcon;
    }
}

export default getNotificationIcon;
