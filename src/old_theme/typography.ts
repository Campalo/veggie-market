import { useTheme, ThemeColor, darken, lighten } from "./theme";
import { StyleSheet } from "react-native";

const typography = (colors: ThemeColor) => StyleSheet.create({
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

export type Typography = ReturnType<typeof typography>;
export const useTypography = useTheme.bind(this, typography);