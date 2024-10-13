import type { Notification } from "../types";

function getNotificationLabExams(notification: Notification) {

    const getResult = (result: string) => {
        return result === "1" ? "Positivo" : result === "2" ? "Negativo" : "Inconclusivo";
    };

    return {
        "Exame IgM": {
            date: notification.dataColetaExame,
            result: getResult(notification.resultadoExame),
        },
        "Exame NS1": {
            date: notification.dataColetaNs1,
            result: getResult(notification.resultadoNs1),
        },
        "Exame Isolamento Viral": {
            date: notification.dataColetaIsolamento,
            result: getResult(notification.resultadoIsolamento),
        },
        "Exame RT-PCR": {
            date: notification.dataColetaRtpcr,
            result: getResult(notification.resultadoRtpcr),
        },
    };
}

export default getNotificationLabExams;
