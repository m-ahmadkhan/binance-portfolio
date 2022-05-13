import EncryptedStorage from 'react-native-encrypted-storage';

export const storeKey = async (key: string, valueObj: Object) => {
    try {
        await EncryptedStorage.setItem(
            key,
            JSON.stringify(valueObj),
        );
    } catch (error) {
        // There was an error on the native side
    }
};

export const getKey = async (key: string) => {
    try {   
        const value = await EncryptedStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        // There was an error on the native side
    }
}
