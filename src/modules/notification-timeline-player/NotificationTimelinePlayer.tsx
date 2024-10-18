import "./NotificationTimelinePlayer.scss";
import classNames from "classnames";
import React, { useContext } from "react";
import { Button } from "../core";
import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
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

        const timelineIsPlaying = !notificationFilters.timelineIsPlaying;
        notificationFilters.setTimelineIsPlaying(timelineIsPlaying);
        if (!timelineIsPlaying) return;

        const startDate = notificationFilters.notificationTimeFilter.originalStartDate ?? props.earliestNotificationDate;
        const endDate = notificationFilters.notificationTimeFilter.originalEndDate ?? props.latestNotificationDate;

        const hasFinishedPlaying = (endDate && notificationFilters.notificationTimeFilter.endDate &&
            notificationFilters.notificationTimeFilter.endDate >= endDate) || !endDate || !notificationFilters.notificationTimeFilter.endDate;

        if (hasFinishedPlaying)
            notificationFilters.setNotificationTimeFilter(prevState => {
                return {
                    ...prevState,
                    startDate: startDate,
                    endDate: startDate,
                }
            });
    };

    const stopTimeline = () => {
        notificationFilters?.setNotificationTimeFilter(prevState => {
            return {
                ...prevState,
                startDate: prevState.originalStartDate,
                endDate: prevState.originalEndDate,
            }
        });
        notificationFilters?.setTimelineIsPlaying(false);
    };

    const moveTimeline = (days: number) => {
        const startDate = notificationFilters?.notificationTimeFilter.startDate ?
            notificationFilters.notificationTimeFilter.startDate : props.earliestNotificationDate;
        const finalEndDate = notificationFilters?.notificationTimeFilter.originalEndDate ?
            notificationFilters.notificationTimeFilter.originalEndDate : props.latestNotificationDate;

        notificationFilters?.setNotificationTimeFilter(prevFilter => {
            if (!prevFilter.endDate) return prevFilter;
            const endDate = new Date(prevFilter.endDate);
            endDate.setDate(endDate.getDate() + days);
            if (endDate >= finalEndDate)
                notificationFilters.setTimelineIsPlaying(false);

            return {
                ...prevFilter,
                startDate: startDate,
                endDate: endDate,
            };
        });
    };

    const moveTimelineBackward = () => {
        if (!notificationFilters) return;
        const startDate = notificationFilters?.notificationTimeFilter.startDate ?
            notificationFilters.notificationTimeFilter.startDate : props.earliestNotificationDate;
        if (!notificationFilters.notificationTimeFilter.endDate || notificationFilters.notificationTimeFilter.endDate > startDate)
            moveTimeline(-1);
    };

    const moveTimelineForward = () => {
        if (!notificationFilters) return;
        const finalDate = notificationFilters.notificationTimeFilter.originalEndDate ?
            notificationFilters.notificationTimeFilter.originalEndDate : props.latestNotificationDate;
        if (!notificationFilters.notificationTimeFilter.endDate || notificationFilters.notificationTimeFilter.endDate < finalDate)
            moveTimeline(1);
    };

    useInterval(() => {
        if (!notificationFilters) return;
        moveTimeline(1);
    }, notificationFilters?.timelineIsPlaying ? notificationFilters.timelineDelay : null);


    const updateTimelineDelay = () => {
        notificationFilters?.setTimelineDelay(prevState => {
            return prevState === 100 ? 800 : prevState - 100;
        });
    };

    const getTimelineSpeed = (timelineDelay: number) => {
        switch (timelineDelay) {
            case 100: return 2.0;
            case 200: return 1.75;
            case 300: return 1.5;
            case 400: return 1.25;
            case 500: return 1.0;
            case 600: return 0.75;
            case 700: return 0.5;
            case 800: return 0.25;
        }
    };

    const timelineSpeed = getTimelineSpeed(notificationFilters?.timelineDelay ? notificationFilters.timelineDelay : 200);

    const classes = classNames({
        "seta__notification-timeline-player": true,
        "seta__notification-timeline-player--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <div className={"seta__notification-timeline-player__controls"}>
                <Button kind={"tertiary"} iconOnly={true} onClick={playTimeline}>
                    {notificationFilters?.timelineIsPlaying ? <Pause size={18}/> : <Play size={18}/>}
                </Button>
                <Button kind={"tertiary"} onClick={stopTimeline} iconOnly={true} title={"Parar linha do tempo"}>
                    <Square size={18} />
                </Button>
                <Button kind={"tertiary"} onClick={updateTimelineDelay} title={"Velocidade de reprodução"}>
                    {timelineSpeed}X
                </Button>
                <hr className={"seta__vertical-divider"} style={{margin: "0 0.25rem"}}></hr>
                <Button kind={"tertiary"} disabled={!notificationFilters?.notificationTimeFilter.startDate || !notificationFilters?.notificationTimeFilter.endDate} onClick={moveTimelineBackward} iconOnly={true} title={"Ir para o dia anterior"}>
                    <SkipBack size={18} />
                </Button>
                <Button kind={"tertiary"} disabled={!notificationFilters?.notificationTimeFilter.startDate || !notificationFilters?.notificationTimeFilter.endDate} onClick={moveTimelineForward} iconOnly={true} title={"Ir para o próximo dia"}>
                    <SkipForward size={18} />
                </Button>
            </div>
        </div>
    );
}

export default NotificationTimelinePlayer;