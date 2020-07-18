import { createContext, useContext } from "react";

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

export interface ThemeColor {
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



export type ThemeMode = keyof typeof themeColor;


export const ThemeContext = createContext<[ThemeMode, (mode: ThemeMode) => void]>(['light', (mode) => mode]);

export function useMode() {
  return useContext(ThemeContext);
}

export function toggleMode() {
  const [mode, setMode] = useContext(ThemeContext);
  mode === 'light' ? setMode('dark') : setMode('light');
}

export function useTheme<T>(
  getTheme: (colors: ThemeColor) => T,
  forceMode?: ThemeMode
): T {
  if (forceMode) {
    return getTheme(themeColor[forceMode])
  } else {
    const [mode] = useContext(ThemeContext);
    return getTheme(themeColor[mode]);
  }
}

