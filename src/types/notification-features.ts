import type Notification from "./notification";

type NotificationFeatures = Pick<Notification, "febre" | "mialgia" | "cefaleia" | "exantema" | "nausea" | "dorCostas" | "artralgia" | "petequia" | "dorRetro" | "idade" | "dataDiagnosticoSintoma">;

export default NotificationFeatures;
