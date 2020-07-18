import { StyleSheet } from "react-native";
import { createContext, useContext, useState } from "react";


function brightness(color: string, amount: number) {
  
  let usePound = false;

  if (color[0] == "#") {
      color = color.slice(1);
      usePound = true;
  }

  const num = parseInt(color,16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amount;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

export const darken = (color: string) => brightness(color, -20);
export const lighten = (color: string) => brightness(color, 20);

interface ThemeColor {
  primary: string,
  secondary: string,
  background: string,
  foreground: string,
  surface: string,
}

export const light: ThemeColor = {
  primary: '#97BF16',
  secondary: '#F7F7F5',
  background: '#EEEFF4',
  foreground: '#2D2D2D',
  surface: '#FBFBFB',
};

export const dark: ThemeColor = {
  primary: '#4FF887',
  secondary: '#455C6A',
  background: '#1D313F',
  foreground: '#FFFFFF',
  surface: '#234051',
}

const themeColor = { light, dark };

const dynamicTheme = (colors: ThemeColor) => StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    display: 'flex',
    fontWeight: '300',
    fontSize: 24,
    color: darken(colors.foreground)
  },
  subtitle: {
    display: 'flex',
    fontWeight: '100',
    fontSize: 20,
    color: lighten(colors.foreground)
  },
  text: {
    fontWeight: 'normal',
    fontSize: 16,
    color: colors.foreground
  },
  primary: {
    backgroundColor: colors.primary,
  }
});

export type Theme = ReturnType<typeof dynamicTheme>;
export type ThemeMode = keyof typeof themeColor;


export const ThemeContext = createContext<[ThemeMode, (mode: ThemeMode) => void]>(['light', (mode) => mode]);

export function useTheme(forceMode?: ThemeMode): [Theme, () => void] {
  const [mode, setMode] = useContext(ThemeContext);
  const toggleMode = mode === 'light' ? () => setMode('dark') : () => setMode('light');
  return [
    dynamicTheme(themeColor[forceMode || mode]),
    toggleMode
  ];
}


