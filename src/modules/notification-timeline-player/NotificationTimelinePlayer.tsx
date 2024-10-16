import "./NotificationTimelinePlayer.scss";
import classNames from "classnames";
import React, { useContext } from "react";
import { Button } from "../core";
import { Play } from "lucide-react";
import { NotificationFilterContext } from "../../contexts";
import { useInterval } from "../../hooks";

type NotificationTimelinePlayerProps = {
    hidden?: boolean,
    earliestNotificationDate: Date,
    latestNotificationDate: Date,
};

function NotificationTimelinePlayer(props: NotificationTimelinePlayerProps) {

    const notificationFilters = useContext(NotificationFilterContext);

    const playTimeline = () => {
        if (!notificationFilters) return;

        const newIsRunningState = !notificationFilters.timelineIsPlaying;
        notificationFilters.setTimelineIsPlaying(newIsRunningState);

        if (newIsRunningState)
            notificationFilters.setNotificationTimeFilter({
                startDate: props.earliestNotificationDate,
                endDate: props.earliestNotificationDate,
            });
    };

    useInterval(() => {
        if (!notificationFilters) return;

        const startDate = props.earliestNotificationDate;

        notificationFilters.setNotificationTimeFilter(prevFilter => {
            if (!prevFilter.endDate) return prevFilter;
            const endDate = new Date(prevFilter.endDate);
            endDate.setDate(endDate.getDate() + 1);
            if (endDate > props.latestNotificationDate)
                notificationFilters.setTimelineIsPlaying(false);

            return {
                startDate: startDate,
                endDate: endDate,
            };
        });
    }, notificationFilters?.timelineIsPlaying ? notificationFilters.timelineDelay : null);

    const classes = classNames({
        "seta__notification-timeline-player": true,
        "seta__notification-timeline-player--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <span className={"seta__notification-timeline-player__title"}>
                Linha do tempo
            </span>
            <div className={"seta__notification-timeline-player__body"}>
                <Button kind={"tertiary"} iconOnly={true} onClick={playTimeline}>
                    {<Play size={18}/>}
                </Button>
            </div>
        </div>
    );
}

export default NotificationTimelinePlayer;