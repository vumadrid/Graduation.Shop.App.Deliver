import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../Spinner/Spinner';
import Order from '../Order/Order';
import useStyle from './styles';
import { scale } from '../../utils/scaling';
import { TextDefault } from '../Text';
import EmptyOrder from '../../assets/images/SVG/imageComponents/EmptyOrder';
import i18n from '../../configs/i18n';

export default function HistoryOrders({ data, loading, onRefresh }) {
  const styles = useStyle();
  const navigation = useNavigation();

  function emptyView() {
    if (loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <EmptyOrder width={scale(250)} height={scale(250)} />
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault bolder center H4>
            {i18n.t('noOrder')}
          </TextDefault>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      style={{ marginTop: 16 }}
      data={data.length > 0 ? data : []}
      refreshing={false}
      onRefresh={() => onRefresh()}
      ListEmptyComponent={emptyView}
      renderItem={({ item }) => (
        <Order
          key={item._id}
          orderCode={item.name}
          orderStatus={item.state}
          orderAmount={item.amount_total}
          orderDatetime={item.date_order}
          onPress={() => {
            navigation.navigate('OrderDetail', {
              id: item.id,
            });
          }}
        />
      )}
    />
  );
}
