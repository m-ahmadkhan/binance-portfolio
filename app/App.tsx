import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from 'screens/Main';
import BinanceSetup from 'screens/BinanceSetup';

const Stack = createNativeStackNavigator();

const Pages = [
  {
    route: 'Home',
    title: 'Portfolio',
    component: Main,
  },
  {
    route: 'APIKeySetup',
    title: 'Add Binance Connection',
    component: BinanceSetup,
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {Pages.map(({ route, title, component }) => (
          <Stack.Screen key={route} name={route} component={component} options={{ title: title }} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
