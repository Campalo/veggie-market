import { StyleSheet } from "react-native";
import { useTheme, Theme } from '@react-navigation/native';

export const typography = (colors: Theme['colors']) => StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    display: 'flex',
    fontWeight: '300',
    fontSize: 24,
    color: colors.text
  },
  subtitle: {
    display: 'flex',
    fontWeight: '100',
    fontSize: 20,
    color: colors.text
  },
  text: {
    fontWeight: 'normal',
    fontSize: 16,
    color: colors.text
  },
  primary: {
    backgroundColor: colors.primary,
  }
});

export type Typography = ReturnType<typeof typography>;
export function useTypography() {
  const { colors } = useTheme();
  return typography(colors);
}