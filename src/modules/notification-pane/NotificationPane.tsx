import "./NotificationPane.scss"
import "../../styles/grid.scss"
import type { Notification } from "../../types";
import { NotificationDetails, NotificationSummaryList } from "../index";
import React, { useContext, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";
import { SelectedNotificationContext } from "../../contexts";

function NotificationPane() {

    const selectedNofication = useContext(SelectedNotificationContext);
    const previousNumeroNotificacaoRef = useRef<Notification["numeroNotificacao"]>("0");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const classes = classNames({
        "seta__notification-pane": true,
        "seta__notification-pane--expanded": isExpanded,
    });

    useEffect(() => {
        setIsExpanded(selectedNofication?.selectedNumeroNotificacao !== "0");
        if (selectedNofication)
            previousNumeroNotificacaoRef.current = selectedNofication.selectedNumeroNotificacao;
    }, [selectedNofication?.selectedNumeroNotificacao]);

    return (
        <div className={classes}>
            <button className={"seta__notification-pane__toggle-button"} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronRight size={24}/> : <ChevronLeft size={24}/>}
            </button>
            {
                isExpanded ?
                    selectedNofication?.selectedNotificationLocation && selectedNofication?.selectedNumeroNotificacao !== "-1" && selectedNofication?.selectedNumeroNotificacao !== "0" ?
                        <div className={"seta__notification-pane__body"}>
                            <button className={"seta__notification-pane__back-button"} onClick={() => selectedNofication?.setSelectedNumeroNotificacao("-1")}>
                                <ArrowLeft size={18} style={{marginRight: "0.5rem"}}/>Voltar
                            </button>
                            <NotificationDetails numeroNotificacao={selectedNofication?.selectedNumeroNotificacao} notificationLocation={selectedNofication.selectedNotificationLocation}/>
                        </div>
                        : selectedNofication?.selectedNotificationLocation ?
                            <div className={"seta__notification-pane__body"}>
                                <NotificationSummaryList setNumeroNotificacao={selectedNofication.setSelectedNumeroNotificacao} notificationLocation={selectedNofication.selectedNotificationLocation}/>
                            </div>
                        :
                        <div>
                            Selecione uma notificação no mapa
                        </div>
                : null
            }
        </div>
    );
}

export default NotificationPane;
