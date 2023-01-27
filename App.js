import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigationScreens, Reason } from './screens';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createContext } from 'react';

import { useTheme } from './hooks';
import configureStorage from './redux/configureStorage';
import { toggleTheme } from './redux/actions';

import 'intl'; // to solve 'cant find variable Intl' error in react native paper dates
import 'intl/locale-data/jsonp/en'; // this line is also required; that's all i know.

const { store, persistor } = configureStorage();
const Stack = createNativeStackNavigator();

export const ToggleTheme = createContext();

const ThemedApp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <PaperProvider theme={theme}>
      <ToggleTheme.Provider value={{ toggleTheme: function(){ 
        dispatch(toggleTheme()) 
        } }}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName='TabNavigationScreens'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='TabNavigationScreens'
              component={TabNavigationScreens}
            />
            <Stack.Screen name='Reason' component={Reason} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToggleTheme.Provider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemedApp />
          </PersistGate>
        </ReduxProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
