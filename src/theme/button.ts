import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { density, radius, Theme } from './theme';

const button = (theme: Theme) => StyleSheet.create({
  button: {
    paddingTop: density,
    paddingBottom: density,
    paddingLeft: 2 * density,
    paddingRight: 2 * density,
    backgroundColor: theme.colors.primary,
    color: theme.colors.text,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonIcon: {

  },
});

export function useButton() {
  const theme = useTheme() as Theme;
  return button(theme);
}