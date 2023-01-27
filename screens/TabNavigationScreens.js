import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Quotes from './Quotes';
import History from './History';
import Ranks from './Ranks';

const Tab = createMaterialBottomTabNavigator();

const icons = {
  Home: 'home',
  Quotes: 'text',
  History: 'history',
  Ranks: 'progress-star',
};

const TabNavigationScreens = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor={theme.colors.onSecondaryContainer}
      inactiveColor={theme.colors.onSurfaceVariant}
      screenOptions={({ route }) => ({
        tabBarIcon({ focused, color }) {
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={26}
            />
          );
        },

        headerShown: false,
      })}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='History' component={History} />
      <Tab.Screen name='Quotes' component={Quotes} />
      <Tab.Screen name='Ranks' component={Ranks} />
    </Tab.Navigator>
  );
};

export default TabNavigationScreens;
