import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { ToggleTheme } from '../App'; //TODO fix circular dep
import { useContext, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';

const TopAppbar = ({ title, isHome, right, elevated }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { toggleTheme } = useContext(ToggleTheme);

  const bg = elevated ? theme.colors.surface3 : theme.colors.background;

  return (
    <>
      <StatusBar backgroundColor={bg} style={theme.dark ? 'light' : 'dark'} />

      <Appbar.Header style={{ backgroundColor: bg }}>
        {!isHome && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        <Appbar.Content title={title} />
        {/* <Appbar.Action icon='calendar' onPress={() => {}}/> */}
        {right}
        <Appbar.Action
          icon={theme.dark ? 'white-balance-sunny' : 'weather-night'}
          onPress={toggleTheme}
        />
      </Appbar.Header>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default TopAppbar;
