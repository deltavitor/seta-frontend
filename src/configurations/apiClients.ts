import axios from "axios";

const setaGatewayApiClient = axios.create({
    baseURL: import.meta.env.VITE_SETA_GATEWAY_URL
});

export { setaGatewayApiClient };
