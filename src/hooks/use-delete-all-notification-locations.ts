import { useMutation } from "@tanstack/react-query";
import { notificationLocationService } from "../services";

const useDeleteAllNotificationLocations = () => {

    return useMutation({
        mutationFn: () => {
            return notificationLocationService.deleteAllNotificationLocations();
        },
    });
}

export default useDeleteAllNotificationLocations;
