import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const USER_KEY = '@USER_KEY';
const ACCESS_TOKEN = '@ACCESS_TOKEN';
const FIREBASE_TOKEN = 'FIREBASE_TOKEN';
var Database = {};

export const getAccessToken = async () => {
  let accessToken = null;
  try {
    accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  } catch (err) {
    console.log('getAccessToken: ', err);
  }
  return accessToken;
};

export const setAccessToken = async ({ value }) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, value);
  } catch (error) {
    console.log('setAccessToken: ', error);
  }
};

setAccessToken.propTypes = {
  value: PropTypes.string.isRequired,
};

export const getUserLogin = async () => {
  let user = null;
  try {
    user = await AsyncStorage.getItem(USER_KEY);
  } catch (error) {
    console.log('getUserLogin: ', error);
  }
  return JSON.parse(user);
};

export const setUserLogin = async ({ value }) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (error) {
    console.log('setUserLogin: ', error);
  }
};

setUserLogin.propTypes = {
  value: PropTypes.string.isRequired,
};

export const removeUserLogin = async () => {
  await AsyncStorage.multiRemove([USER_KEY, ACCESS_TOKEN]);
};

export const getFirebaseToken = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem(FIREBASE_TOKEN);
  } catch (err) {
    console.log('getFirebaseToken: ', err);
  }
  return token;
};

export const setFirebaseToken = async ({ value }) => {
  try {
    await AsyncStorage.setItem(FIREBASE_TOKEN, value);
  } catch (error) {
    console.log('setFirebaseToken: ', error);
  }
};

setFirebaseToken.propTypes = {
  value: PropTypes.string.isRequired,
};

Database.getAccessToken = getAccessToken;
Database.setAccessToken = setAccessToken;
Database.getUserLogin = getUserLogin;
Database.setUserLogin = setUserLogin;
Database.removeUserLogin = removeUserLogin;
Database.getFirebaseToken = getFirebaseToken;
Database.setFirebaseToken = setFirebaseToken;

export default Database;
