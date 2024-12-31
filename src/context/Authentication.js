import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Database from '../configs/Database';
import {
  onRevoke,
  onUserLogin,
  onUserLogout,
} from '../redux/actions/authAction';
import {
  onAddDeviceId,
  onAddFirebaseToken,
} from '../redux/actions/configAction';
import { signIn, signOut } from '../api/Auth/Auth';
import { FlashMessage } from '../components';
import { getDevice, getDeviceId } from 'react-native-device-info';
import { getFirebaseToken } from '../services/Notification';

const AuthenticationContext = React.createContext({});

export const AuthenticationProvider = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let deviceId = getDeviceId();
      let accessTokenDB = null;
      let userDB = null;

      try {
        accessTokenDB = await Database.getAccessToken();
        userDB = await Database.getUserLogin();
      } catch (error) {
        console.log('getAccessToken: ', error);
      }

      getDevice().then((deviceInfo) => {
        dispatch(onAddDeviceId(deviceId, deviceInfo));
      });

      if (accessTokenDB && userDB) {
        dispatch(onRevoke(userDB, accessTokenDB));
      }
    };
    bootstrapAsync();
    checkFirebaseToken();
  }, []);

  const checkFirebaseToken = async () => {
    var token = await Database.getFirebaseToken();
    console.log(token);
    if (token === undefined || token === '' || token === null) {
      await getFirebaseToken().then((res) => {
        console.log(res);
        token = res;
      });
      await Database.setFirebaseToken({ value: token });
    }
    dispatch(onAddFirebaseToken(token));
  };

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        await signIn(data).then(
          async (res) => {
            await Database.setAccessToken({
              value: res.access_token,
            });
            await Database.setUserLogin({ value: res });
            dispatch(onUserLogin(res, res.access_token));
          },
          async (err) => {
            console.log(err);
            FlashMessage({
              message: err,
            });
          },
        );
      },
      signOut: async (currentAccessToken) => {
        await signOut({ accessToken: currentAccessToken }).then(async (res) => {
          await Database.removeUserLogin();
          dispatch(onUserLogout());
        });
      },
    }),
    [],
  );

  return (
    <AuthenticationContext.Provider value={authContext}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.node,
};
export const AuthenticationConsumer = AuthenticationContext.Consumer;
export default AuthenticationContext;
