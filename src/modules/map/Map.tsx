import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { NotificationLocation } from "../../types";

type MapProps = {
    notificationLocations: Array<NotificationLocation>
};

function Map(props: MapProps) {

    const { notificationLocations } = props;
    const centerLatitude = notificationLocations[0]?.latitude;
    const centerLongitude = notificationLocations[0]?.longitude;

    return (
        <MapContainer center={[centerLatitude, centerLongitude]} zoom={15} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {notificationLocations.map((notification, index) => (
                <Marker
                    key={index}
                    position={[notification.latitude, notification.longitude]}
                >
                    <Popup>
                        {notification.latitude},{notification.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Map;
