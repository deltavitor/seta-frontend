import type Notification from "./notification";

type NotificationSummary = Pick<Notification, "numeroNotificacao" | "dataNotificacao" | "classificacaoFinal" | "criterioConfirmacao">;

export default NotificationSummary;
