import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlashMessage, TextDefault, WrapperView } from '../../components';
import {
  LATITUDE,
  LATITUDE_DELTA,
  LONGITUDE,
  LONGITUDE_DELTA,
  NAVIGATION_SCREEN,
} from '../../utils/constant';
import useStyle from './styles';
import { hasLocationPermission } from '../../services/Location';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '../../configs/environment';
import i18n from '../../configs/i18n';

export default function MapDirection() {
  const route = useRoute();
  const styles = useStyle();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [mapMargin, setMapMargin] = useState(1);
  const [origin, setOrigin] = useState({
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitude: LONGITUDE,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [destination, setDestination] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('map'),
      headerRight: null,
    });
  }, [navigation]);

  useEffect(() => {
    _getLocationAsync();
  }, []);

  async function _getLocationAsync() {
    const status = await hasLocationPermission();
    if (status) {
      Geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: parseFloat(position.coords.latitude),
            latitudeDelta: LATITUDE_DELTA,
            longitude: parseFloat(position.coords.longitude),
            longitudeDelta: LONGITUDE_DELTA,
          };
          setOrigin(locationData);
        },
        (error) => {
          FlashMessage({
            message: 'Quyền vị trí không được cấp',
          });
          setOrigin({
            latitude: LATITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitude: LONGITUDE,
            longitudeDelta: LONGITUDE_DELTA,
          });
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    } else {
      FlashMessage({
        message: 'Quyền vị trí không được cấp',
      });
    }
  }

  console.log('region: ', origin);
  console.log('destination: ', destination);

  return (
    <WrapperView>
      <View style={styles.flex}>
        <View style={[styles.flex, { backgroundColor: colors.background }]}>
          <MapView
            style={[styles.container, { marginTop: mapMargin }]}
            initialRegion={origin}
            region={origin}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton
            onMapReady={() => setMapMargin(0)}
            showsTraffic={false}
            rotateEnabled={false}>
            {destination && <Marker coordinate={destination} />}
            {destination && origin && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                strokeWidth={6}
                strokeColor="#0f53ff"
                timePrecision="now"
                apikey={GOOGLE_API_KEY}
              />
            )}
          </MapView>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => {
              route.params.onFinishOrder();
              navigation.goBack();
            }}>
            <TextDefault textColor={colors.white} H4 bold>
              {i18n.t('done')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperView>
  );
}
