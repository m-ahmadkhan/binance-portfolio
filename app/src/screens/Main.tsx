import { StyleSheet, Text, View, Button } from 'react-native';
import Routes from '../constants/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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