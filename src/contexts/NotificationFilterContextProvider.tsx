import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import type {
    MapLayerFilter as MapLayerFilterType, NotificationTimeFilter as NotificationTimeFilterType,
    NotificationTypeFilter as NotificationTypeFilterType
} from "../types";

type FilterContextProps = {
    children: ReactNode;
};

type NotificationFilterContext = {
    notificationTypeFilter: NotificationTypeFilterType,
    setNotificationTypeFilter: Dispatch<SetStateAction<NotificationTypeFilterType>>
    mapLayerFilter: MapLayerFilterType,
    setMapLayerFilter: Dispatch<SetStateAction<MapLayerFilterType>>,
    notificationTimeFilter: NotificationTimeFilterType,
    setNotificationTimeFilter: Dispatch<SetStateAction<NotificationTimeFilterType>>,
    timelineIsPlaying: boolean,
    setTimelineIsPlaying: Dispatch<SetStateAction<boolean>>,
    timelineDelay: number,
    setTimelineDelay: Dispatch<SetStateAction<number>>,
}

const NotificationFilterContext = createContext<NotificationFilterContext | undefined>(undefined);

function NotificationFilterContextProvider(props: FilterContextProps) {

    const [notificationTypeFilter, setNotificationTypeFilter] = useState<NotificationTypeFilterType>({
        labConfirmed: true,
        labDiscarded: true,
        clinicalConfirmed: true,
        clinicalDiscarded: true,
        underInvestigation: true,
    });
    const [mapLayerFilter, setMapLayerFilter] = useState<MapLayerFilterType>({
        notifications: true,
        heatmap: false,
    });
    const [notificationTimeFilter, setNotificationTimeFilter] = useState<NotificationTimeFilterType>({
        startDate: undefined,
        endDate: undefined,
        originalStartDate: undefined,
        originalEndDate: undefined,
    });
    const [timelineIsPlaying, setTimelineIsPlaying] = useState(false);
    const [timelineDelay, setTimelineDelay] = useState(200);

    return (
        <NotificationFilterContext.Provider value={{
            notificationTypeFilter,
            setNotificationTypeFilter,
            mapLayerFilter,
            setMapLayerFilter,
            notificationTimeFilter,
            setNotificationTimeFilter,
            timelineIsPlaying,
            setTimelineIsPlaying,
            timelineDelay,
            setTimelineDelay
        }}>
            {props.children}
        </NotificationFilterContext.Provider>
    )
}

export {
    NotificationFilterContextProvider,
    NotificationFilterContext,
};
