import { setaGatewayApiClient } from "../configurations/api-clients";
import type { NotificationLocation } from "../types";

const notificationLocationService = {

    findAllNotificationLocations: async function(): Promise<Array<NotificationLocation>> {
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
