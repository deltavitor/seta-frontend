import "./NotificationSummaryList.scss";
import "../../styles/grid.scss";
import type { Notification, NotificationLocation, NotificationSummary } from "../../types";
import { NotificationStatusBadge } from "../index";
import { ArrowRight, ClipboardPen, Thermometer } from "lucide-react";
import { Button } from "../core";
import React from "react";

type NotificationSummaryListProps = {
    setNumeroNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>;
    notificationLocation?: NotificationLocation;
    notifications: Array<Notification | NotificationSummary>;
    title?: string;
};

function NotificationSummaryList(props: NotificationSummaryListProps) {

    return (
        <div className={"seta__notification-summary-list"}>
            <div className={"seta__notification-summary-list__header"}>
                <span className={"seta__notification-summary-list__header__title"}>
                    {props.title ? props.title : "Notificações neste local"}
                </span>
            </div>
            {props.notificationLocation &&
                <div className={"seta__notification-summary-list__field seta__col-1"}>
                    <small className={"seta__notification-details__label"}>
                        Endereço computado
                    </small>
                    <span>{props.notificationLocation.formattedAddress || "-"}</span>
                </div>
            }
            {props.notifications.map((notificationSummary) => {
                return (
                    <div className={"seta__notification-summary-list__card"} key={notificationSummary.numeroNotificacao}>
                        <div className={"seta__notification-summary-list__card__header"}>
                            <span className={"seta__notification-summary-list__card__header__title"}>
                                {notificationSummary.numeroNotificacao}
                            </span>
                            <NotificationStatusBadge size={"small"} notification={notificationSummary}/>
                        </div>
                        <div className={"seta__notification-summary-list__card__body"}>
                            <span className={"seta__notification-summary-list__inline-field seta__col-2"} title={"Data de início dos sintomas"}>
                                <Thermometer size={16} style={{marginRight: "0.375rem"}}/>
                                {notificationSummary.dataDiagnosticoSintoma}
                            </span>
                            <span className={"seta__notification-summary-list__inline-field seta__col-2"} title={"Data da notificação"}>
                                <ClipboardPen size={16} style={{marginRight: "0.375rem"}}/>
                                {notificationSummary.dataNotificacao}
                            </span>
                        </div>
                        <div className={"seta__notification-summary-list__card__footer"}>
                            <span className={"seta__notification-summary-list__inline-field seta__col-1"}>
                                <Button size={"small"} kind={"secondary"}
                                        onClick={() => props.setNumeroNotificacao(notificationSummary.numeroNotificacao)}>
                                    Ver notificação<ArrowRight size={16}/>
                                </Button>
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default NotificationSummaryList;
