import { createContext, type Dispatch, type ReactNode, type SetStateAction, useState } from "react";
import type { Notification, NotificationLocation } from "../types";

type SelectedNotificationContextProviderProps = {
    children: ReactNode;
};

type SelectedNotificationContext = {
    selectedNotificationLocation?: NotificationLocation,
    setSelectedNotificationLocation: Dispatch<SetStateAction<NotificationLocation | undefined>>
    selectedNumeroNotificacao: Notification["numeroNotificacao"],
    setSelectedNumeroNotificacao: Dispatch<SetStateAction<Notification["numeroNotificacao"]>>,
    selectedNotificationDataSintomas: Notification["dataDiagnosticoSintomaParsed"],
    setSelectedNotificationDataSintomas: Dispatch<SetStateAction<Notification["dataDiagnosticoSintomaParsed"]>>,
    relatedNotificationLocations?: Array<NotificationLocation>,
    setRelatedNotificationLocations: Dispatch<SetStateAction<Array<NotificationLocation> | undefined>>,
}

const SelectedNotificationContext = createContext<SelectedNotificationContext | undefined>(undefined);

function SelectedNotificationContextProvider(props: SelectedNotificationContextProviderProps) {

    const [selectedNotificationLocation, setSelectedNotificationLocation] = useState<NotificationLocation>();
    const [selectedNumeroNotificacao, setSelectedNumeroNotificacao] = useState<Notification["numeroNotificacao"]>("0");
    const [selectedNotificationDataSintomas, setSelectedNotificationDataSintomas] = useState<Notification["dataDiagnosticoSintomaParsed"]>();
    const [relatedNotificationLocations, setRelatedNotificationLocations] = useState<Array<NotificationLocation> | undefined>();

    return (
        <SelectedNotificationContext.Provider value={{
            selectedNotificationLocation,
            setSelectedNotificationLocation,
            selectedNumeroNotificacao,
            setSelectedNumeroNotificacao,
            selectedNotificationDataSintomas,
            setSelectedNotificationDataSintomas,
            relatedNotificationLocations,
            setRelatedNotificationLocations
        }}>
            {props.children}
        </SelectedNotificationContext.Provider>
    )
}

export {
    SelectedNotificationContextProvider,
    SelectedNotificationContext,
};
