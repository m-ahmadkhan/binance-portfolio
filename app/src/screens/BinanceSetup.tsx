import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

const BinanceSetup = () => {
    const [apiKey, setApiKey] = React.useState('');
    const [apiSecret, setApiSecret] = React.useState('');
    const [error, setError] = React.useState('');

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
                        setError('');
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
                        setError('');
                        setApiSecret(value);
                    }}
                    value={apiSecret}
                    multiline
                    numberOfLines={4}
                    placeholder="API Secret"
                />

                <View style={{ marginTop: 16 }}>
                    {!!error && <Text style={{ color: 'red', marginBottom: 8, fontSize: 12 }}>{error}</Text>}
                    <Button
                        title='Update Connection'
                        onPress={() => {
                            if (!apiKey) setError('Please provide the API Key.')
                            else if (!apiSecret) setError('Please provide the API Secret.')
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default BinanceSetup;