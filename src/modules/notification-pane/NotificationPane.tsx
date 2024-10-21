import "./NotificationPane.scss"
import "../../styles/grid.scss"
import type { Notification, NotificationSummary } from "../../types";
import { NotificationDetails, NotificationSummaryList } from "../index";
import React, { useContext, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";
import { SelectedNotificationContext } from "../../contexts";

type NotificationPaneProps = {
    unmappedNotifications?: Array<NotificationSummary>,
};

function NotificationPane(props: NotificationPaneProps) {

    const selectedNofication = useContext(SelectedNotificationContext);
    const previousNumeroNotificacaoRef = useRef<Notification["numeroNotificacao"]>("0");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const deselectNotification = () => {
        // If no notificationLocation was selected, the user was viewing an unmapped notification - so we can go back
        // to the unmapped view (-2)
        if (!selectedNofication?.selectedNotificationLocation) {
            selectedNofication?.setSelectedNumeroNotificacao("-2");
            selectedNofication?.setRelatedNotificationLocations(undefined);
            selectedNofication?.setSelectedNotificationLocation(undefined);
        }
        else
            selectedNofication?.setSelectedNumeroNotificacao("-1");
    };

    const deselectNotificationLocation = () => {
        selectedNofication?.setSelectedNotificationLocation(undefined);
        selectedNofication?.setSelectedNumeroNotificacao("0");
        selectedNofication?.setRelatedNotificationLocations(undefined);
    };

    useEffect(() => {
        setIsExpanded(selectedNofication?.selectedNumeroNotificacao !== "0");
        if (selectedNofication)
            previousNumeroNotificacaoRef.current = selectedNofication.selectedNumeroNotificacao;
    }, [selectedNofication?.selectedNumeroNotificacao]);

    const classes = classNames({
        "seta__notification-pane": true,
        "seta__notification-pane--expanded": isExpanded,
    });

    return (
        <div className={classes}>
            <button className={"seta__notification-pane__toggle-button"} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronRight size={24}/> : <ChevronLeft size={24}/>}
            </button>
            {
                isExpanded ?
                    props.unmappedNotifications && !selectedNofication?.selectedNotificationLocation && selectedNofication?.selectedNumeroNotificacao === "-2" ?
                        <div className={"seta__notification-pane__body"}>
                                <button className={"seta__notification-pane__back-button"} onClick={deselectNotificationLocation}>
                                    <ArrowLeft size={18} style={{marginRight: "0.5rem"}}/>Voltar
                                </button>
                                <NotificationSummaryList
                                    setNumeroNotificacao={selectedNofication.setSelectedNumeroNotificacao}
                                    notifications={props.unmappedNotifications}
                                />
                            </div>
                    : selectedNofication?.selectedNumeroNotificacao && selectedNofication?.selectedNumeroNotificacao !== "-1" && selectedNofication?.selectedNumeroNotificacao !== "0" ?
                        <div className={"seta__notification-pane__body"}>
                            <button className={"seta__notification-pane__back-button"} onClick={deselectNotification}>
                                <ArrowLeft size={18} style={{marginRight: "0.5rem"}}/>Voltar
                            </button>
                            <NotificationDetails
                                numeroNotificacao={selectedNofication?.selectedNumeroNotificacao}
                                notificationLocation={selectedNofication.selectedNotificationLocation}
                                setSelectedNotificationDataSintomas={selectedNofication.setSelectedNotificationDataSintomas}
                                relatedNotificationLocations={selectedNofication.relatedNotificationLocations}
                            />
                        </div>
                        : selectedNofication?.selectedNotificationLocation ?
                            <div className={"seta__notification-pane__body"}>
                                <button className={"seta__notification-pane__back-button"} onClick={deselectNotificationLocation}>
                                    <ArrowLeft size={18} style={{marginRight: "0.5rem"}}/>Voltar
                                </button>
                                <NotificationSummaryList
                                    setNumeroNotificacao={selectedNofication.setSelectedNumeroNotificacao}
                                    notificationLocation={selectedNofication.selectedNotificationLocation}
                                    notifications={selectedNofication.selectedNotificationLocation.notifications}
                                />
                            </div>
                            :
                            <div className={"seta__notification-pane__placeholder"}>
                                Selecione uma notificação no mapa para ver seus detalhes
                            </div>
                    : null
            }
        </div>
    );
}

export default NotificationPane;
