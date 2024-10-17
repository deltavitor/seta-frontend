import type Notification from "./notification";

type NotificationSummary = Pick<
    Notification,
    "numeroNotificacao" |
    "dataNotificacao" |
    "dataDiagnosticoSintoma" |
    "classificacaoFinal" |
    "criterioConfirmacao" |
    "dataNotificacaoParsed" |
    "dataDiagnosticoSintomaParsed"
>;

export default NotificationSummary;
