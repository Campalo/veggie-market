import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Theme, density } from './theme';

const input = (theme: Theme) => StyleSheet.create({
  textInput: {
    fontSize: 2 * density,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    margin: density,
    padding: density,
  },
});

export function useInput() {
  const theme = useTheme() as Theme;
  return input(theme);
}