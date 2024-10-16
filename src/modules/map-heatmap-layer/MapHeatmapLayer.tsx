import { LayersControl } from "react-leaflet";
import React, { useEffect, useState } from "react";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import type { NotificationLocation } from "../../types";

type HeatmapLayerProps = {
    checked?: boolean;
    notificationLocations?: Array<NotificationLocation>
};

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

function MapHeatmapLayer(props: HeatmapLayerProps) {

    const [heatMapPoints, setHeatMapPoints] = useState<Array<[number, number, number]>>([]);

    useEffect(() => {
        if (!props.notificationLocations) return
        setHeatMapPoints(props.notificationLocations.map((notificationLocation: NotificationLocation) => {
            return [
                notificationLocation.latitude,
                notificationLocation.longitude,
                notificationLocation.notifications.length
            ];
        }));
    }, [props.notificationLocations]);

    return (
        <LayersControl.Overlay name={"heatmap"} checked={false}>
            <HeatmapLayer
                points={heatMapPoints}
                latitudeExtractor={m => m[0]}
                longitudeExtractor={m => m[1]}
                intensityExtractor={m => m[2] + ((m[2] - 1) * 0.1)}
            />
        </LayersControl.Overlay>
    );
}

export default MapHeatmapLayer;
