import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../services";
import type { Notification } from "../types";

const useGetNotificationByNumeroNotificacao = (numeroNotificacao: Notification["numeroNotificacao"]) => {

    return useQuery<Notification, Error>({
        queryKey: ["notification", numeroNotificacao],
        queryFn: () => {
            return notificationService.getNotificationByNumeroNotificacao(numeroNotificacao)
        },
        enabled: !!numeroNotificacao,
    });
};

export default useGetNotificationByNumeroNotificacao;