import { useTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { density, radius } from './theme';

const button = (colors: Theme['colors']) => StyleSheet.create({
  button: {
    paddingTop: density,
    paddingBottom: density,
    paddingLeft: 2 * density,
    paddingRight: 2 * density,
    backgroundColor: colors.primary,
    color: colors.text,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonIcon: {

  },
});

export function useButton() {
  const { colors } = useTheme();
  return button(colors);
}