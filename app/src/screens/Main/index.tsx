import React from 'react';
import { Text, View, Button } from 'react-native';

import Routes from '../../constants/routes';
import { getKey } from '../../utils/encryptedStorageUtils';
import { EncryptedStorageKeys } from '../../constants'

const NoConnection = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{marginBottom: 8}}>Looks like you haven't added any connection yet!</Text>
        <Button
            title="Add Binance Connection"
            onPress={() => navigation.navigate(Routes.APIKeySetup)}
        />
    </View>
);

const Main = ({ navigation }) => {
    const [apiKey, setApiKey] = React.useState('');
    const [apiSecret, setApiSecret] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        getKey(
            EncryptedStorageKeys.BINANCE_API_KEY_OBJECT
        ).then((binanceApiKey?: any | null) => {
            if (binanceApiKey) {
                setApiKey(binanceApiKey[EncryptedStorageKeys.BINANCE_API_KEY]);
                setApiSecret(binanceApiKey[EncryptedStorageKeys.BINANCE_API_SECRET]);
            }
        }).catch(() => {}).finally(() => {
            setLoaded(true);
        });
    }, []);

    if (!loaded) return null;
    if (apiKey && apiSecret) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginBottom: 8}}>Found API Key.</Text>
                <Button
                    title="Update Connection"
                    onPress={() => navigation.navigate(Routes.APIKeySetup)}
                />
            </View>
        );
    }
    return <NoConnection navigation={navigation} />;
};

export default Main;
