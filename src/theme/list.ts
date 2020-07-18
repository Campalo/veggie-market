import { StyleSheet } from "react-native";
import { useTheme, Theme } from '@react-navigation/native';

const list = (colors: Theme['colors']) => StyleSheet.create({
  list: {
    backgroundColor: colors.card,
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
  },
  itemTitle: {
    display: 'flex',
    fontWeight: '300',
    fontSize: 24,
    color: colors.text
  },
  itemSubtitle: {
    display: 'flex',
    fontWeight: '100',
    fontSize: 20,
    color: colors.text
  }
});

export function useList() {
  const { colors } = useTheme();
  return list(colors);
}