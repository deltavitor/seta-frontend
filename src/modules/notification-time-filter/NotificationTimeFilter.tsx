import "./NotificationTimeFilter.scss";
import type { NotificationTimeFilter } from "../../types";
import React, { useRef } from "react";
import classNames from "classnames";
import { parseDate } from "../../utils";
import { Button } from "../core";

type NotificationTimeFilterProps = {
    hidden?: boolean;
    filters: NotificationTimeFilter,
    setNotificationTimeFilter: React.Dispatch<React.SetStateAction<NotificationTimeFilter>>;
};

function NotificationTimeFilter(props: NotificationTimeFilterProps) {

    const [isInvalid, setIsInvalid] = React.useState(false);
    const startDateInputRef = useRef<HTMLInputElement>(null);
    const endDateInputRef = useRef<HTMLInputElement>(null);

    const applyFilter = () => {
        const startDateValue = startDateInputRef.current?.value;
        const endDateValue = endDateInputRef.current?.value;
        if (!startDateValue || !endDateValue) return setIsInvalid(true);

        const startDate = parseDate(startDateValue);
        const endDate = parseDate(endDateValue);
        if (!startDate || !endDate) return setIsInvalid(true);

        const newFilterState = {
            startDate: startDate,
            endDate: endDate,
        };
        props.setNotificationTimeFilter(newFilterState);
        setIsInvalid(false);
    };

    const resetFilter = () => {
        if (startDateInputRef.current) startDateInputRef.current.value = "";
        if (endDateInputRef.current) endDateInputRef.current.value = "";
        props.setNotificationTimeFilter({
            startDate: undefined,
            endDate: undefined,
        });
        setIsInvalid(false);
    };

    const classes = classNames({
        "seta__notification-time-filter": true,
        "seta__notification-time-filter--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            <div className={"seta__notification-time-filter__header"}>
                <span className={"seta__notification-time-filter__title"}>Filtros de tempo</span>
                <span className={"seta__notification-time-filter__subtitle"}>
                    Filtre notificações com datas de notificação dentro do período especificado
                </span>
            </div>
            <div className={"seta__notification-time-filter__body"}>
                <label className={"seta__notification-time-filter__label"} htmlFor={"start-date-input"}>
                    Data inicial
                </label>
                <div className={"seta__notification-time-filter__input-wrapper"}>
                    <input className={"seta__notification-time-filter__input"} ref={startDateInputRef}
                           id={"start-date-input"} placeholder={"DD/MM/AAAA"}/>
                </div>

                <label className={"seta__notification-time-filter__label"} htmlFor={"end-date-input"}>
                    Data final
                </label>
                <div className={"seta__notification-time-filter__input-wrapper"}>
                    <input className={"seta__notification-time-filter__input"} ref={endDateInputRef}
                           id={"end-date-input"} placeholder={"DD/MM/AAAA"}/>
                </div>
                {isInvalid &&
                    <span className={"seta__notification-time-filter__error-text"}>
                        Erro: data inválida.<br/>Por favor, digite os valores de data seguindo o padrão dia/mês/ano
                    </span>
                }
            </div>
            <div className={"seta__notification-time-filter__footer"}>
                <Button size={"small"} kind={"secondary"} onClick={applyFilter}>Aplicar</Button>
                <Button size={"small"} kind={"tertiary"} onClick={resetFilter}>Redefinir</Button>
            </div>
        </div>
    );
}

export default NotificationTimeFilter;
