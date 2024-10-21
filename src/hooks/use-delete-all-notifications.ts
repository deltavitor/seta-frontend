import { useMutation } from "@tanstack/react-query";
import { notificationService } from "../services";

const useDeleteAllNotifications = () => {

    return useMutation({
        mutationFn: () => {
            return notificationService.deleteAllNotifications();
        },
    });
}

export default useDeleteAllNotifications;
