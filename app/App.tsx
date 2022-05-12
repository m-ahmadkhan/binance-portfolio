import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './src/screens/Main';
import BinanceSetup from './src/screens/BinanceSetup';
import Routes, { PageTitles } from './src/constants/routes';

const Stack = createNativeStackNavigator();



const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.Home}>
                <Stack.Screen name={Routes.Home} component={Main} options={{ title: PageTitles.Home }} />
                <Stack.Screen name={Routes.APIKeySetup} component={BinanceSetup} options={{ title: PageTitles.APIKeySetup }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;