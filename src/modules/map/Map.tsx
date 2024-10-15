import colors from "../../styles/colors.module.scss";
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { Marker as SetaMarker, type MarkerProps } from "../core";
import type { MapLayerFilter, Notification, NotificationLocation } from "../../types";
import { DivIcon } from "leaflet";
import React, { type ReactNode, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { ClassificacoesFinais, CriteriosConfirmacao } from "../../consts";
import { MapPin } from "lucide-react";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";

type MapProps = {
    notificationLocations: Array<NotificationLocation>;
    setNumeroNotificacao: React.Dispatch<React.SetStateAction<Notification["numeroNotificacao"]>>;
    notificationLocation?: NotificationLocation;
    setNotificationLocation: React.Dispatch<React.SetStateAction<NotificationLocation | undefined>>;
    mapLayerFilter: MapLayerFilter;
};

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

function Map(props: MapProps) {

    const [heatMapPoints, setHeatMapPoints] = React.useState<Array<[number, number, number]>>([]);

    const layerControlInputs = document.querySelectorAll<HTMLInputElement>(".leaflet-control-layers-selector");

    const centerLatitude = props.notificationLocations[0]?.latitude;
    const centerLongitude = props.notificationLocations[0]?.longitude;

    const getNotificationLocationMarker = (
        index: number,
        notificationLocation: NotificationLocation,
        selectedNotificationLocation: NotificationLocation | undefined,
    ): ReactNode => {

        const { latitude, longitude } = notificationLocation;
        const isSelectedNotificationLocation = notificationLocation.numeroNotificationLocation === selectedNotificationLocation?.numeroNotificationLocation;

        const markerSize = isSelectedNotificationLocation ? 36 : 20;

        const firstNotification = notificationLocation.notifications[0];
        if (!firstNotification) return null;

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

    useEffect(() => {
        setHeatMapPoints(props.notificationLocations.map((notificationLocation: NotificationLocation) => {
            return [
                notificationLocation.latitude,
                notificationLocation.longitude,
                notificationLocation.notifications.length
            ];
        }));
    }, [props.notificationLocations]);

    useEffect(() => {
        layerControlInputs.forEach(input => {
            input.nextElementSibling && input.nextElementSibling.textContent?.trim() === "notifications" ? input.click() : null;
        });
    }, [props.mapLayerFilter.notifications]);

    useEffect(() => {
        layerControlInputs.forEach(input => {
            input.nextElementSibling && input.nextElementSibling.textContent?.trim() === "heatmap" ? input.click() : null;
        });
    }, [props.mapLayerFilter.heatmap]);

    return (
        <MapContainer center={[centerLatitude, centerLongitude]} zoom={14} zoomControl={false} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <LayersControl position={"topleft"}>
                <LayersControl.Overlay name={"notifications"} checked={true}>
                    <LayerGroup>
                        {props.notificationLocations.map((notificationLocation, index) => {
                            return getNotificationLocationMarker(index, notificationLocation, props.notificationLocation)
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name={"heatmap"} checked={false}>
                    <HeatmapLayer
                        points={heatMapPoints}
                        latitudeExtractor={m => m[0]}
                        longitudeExtractor={m => m[1]}
                        intensityExtractor={m => m[2] + ((m[2] - 1) * 0.1)}
                    />
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
}

export default Map;
