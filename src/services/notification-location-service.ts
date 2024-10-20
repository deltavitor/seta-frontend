import { setaGatewayApiClient } from "../configurations/api-clients";
import type { NotificationLocation } from "../types";

const notificationLocationService = {

    findAllNotificationLocations: async function(): Promise<Array<NotificationLocation>> {
        const response = await setaGatewayApiClient.get<Array<NotificationLocation>>("/notification-locations");
        return response.data;
    }
};

export default notificationLocationService;
