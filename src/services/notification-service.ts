import { setaGatewayApiClient } from "../configurations/api-clients";
import type { Notification } from "../types";

const notificationService = {

    addNotificationsFromDbfFile: async function(formData: FormData): Promise<Array<Notification>> {
        const url = "/notifications";
        const response = await setaGatewayApiClient.post<Array<Notification>>(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    },

    findAllUnmappedNotifications: async function(): Promise<Array<Notification>> {
        const url = "/notifications?returnUnmappedNotificationsOnly";
        const response = await setaGatewayApiClient.get<Array<Notification>>(url);
        return response.data;
    },

    getNotificationByNumeroNotificacao: async function(numeroNotificacao: Notification["numeroNotificacao"]): Promise<Notification> {
        const url = `/notifications/${numeroNotificacao}`;
        const response = await setaGatewayApiClient.get<Notification>(url);
        return response.data;
    }
};

export default notificationService;
