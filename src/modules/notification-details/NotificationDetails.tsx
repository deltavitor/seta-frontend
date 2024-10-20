import "./NotificationDetails.scss";
import "../../styles/grid.scss";
import { Badge, type BadgeProps, Tooltip } from "../core";
import { Calendar, HelpCircle } from "lucide-react";
import {
    parseNotificationIdade,
    getNotificationLabExams,
    getNotificationSymptoms,
    parseDate,
    getNotificationType
} from "../../utils";
import { NotificationPredictionBadge, NotificationStatusBadge } from "../index";
import type { Notification, NotificationLocation } from "../../types";
import { useGetNotificationByNumeroNotificacao } from "../../hooks";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

type NotificationDetailsProps = {
    numeroNotificacao: Notification["numeroNotificacao"],
    notificationLocation?: NotificationLocation,
    setSelectedNotificationDataSintomas: Dispatch<SetStateAction<Notification["dataDiagnosticoSintomaParsed"]>>,
    relatedNotificationLocations?: Array<NotificationLocation>,
};

function NotificationDetails(props: NotificationDetailsProps) {

    const { data: notification, status } = useGetNotificationByNumeroNotificacao(props.numeroNotificacao);
    const { notificationLocation } = props;
    const [notificationPredictionTooltipIsVisible, setNotificationPredictionTooltipIsVisible] = useState(false);
    const [relatedNotificationsLabelRefIsVisible, setRelatedNotificationsLabelRefIsVisible] = useState(false);

    const getConfirmedRelatedNotifications = (relatedNotificationLocations: Array<NotificationLocation>) => {

        let labConfirmedCount = 0;
        let clinicalConfirmedCount = 0;
        relatedNotificationLocations.forEach(notificationLocation => {
            notificationLocation.notifications.forEach(notification => {
                const type = getNotificationType(notification);
                type === "labConfirmed" ? labConfirmedCount++ : type === "clinicalConfirmed" ? clinicalConfirmedCount++ : null;
            });
        });

        return {
            labConfirmedCount,
            clinicalConfirmedCount
        };
    };

    const getRelatedNotificationsBadge = (numberOfRelatedNotifications: {
        labConfirmedCount: number,
        clinicalConfirmedCount: number,
    }) => {

        const { labConfirmedCount, clinicalConfirmedCount } = numberOfRelatedNotifications;

        const labConfirmedColor: BadgeProps["color"] = labConfirmedCount === 0 ? "blue" : "red";
        const labConfirmedLabel = labConfirmedCount === 1 ? "1 notificação (confirmado lab.)" : `${labConfirmedCount} notificações (confirmado lab.)`;

        const clinicalConfirmedColor: BadgeProps["color"] = clinicalConfirmedCount === 0 ? "blue" : "red";
        const clinicalConfirmedLabel = clinicalConfirmedCount === 1 ? "1 notificação (confirmado clínico-epidem.)" : `${clinicalConfirmedCount} notificações (confirmado clínico-epidem.)`;

        const labConfirmedBadge = labConfirmedCount > 0 &&
            <Badge kind={"heavy"} color={labConfirmedColor}>
                {labConfirmedLabel}
            </Badge>

        const clinicalConfirmedBadge = clinicalConfirmedCount > 0 &&
            <Badge kind={"heavy"} color={clinicalConfirmedColor}>
                {clinicalConfirmedLabel}
            </Badge>

        return (
            <div className={"seta__row"}>
                <div className={"seta__notification-details__field seta__col-1"}>
                    <div className={"seta__notification-details__label seta__notification-details__tooltip-trigger"}>
                        <span
                            style={{display: "inline-flex", alignItems: "center"}}
                            onMouseEnter={() => setRelatedNotificationsLabelRefIsVisible(true)}
                            onMouseLeave={() => setRelatedNotificationsLabelRefIsVisible(false)}
                        >
                            Notificações confirmadas nas proximidades
                            <HelpCircle style={{marginLeft: "0.25rem"}} size={16}/>
                        </span>
                        <Tooltip hidden={!relatedNotificationsLabelRefIsVisible}>
                            Esse cálculo mostra notificações relacionadas a este caso, com início de sintomas até 7 dias antes ou depois,
                            e que estão em um raio de 300m da residência desta notificação
                        </Tooltip>
                    </div>
                    <div className={"seta__notification-details__list"}>
                        {
                            labConfirmedCount == 0 && clinicalConfirmedCount == 0 ?
                                <Badge kind={"heavy"} color={"blue"}>Sem notificações</Badge>
                            : <>
                                {labConfirmedBadge}
                                {clinicalConfirmedBadge}
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (!notification) return;

        props.setSelectedNotificationDataSintomas(parseDate(notification.dataDiagnosticoSintoma));
    }, [notification]);

    return (
        <div className={"seta__notification-details"}>
            {status === "pending" ? (
                "Loading"
            ) : status === "error" ? (
                "Error"
            ) : (
                <>
                    <div className={"seta__notification-details__header"}>
                        <div className={"seta__notification-details__header__content"}>
                            <small className={"seta__notification-details__label"}>Notificação</small>
                            <span className={"seta__notification-details__header__title"}>
                                {notification.numeroNotificacao}
                            </span>
                        </div>
                        <NotificationStatusBadge notification={notification} />
                    </div>

                    <span className={"seta__notification-details__subheader"}>
                        <Calendar size={16} style={{marginRight: "0.5rem"}}/>{notification.dataNotificacao.toString()}
                    </span>

                    <div className={"seta__notification-details__content"}>
                        <div className={"seta__notification-details__content__section"}>
                            <span className={"seta__notification-details__content__section__title"}>
                                Paciente<hr></hr>
                            </span>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-1"}>
                                    <small className={"seta__notification-details__label"}>Nome do paciente</small>
                                    <span>{notification.nomePaciente || "-"}</span>
                                </div>
                            </div>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Idade</small>
                                    <span>{parseNotificationIdade(notification.idade) || "-"}</span>
                                </div>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Sexo</small>
                                    <span>{notification.sexo || "-"}</span>
                                </div>
                            </div>
                        </div>

                        <div className={"seta__notification-details__content__section"}>
                            <span className={"seta__notification-details__content__section__title"}>
                                Endereço<hr></hr>
                            </span>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Logradouro</small>
                                    <span>{notification.logradouroResidencia || "-"}</span>
                                </div>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Número</small>
                                    <span>{notification.numeroResidencia || "-"}</span>
                                </div>
                            </div>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Bairro</small>
                                    <span>{notification.bairroResidencia || "-"}</span>
                                </div>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Complemento</small>
                                    <span>{notification.complementoResidencia || "-"}</span>
                                </div>
                            </div>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-1"}>
                                    <small className={"seta__notification-details__label"}>
                                        Endereço computado
                                    </small>
                                    <span>{notificationLocation?.formattedAddress || "Notificação não mapeada"}</span>
                                </div>
                            </div>
                        </div>

                        <div className={"seta__notification-details__content__section"}>
                            <span className={"seta__notification-details__content__section__title"}>
                                Investigação<hr></hr>
                            </span>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-1"}>
                                    <small className={"seta__notification-details__label"}>
                                        Data de início dos sintomas
                                    </small>
                                    <span>{notification.dataDiagnosticoSintoma.toString() || "-"}</span>
                                </div>
                            </div>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-1"}>
                                    <small className={"seta__notification-details__label"}>Sintomas</small>
                                    <div className={"seta__notification-details__list"}>
                                        {Object.entries(getNotificationSymptoms(notification)).filter(([, value]) => value).length > 0 ? (
                                            Object.entries(getNotificationSymptoms(notification)).map(([key, value]) =>
                                                value ? <Badge kind={"light"} color={"red"} key={key}>{key}</Badge> : null
                                            )
                                        ) : (
                                            <Badge kind={"light"} color={"gray"}>Sem sintomas</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {
                                Object.entries(getNotificationLabExams(notification)).map(([key, value]) =>
                                    value.date && value.result && value.result !== "4" ? (
                                        <div key={key} className={"seta__row"}>
                                            <div className={"seta__notification-details__field seta__col-2"}>
                                                <small className={"seta__notification-details__label"}>{key}</small>
                                                <span className={"seta__notification-details__inline-field"}>
                                                    <Calendar size={16} style={{marginRight: "0.5rem"}}/>
                                                    {value.date.toString()}
                                                </span>
                                            </div>
                                            <div className={"seta__notification-details__field seta__col-2"}>
                                                <span className={"seta__notification-details__field"}>
                                                    <Badge kind={"light"}
                                                           color={value.result === "Positivo" ? "red" : value.result === "Negativo" ? "blue" : "gray"}>
                                                        {value.result}
                                                    </Badge>
                                                </span>
                                            </div>
                                        </div>
                                    ) : null)
                            }
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Classificação final</small>
                                    <span>{notification.classificacaoFinal || "-"}</span>
                                </div>
                                <div className={"seta__notification-details__field seta__col-2"}>
                                    <small className={"seta__notification-details__label"}>Critério confirmação</small>
                                    <span>{notification.criterioConfirmacao || "-"}</span>
                                </div>
                            </div>
                        </div>

                        <div className={"seta__notification-details__content__section"}>
                            <span className={"seta__notification-details__content__section__title"}>
                                Análise<hr></hr>
                            </span>
                            <div className={"seta__row"}>
                                <div className={"seta__notification-details__field seta__col-1"}>
                                    <div className={"seta__notification-details__label seta__notification-details__tooltip-trigger"}>
                                        <span
                                            onMouseEnter={() => setNotificationPredictionTooltipIsVisible(true)}
                                            onMouseLeave={() => setNotificationPredictionTooltipIsVisible(false)}
                                            style={{display: "inline-flex", alignItems: "center"}}>
                                            Probabilidade de ser dengue pelos sintomas<HelpCircle style={{marginLeft: "0.25rem"}} size={16} />
                                        </span>
                                        <Tooltip hidden={!notificationPredictionTooltipIsVisible}>
                                            Esse cálculo é feito por uma Inteligência Artificial
                                            que analisa os sintomas e a idade do paciente para chegar à essa conclusão
                                        </Tooltip>
                                    </div>
                                    <NotificationPredictionBadge notification={notification}/>
                                </div>
                            </div>
                            {props.notificationLocation ? props.relatedNotificationLocations &&
                                getRelatedNotificationsBadge(getConfirmedRelatedNotifications(props.relatedNotificationLocations))
                                : null
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default NotificationDetails;
