import { setaGatewayApiClient } from "../configurations/apiClients";
import type { Notification } from "../types";

const notificationService = {

    addNotificationsFromDbfFile: async function(formData: FormData): Promise<Array<Notification>> {
        const response = await setaGatewayApiClient.post<Array<Notification>>("/notifications", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
};

export default notificationService;
