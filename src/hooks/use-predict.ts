import { useQuery } from "@tanstack/react-query";
import { predictionService } from "../services";
import type { Notification, NotificationFeatures, Prediction } from "../types";

const usePredict = (notificationFeatures: NotificationFeatures, numeroNotificacao: Notification["numeroNotificacao"]) => {

    return useQuery<Prediction, Error>({
        queryKey: ["prediction", numeroNotificacao],
        queryFn: () => {
            return predictionService.predict(notificationFeatures);
        },
        enabled: !!notificationFeatures,
    });
}

export default usePredict;
