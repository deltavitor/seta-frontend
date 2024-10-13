import type { Notification, NotificationFeatures } from "../types";

function getNotificationFeatures(notification: Notification): NotificationFeatures {
    return {
        febre: notification["febre"],
        mialgia: notification["mialgia"],
        cefaleia: notification["cefaleia"],
        exantema: notification["exantema"],
        nausea: notification["nausea"],
        dorCostas: notification["dorCostas"],
        artralgia: notification["artralgia"],
        petequia: notification["petequia"],
        dorRetro: notification["dorRetro"],
        idade: notification["idade"],
        dataDiagnosticoSintoma: notification["dataDiagnosticoSintoma"],
    };
}

export default getNotificationFeatures;
