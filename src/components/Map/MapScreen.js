import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

const MapScreen = () => {
    const [routeCoords, setRouteCoords] = useState([]);
    const API_KEY = '81adc6e5951b287e550cb6252f8aa7b6b2341630c7f31e45'; // Thay bằng API key của bạn

    useEffect(() => {
        // Gọi Vietmap Route API
        const fetchRoute = async () => {
            try {
                const response = await fetch(
                    `https://maps.vietmap.vn/api/route?api-version=1.1&apikey=${API_KEY}&point=21.052054,105.7468539&point=21.029942,105.7825111&vehicle=car`
                );
                const data = await response.json();

                if (data.paths && data.paths[0].points_encoded) {
                    // Giải mã polyline trả về từ API Vietmap
                    const decodedPoints = decodePolyline(data.paths[0].points);
                    setRouteCoords(decodedPoints);
                }
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        fetchRoute();
    }, []);

    // Hàm giải mã polyline (định dạng Google Polyline)
    const decodePolyline = (encoded) => {
        const points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }

        return points;
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 21.040998, // Trung tâm giữa hai điểm
                    longitude: 105.764682,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                provider="google" // Chỉ định dùng Google Maps SDK
                showsMyLocationButton
                showsTraffic={false}
                rotateEnabled={false}
                mapType="standard"
                showsCompass={true}
                showsUserLocation={true}
                followsUserLocation={true}
                zoomTapEnabled={true}
                zoomEnabled={true}
                loadingEnabled={true}
            >
                {/* Vẽ đường Polyline */}
                {routeCoords.length > 0 && (
                    <Polyline
                        coordinates={routeCoords}
                        strokeColor="blue"
                        strokeWidth={4}
                    />
                )}

                {/* Marker điểm bắt đầu */}
                <Marker
                    coordinate={{ latitude: 21.052054, longitude: 105.7468539 }}
                    title="Điểm bắt đầu"
                    description="21.052054, 105.7468539"
                />

                {/* Marker điểm kết thúc */}
                <Marker
                    coordinate={{ latitude: 21.029942, longitude: 105.7825111 }}
                    title="Điểm đến"
                    description="21.029942, 105.7825111"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
