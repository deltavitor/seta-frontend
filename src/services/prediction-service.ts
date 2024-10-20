import type { NotificationFeatures, Prediction } from "../types";
import { setaGatewayApiClient } from "../configurations/api-clients";

const predictionService = {

    predict: async function(notificationFeatures: NotificationFeatures): Promise<Prediction> {
        const url = "/predict";
        const response = await setaGatewayApiClient.post<Prediction>(url, notificationFeatures, {
            headers: {
            }
        });
        return response.data;
    },
};

export default predictionService;
