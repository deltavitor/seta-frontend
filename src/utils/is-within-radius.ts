function isWithinRadius(point: [number, number], centralPoint: [number, number], radius: number) {

    // Earth radius in Km
    const earthRadius = 6371;
    const degreesToRadians = (n: number) => {
        return n * (Math.PI / 180);
    };

    const distanceLatitude = degreesToRadians(point[0] - centralPoint[0]);
    const distanceLongitude = degreesToRadians(point[1] - centralPoint[1]);

    const a = Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
        Math.cos(degreesToRadians(centralPoint[0])) * Math.cos(degreesToRadians(point[0])) * Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const d = earthRadius * c;

    return d <= radius;
}

export default isWithinRadius;
