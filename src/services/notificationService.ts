import { setaGatewayApiClient } from "../configurations/apiClients";

const notificationService = {

    findAllGeocodedNotifications: async function() {
        return setaGatewayApiClient.get("/notifications", {
            params: {
                "returnGeocodedNotifications": "true"
            },
        });
    }
};

export default notificationService;