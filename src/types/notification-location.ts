import type NotificationSummary from "./notification-summary";

type NotificationLocation = {
    numeroNotificationLocation: string,
    latitude: number,
    longitude: number,
    formattedAddress: string,
    locationType: "ROOFTOP" | "RANGE_INTERPOLATED" | "APPROXIMATE",
    notifications: Array<NotificationSummary>
};

export default NotificationLocation;
