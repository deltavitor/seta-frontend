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
}

const SelectedNotificationContext = createContext<SelectedNotificationContext | undefined>(undefined);

function SelectedNotificationContextProvider(props: SelectedNotificationContextProviderProps) {

    const [selectedNotificationLocation, setSelectedNotificationLocation] = useState<NotificationLocation>();
    const [selectedNumeroNotificacao, setSelectedNumeroNotificacao] = useState<Notification["numeroNotificacao"]>("0");

    return (
        <SelectedNotificationContext.Provider value={{
            selectedNotificationLocation,
            setSelectedNotificationLocation,
            selectedNumeroNotificacao,
            setSelectedNumeroNotificacao
        }}>
            {props.children}
        </SelectedNotificationContext.Provider>
    )
}

export {
    SelectedNotificationContextProvider,
    SelectedNotificationContext,
};
