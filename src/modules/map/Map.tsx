import colors from "../../styles/colors.module.scss";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Marker as SetaMarker, type MarkerProps } from "../core";
import type { Notification, NotificationLocation } from "../../types";
import { DivIcon } from "leaflet";
import React, { type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { ClassificacoesFinais, CriteriosConfirmacao } from "../../consts";
import { MapPin } from "lucide-react";

type MapProps = {
    notificationLocations: Array<NotificationLocation>;
    setNumeroNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>;
    notificationLocation?: NotificationLocation;
    setNotificationLocation: React.Dispatch<React.SetStateAction<NotificationLocation | undefined>>;
};

function Map(props: MapProps) {

    const centerLatitude = props.notificationLocations[0]?.latitude;
    const centerLongitude = props.notificationLocations[0]?.longitude;

    const getNotificationLocationMarker = (
        index: number,
        notificationLocation: NotificationLocation,
        selectedNotificationLocation: NotificationLocation | undefined,
    ): ReactNode => {

        const { latitude, longitude } = notificationLocation;
        const isSelectedNotificationLocation = notificationLocation.numeroNotificationLocation === selectedNotificationLocation?.numeroNotificationLocation;

        const markerSize = isSelectedNotificationLocation ? 42 : 24;

        const firstNotification = notificationLocation.notifications[0];
        const props: MarkerProps = {
            markerSize: markerSize,
            shape: firstNotification.criterioConfirmacao === CriteriosConfirmacao.ConfirmedThroughLabAnalysis ? "diamond" : "circle",
            color: firstNotification.classificacaoFinal === ClassificacoesFinais.Empty || firstNotification.classificacaoFinal === ClassificacoesFinais.Inconclusive ? "yellow" :
                firstNotification.classificacaoFinal === ClassificacoesFinais.Discarded ? "blue" : "red",
        };

        if (notificationLocation.notifications.length > 1) {
            props.shape = "circle";
            props.color = "white";
            props.label = `${notificationLocation.notifications.length}`;
        }

        const marker = isSelectedNotificationLocation ?
            <MapPin size={markerSize} fill={colors.teal400} stroke={colors.white}/> :
            <SetaMarker {...props}></SetaMarker>;

        // TODO update this to better handle the focused map marker

        const icon = new DivIcon({
            html: renderToString(marker),
            iconSize: [markerSize, markerSize],
            className: "",
        });

        return (
            <Marker
                key={index}
                icon={icon}
                position={[latitude, longitude]}
                eventHandlers={{
                    click: () => handleMarkerClick(notificationLocation)
                }}
            />
        );
    };

    const handleMarkerClick = (notificationLocation: NotificationLocation) => {
        props.setNotificationLocation(notificationLocation)
        if (notificationLocation.notifications.length === 1)
            props.setNumeroNotificacao(notificationLocation.notifications[0].numeroNotificacao);
        else
            props.setNumeroNotificacao("-1");
    };

    return (
        <MapContainer center={[centerLatitude, centerLongitude]} zoom={15} zoomControl={false} attributionControl={false} >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            {props.notificationLocations.map((notificationLocation, index) => {
                return getNotificationLocationMarker(index, notificationLocation, props.notificationLocation)
            })}
        </MapContainer>
    );
}

export default Map;
