import axios from "axios";

const setaGatewayApiClient = axios.create({
    baseURL: import.meta.env.SETA_GATEWAY_URL,
    withCredentials: true,
});

export { setaGatewayApiClient };
