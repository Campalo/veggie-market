import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Theme, density } from './theme';

export const typography = (theme: Theme) => StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    display: 'flex',
    fontWeight: '300',
    fontSize: 24,
    color: theme.colors.text
  },
  subtitle: {
    display: 'flex',
    fontWeight: '100',
    fontSize: 20,
    color: theme.colors.text
  },
  text: {
    fontWeight: 'normal',
    fontSize: 16,
    color: theme.colors.text
  },
  label: {
    fontWeight: 'normal',
    fontSize: 16,
    color: theme.colors.text,
    margin: density,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  }
});

export type Typography = ReturnType<typeof typography>;
export function useTypography() {
  const theme = useTheme() as Theme;
  return typography(theme);
}