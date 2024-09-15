import { notificationService } from "../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddNotifications = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => {
            return notificationService.addNotificationsFromDbfFile(formData);
        },
        onSuccess: () => {
            // Invalidate all queries since new notifications were added to the back-end
            queryClient.invalidateQueries();
        }
    });
}

export default useAddNotifications;
