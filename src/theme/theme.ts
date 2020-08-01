import { Theme as NavigationTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native-appearance';
import { createContext, useContext } from 'react';

export const density = 8;
export const radius = density * 0.5;

export interface Theme {
  dark: boolean;
  colors: NavigationTheme['colors'] & {
    /** Contrast color to apply on a primary background */
    primaryContrast: string;
    /** Secondary color */
    secondary: string;
    /** Contrast color to apply on a secondary background */
    secondaryContrast: string;
  }
}

export const dark: Theme = {
  dark: true,
  colors: {
    primary: '#59BD48',
    primaryContrast: '#FFFFFF',
    secondary: '#7B2968',
    secondaryContrast: '#FFFFFF',
    background: '#1D313F',
    text: '#FFFFFF',
    card: '#234051',
    border: '#050505',
    notification: '#234051' // Same as card for now
  }
};

export const light: Theme = {
  dark: false,
  colors: {
    primary: '#45F1A7',
    primaryContrast: '#FFFFFF',
    secondary: '#7B2968',
    secondaryContrast: '#FFFFFF',
    background: '#EEEFF4',
    text: '#2D2D2D',
    card: '#FBFBFB',
    border: '#E5E5E5',
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
