import "./NotificationPane.scss"
import "../../styles/grid.scss"
import type { Notification, NotificationLocation } from "../../types";
import { NotificationDetails, NotificationSummaryList } from "../index";
import React, { useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";

type NotificationPaneOptions = {
    numeroNotificacao: Notification["numeroNotificacao"],
    setNumeroNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>;
    notificationLocation?: NotificationLocation;
};

function NotificationPane(props: NotificationPaneOptions) {

    const previousNumeroNotificacaoRef = useRef<Notification["numeroNotificacao"]>("0");
    const [isExpanded, setIsExpanded] = React.useState(false);

    const classes = classNames({
        "seta__notification-pane": true,
        "seta__notification-pane--expanded": isExpanded,
    });

    useEffect(() => {
        setIsExpanded(props.numeroNotificacao !== "0");
        previousNumeroNotificacaoRef.current = props.numeroNotificacao;
    }, [props.numeroNotificacao]);

    return (
        <div className={classes}>
            <button className={"seta__notification-pane__toggle-button"} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronRight size={24}/> : <ChevronLeft size={24}/>}
            </button>
            {
                isExpanded ?
                    props.notificationLocation && props.numeroNotificacao !== "-1" && props.numeroNotificacao !== "0" ?
                        <div className={"seta__notification-pane__body"}>
                            <button className={"seta__notification-pane__back-button"} onClick={() => props.setNumeroNotificacao("-1")}>
                                <ArrowLeft size={18} style={{marginRight: "0.5rem"}}/>Voltar
                            </button>
                            <NotificationDetails numeroNotificacao={props.numeroNotificacao} notificationLocation={props.notificationLocation}/>
                        </div>
                        : props.notificationLocation ?
                            <div className={"seta__notification-pane__body"}>
                                <NotificationSummaryList setNumeroNotificacao={props.setNumeroNotificacao} notificationLocation={props.notificationLocation}/>
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
