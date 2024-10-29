import { setaGatewayApiClient } from "../configurations/api-clients";
import type { NotificationLocation } from "../types";

const notificationLocationService = {

    findAllNotificationLocations: async function(): Promise<Array<NotificationLocation>> {
        console.log("The gateway api client URL: ");
        console.log(import.meta.env.SETA_GATEWAY_URL);
        console.log("The uri: ");
        console.log(setaGatewayApiClient.getUri());
        const response = await setaGatewayApiClient.get<Array<NotificationLocation>>("/notification-locations");
        return response.data;
    },

    deleteAllNotificationLocations: async function(): Promise<void> {
        const url = "/notification-locations";
        const response = await setaGatewayApiClient.delete<void>(url);
        return response.data;
    }
};

export default notificationLocationService;
