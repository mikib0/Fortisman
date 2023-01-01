import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Quotes, History, Ranks, Reason } from './screens';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';

import configureStorage from './redux/configureStorage';

const { store, persistor } = configureStorage();
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Quotes' component={Quotes} />
                <Stack.Screen name='History' component={History} />
                <Stack.Screen name='Ranks' component={Ranks} />
                <Stack.Screen name='Reason' component={Reason} />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
