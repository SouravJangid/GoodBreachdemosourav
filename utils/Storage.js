import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async (key) => {
  const val = await AsyncStorage.getItem(key);
  return val ? JSON.parse(val) : null;
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
