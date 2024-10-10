import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Marker as SetaMarker, type MarkerProps } from "../core";
import type { NotificationLocation } from "../../types";
import { DivIcon } from "leaflet";
import React from "react";
import { renderToString } from "react-dom/server";
import { ClassificacoesFinais, CriteriosConfirmacao } from "../../consts";

type MapProps = {
    notificationLocations: Array<NotificationLocation>;
};

function Map(props: MapProps) {

    const centerLatitude = props.notificationLocations[0]?.latitude;
    const centerLongitude = props.notificationLocations[0]?.longitude;

    const markerSize = 24;

    const getNotificationLocationMarker = (notificationLocation: NotificationLocation): DivIcon => {

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

        const marker = <SetaMarker {...props}></SetaMarker>;

        return new DivIcon({
            html: renderToString(marker),
            iconSize: [markerSize, markerSize],
            className: ""
        });
    };

    return (
        <MapContainer center={[centerLatitude, centerLongitude]} zoom={15} zoomControl={false} attributionControl={false} >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            {props.notificationLocations.map((notificationLocation, index) => {
                return (
                    <Marker
                        key={index}
                        position={[notificationLocation.latitude, notificationLocation.longitude]}
                        icon={getNotificationLocationMarker(notificationLocation)}
                    >
                        <Popup>
                            {notificationLocation.latitude},{notificationLocation.longitude}
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    );
}

export default Map;
