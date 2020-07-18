import { Theme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native-appearance';
import { createContext, useContext } from 'react';

export const dark: Theme = {
  dark: true,
  colors: {
    primary: '#4FF887',
    background: '#1D313F',
    text: '#FFFFFF',
    card: '#234051',
    border: '#000000',
    notification: '#234051' // Same as card for now
  }
};

export const light: Theme = {
  dark: false,
  colors: {
    primary: '#97BF16',
    background: '#EEEFF4',
    text: '#2D2D2D',
    card: '#FBFBFB',
    border: '#000000',
    notification: '#FBFBFB' // Same as card for now
  }
};

export const getTheme = (scheme: ColorSchemeName) => scheme === 'dark' ? dark : light;

export const ThemeContext = createContext<any>(undefined);

export function useToggleMode() {
  const [mode, setMode] = useContext(ThemeContext);
  return mode === 'dark'
    ? () => setMode('light')
    : () => setMode('dark');
}