import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import { getKey, storeKey } from 'utils/encryptedStorageUtils';
import StatusControl from 'components/StatusControl';
import { EncryptedStorageKeys, Status, InitialStatus } from 'constants/index';

const BinanceSetup = () => {
  const [apiKey, setApiKey] = React.useState('');
  const [apiSecret, setApiSecret] = React.useState('');
  const [statusData, setStatusData] = React.useState(InitialStatus);

  React.useEffect(() => {
    setStatusData({ status: Status.MESSAGE, message: 'Loading configuration...' });

    getKey(EncryptedStorageKeys.BINANCE_API_KEY_OBJECT)
      .then((binanceApiKey?: any | null) => {
        if (binanceApiKey) {
          setApiKey(binanceApiKey[EncryptedStorageKeys.BINANCE_API_KEY]);
          setApiSecret(binanceApiKey[EncryptedStorageKeys.BINANCE_API_SECRET]);
        }
        setStatusData(InitialStatus);
      })
      .catch(() => {
        setStatusData({
          status: Status.ERROR,
          message: 'Some error occurred while fetching the connection info.',
        });
      });
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 48, marginTop: 40 }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Please create an API Key from Binance, and provide here.
        </Text>
        <Text style={{ fontSize: 14, marginTop: 8 }}>
          Important! Make sure to only select the read permission. We don't accept API keys that
          exceed this permission.
        </Text>
      </View>

      <View style={{ marginVertical: 40 }}>
        <StatusControl statusData={statusData} styles={{ marginBottom: 8, textAlign: 'center' }} />
        <Text style={{ fontSize: 12, textTransform: 'uppercase' }}>API Key</Text>
        <TextInput
          value={apiKey}
          placeholder='API Key'
          style={{ borderWidth: 1, marginTop: 8, paddingHorizontal: 8, height: 56 }}
          onChangeText={(value) => {
            setStatusData(InitialStatus);
            setApiKey(value);
          }}
        />

        <Text style={{ fontSize: 12, textTransform: 'uppercase', marginTop: 16 }}>API Secret</Text>
        <TextInput
          secureTextEntry
          placeholder='API Secret'
          value={apiSecret}
          style={{ borderWidth: 1, marginTop: 8, paddingHorizontal: 8, height: 56 }}
          onChangeText={(value) => {
            setStatusData(InitialStatus);
            setApiSecret(value);
          }}
        />

        <View style={{ marginTop: 16 }}>
          <Button
            title='Update Connection'
            onPress={() => {
              if (!apiKey)
                setStatusData({ status: Status.ERROR, message: 'Please provide the API Key.' });
              else if (!apiSecret)
                setStatusData({ status: Status.ERROR, message: 'Please provide the API Secret.' });
              else {
                storeKey(EncryptedStorageKeys.BINANCE_API_KEY_OBJECT, {
                  [EncryptedStorageKeys.BINANCE_API_KEY]: apiKey,
                  [EncryptedStorageKeys.BINANCE_API_SECRET]: apiSecret,
                })
                  .then(() => {
                    setStatusData({
                      status: Status.SUCCESS,
                      message: 'Connection updated successfully.',
                    });
                  })
                  .catch(() => {
                    setStatusData({
                      status: Status.ERROR,
                      message:
                        'Some error occurred while updating the connection. Please try again later.',
                    });
                  });
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BinanceSetup;
