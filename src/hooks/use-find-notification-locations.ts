import { useQuery } from "@tanstack/react-query";
import { notificationLocationService } from "../services";
import type { NotificationLocation } from "../types";

const useFindNotificationLocations = () => {

    return useQuery<Array<NotificationLocation>, Error>({
        queryKey: ["notificationLocations"],
        queryFn: () => {
            return notificationLocationService.findAllNotificationLocations()
        },
    });
}

export default useFindNotificationLocations;
