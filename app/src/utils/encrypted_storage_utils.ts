import EncryptedStorage from 'react-native-encrypted-storage';

export const storeKey = async (key: string, valueObj: Object) => {
    await EncryptedStorage.setItem(
        key,
        JSON.stringify(valueObj),
    );
};

export const getKey = async (key: string) => {
    const value = await EncryptedStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
};
