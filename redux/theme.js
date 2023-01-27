import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { defaultThemeColors, darkThemeColors } from '../constants';
import { createSlice } from '@reduxjs/toolkit';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const light = {
  ...CombinedDefaultTheme,
  colors: {
    ...defaultThemeColors.colors,
    surface1: '#EEF5F4',
    surface2: '#E7F0EF',
    surface3: '#DFECEB',
    surface4: '#DDEAEA',
    surface5: '#D8E8E7',
  }
};


const dark = {
  ...CombinedDarkTheme,
  colors: {
    ...darkThemeColors.colors,
    surface1: '#1E2525',
    surface2: '#202B2B',
    surface3: '#233030',
    surface4: '#243232',
    surface5: '#263636',
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: light,
  reducers: {
    toggleTheme(state) {
      return state.dark ? light : dark;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
