import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import { getKey, storeKey } from '../utils/encrypted_storage_utils';
import StatusControl from '../components/StatusControl';
import { Status, InitialStatus } from '../components/StatusControl/constants';
import { EncryptedStorageKeys } from '../constants'

const BinanceSetup = () => {
    const [apiKey, setApiKey] = React.useState('');
    const [apiSecret, setApiSecret] = React.useState('');
    const [statusData, setStatusData] = React.useState(InitialStatus);

    return (
        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 48 }}>
            <View>
                <Text style={{ fontSize: 16 }}>Please create an API Key from Binance, and provide here.</Text>
                <Text style={{ fontSize: 14, marginTop: 8 }}>
                    Important! Make sure to only select the read permission.
                    We don't accept API keys that exceed this permission.
                </Text>
            </View>

            <View style={{  marginVertical: 40 }}>
                <Text style={{ fontSize: 12, textTransform: 'uppercase' }}>API Key</Text>
                <TextInput
                    style={{ borderWidth: 1, marginTop: 8, paddingHorizontal: 8 }}
                    onChangeText={(value) => {
                        setStatusData(InitialStatus);
                        setApiKey(value);
                    }}
                    value={apiKey}
                    multiline
                    numberOfLines={4}
                    placeholder="API Key"
                />

                <Text style={{ fontSize: 12, textTransform: 'uppercase', marginTop: 16 }}>API Secret</Text>
                <TextInput
                    style={{ borderWidth: 1, marginTop: 8, paddingHorizontal: 8 }}
                    onChangeText={(value) => {
                        setStatusData(InitialStatus);
                        setApiSecret(value);
                    }}
                    value={apiSecret}
                    multiline
                    numberOfLines={4}
                    placeholder="API Secret"
                />

                <View style={{ marginTop: 16 }}>
                    <StatusControl statusData={statusData} styles={{ marginBottom: 8 }} />
                    <Button
                        title='Update Connection'
                        onPress={async () => {
                            if (!apiKey) setStatusData({status: Status.ERROR, message: 'Please provide the API Key.'});
                            else if (!apiSecret) setStatusData({status: Status.ERROR, message: 'Please provide the API Secret.'});
                            else {
                                await storeKey(EncryptedStorageKeys.BINANCE_API_KEY_OBJECT, {
                                    [EncryptedStorageKeys.BINANCE_API_KEY]: apiKey,
                                    [EncryptedStorageKeys.BINANCE_API_SECRET]: apiSecret,
                                });
                                setStatusData({status: Status.SUCCESS, message: 'Connection successfully updated.'});
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default BinanceSetup;