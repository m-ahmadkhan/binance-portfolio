import React from 'react';
import { Text, View, Button } from 'react-native';
import Routes from '../constants/routes';

const Main = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{marginBottom: 8}}>Looks like you haven't configured your API Key yet!</Text>
      <Button
        title="Binance API Key Setup"
        onPress={() => navigation.navigate(Routes.APIKeySetup)}
      />
    </View>
  );
}

export default Main;