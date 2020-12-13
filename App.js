/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Dashboard } from './src/screens';
import { Snackbar } from './src/components';

import store from './src/redux';

const Stack = createStackNavigator();
function App() {
    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffffff');
        }
    }, []);

    return (
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <PaperProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="login"
                            headerMode="none">
                            <Stack.Screen name="login" component={Login} />
                            <Stack.Screen
                                name="dashboard"
                                component={Dashboard}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Snackbar />
                </PaperProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    );
}

export default App;
