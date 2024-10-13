import type { Notification } from "../types";

function getNotificationSymptoms(notification: Notification) {

    return {
        "Febre": notification.febre,
        "Mialgia": notification.mialgia,
        "Cefaleia": notification.cefaleia,
        "Exantema": notification.exantema,
        "Vomito": notification.vomito,
        "Nausea": notification.nausea,
        "Dor costas": notification.dorCostas,
        "Conjuntivite": notification.conjuntivite,
        "Artrite": notification.artrite,
        "Artralgia": notification.artralgia,
        "Petequia": notification.petequia,
        "Laco": notification.laco,
        "Dor Retro": notification.dorRetro,
    };
}

export default getNotificationSymptoms;
