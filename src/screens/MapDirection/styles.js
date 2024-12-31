import colors from '../../utils/colors';
import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/scaling';

const useStyle = () => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      height: '100%',
    },
    button: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(10),
      bottom: 0,
      height: '8%',
      width: '100%',
      backgroundColor: colors.orange,
    },
    markerFixed: {
      position: 'absolute',
      transform: [{ translateX: -18 }, { translateY: -60 }],
      left: '50%',
      top: '50%',
    },
  });
};
export default useStyle;
