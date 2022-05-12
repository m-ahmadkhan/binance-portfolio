import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const BinanceSetup = () => {
    const [apiKey, setApiKey] = React.useState('');
    const [apiSecret, setApiSecret] = React.useState('');

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
                    onChangeText={setApiKey}
                    value={apiKey}
                    multiline
                    numberOfLines={4}
                    placeholder="API Key"
                />

                <Text style={{ fontSize: 12, textTransform: 'uppercase', marginTop: 16 }}>API Secret</Text>
                <TextInput
                    style={{ borderWidth: 1, marginTop: 8, paddingHorizontal: 8 }}
                    onChangeText={setApiSecret}
                    value={apiSecret}
                    multiline
                    numberOfLines={4}
                    placeholder="API Secret"
                />

                <View style={{ marginTop: 16 }}>
                    <Button title='Update Connection'></Button>
                </View>
            </View>
        </View>
    );
};

export default BinanceSetup;