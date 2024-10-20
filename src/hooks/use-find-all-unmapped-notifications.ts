import { useQuery } from "@tanstack/react-query";
import type { Notification } from "../types";
import { notificationService } from "../services";

const useFindAllUnmappedNotifications = () => {

    return useQuery<Array<Notification>, Error>({
        queryKey: ["unmappedNotifications"],
        queryFn: () => {
            return notificationService.findAllUnmappedNotifications()
        },
    });
}

export default useFindAllUnmappedNotifications;
