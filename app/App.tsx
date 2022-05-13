import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './src/screens/Main';
import BinanceSetup from './src/screens/BinanceSetup';
import Routes from './src/constants/routes';

const Stack = createNativeStackNavigator();

const Pages = [
    {
        route: Routes.Home,
        title: 'Portfolio',
        component: Main,
    },
    {
        route: Routes.APIKeySetup,
        title: 'Add Binance Connection',
        component: BinanceSetup,
    },
];

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.Home}>
                {Pages.map(({route, title, component}) => (
                    <Stack.Screen key={route} name={route} component={component} options={{ title: title }} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;