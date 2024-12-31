import { Dimensions, StyleSheet } from 'react-native';
import { alignment } from '../../utils/alignment';
import colors from '../../utils/colors';
import { moderateScale, scale, verticalScale } from '../../utils/scaling';
import { textStyles } from '../../utils/textStyles';
const { height } = Dimensions.get('window');

const useStyle = () => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    width100: { width: '100%' },
    bgColor: {
      backgroundColor: colors.themeBackground,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: colors.themeBackground,
    },
    mt15: {
      marginTop: verticalScale(15),
    },
    container: {
      marginTop: 100,
      flexGrow: 1,
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: verticalScale(30),
    },
    lower_form: {
      alignItems: 'center',
      ...alignment.MTlarge,
    },
    RContainer: {
      width: '100%',
      height: height * 0.06,
      backgroundColor: colors.buttonBackgroundPink,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScale(10),
    },
    textContainer: {
      borderRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingLeft: 18,
      backgroundColor: colors.lightBackground,
      alignItems: 'center',
      overflow: 'hidden',
    },
    labelStyle: {
      ...textStyles.Medium,
      paddingLeft: 0,
      paddingTop: scale(1),
    },
    loginBtn: {
      width: '100%',
      borderRadius: moderateScale(18),
      height: height * 0.06,
      backgroundColor: colors.buttonBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export default useStyle;
