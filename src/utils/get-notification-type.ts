import type { Notification, NotificationSummary, NotificationType } from "../types";
import { ClassificacoesFinais, CriteriosConfirmacao } from "../consts";

function getNotificationType(notification: Notification | NotificationSummary): NotificationType {

    const { criterioConfirmacao, classificacaoFinal } = notification;

    if (classificacaoFinal == ClassificacoesFinais.Empty || classificacaoFinal == ClassificacoesFinais.Inconclusive)
        return "underInvestigation";

    if (criterioConfirmacao === CriteriosConfirmacao.ConfirmedThroughLabAnalysis)
        return classificacaoFinal === ClassificacoesFinais.Discarded ? "labDiscarded" : "labConfirmed";

    if (criterioConfirmacao === CriteriosConfirmacao.ConfirmedThroughClinicalAndEpidemiologicalCriteria)
        return classificacaoFinal === ClassificacoesFinais.Discarded ? "clinicalDiscarded" : "clinicalConfirmed";

    return "underInvestigation"
}

export default getNotificationType;
