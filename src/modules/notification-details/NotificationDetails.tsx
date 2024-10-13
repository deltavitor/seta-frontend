import "./NotificationDetails.scss";
import "../../styles/grid.scss";
import { Badge } from "../core";
import { Calendar } from "lucide-react";
import { parseNotificationIdade, getNotificationLabExams, getNotificationSymptoms } from "../../utils";
import { NotificationPredictionBadge, NotificationStatusBadge } from "../index";
import type { Notification, NotificationLocation } from "../../types";
import { useGetNotificationByNumeroNotificacao } from "../../hooks";

type NotificationDetailsProps = {
    numeroNotificacao: Notification["numeroNotificacao"],
    notificationLocation: NotificationLocation,
};

function NotificationDetails(props: NotificationDetailsProps) {

    const { data: notification, status } = useGetNotificationByNumeroNotificacao(props.numeroNotificacao);
    const { notificationLocation } = props;

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
                                    <span>{notificationLocation.formattedAddress || "-"}</span>
                                </div>
                            </div>
                        </div>

                        <div className={"seta__notification-details__content__section"}>
                            <span className={"seta__notification-details__content__section__title"}>
                                Diagnóstico<hr></hr>
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
                                    <small className={"seta__notification-details__label"}>
                                        Probabilidade de ser dengue pelos sintomas
                                    </small>
                                    <NotificationPredictionBadge notification={notification}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default NotificationDetails;
