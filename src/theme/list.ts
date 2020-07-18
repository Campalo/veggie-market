import { StyleSheet } from "react-native";
import { useTheme, Theme } from '@react-navigation/native';

const list = (colors: Theme['colors']) => StyleSheet.create({
  list: {
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    borderRadius: 4,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
  },
  itemAvatar: {
    height: 40,
    width: 40,
    marginRight: 16,
    borderRadius: 50
  },
  itemTitle: {
    fontWeight: '300',
    fontSize: 16,
    color: colors.text
  },
  itemSubtitle: {
    fontWeight: '100',
    fontSize: 12,
    color: colors.text
  }
});

export function useList() {
  const { colors } = useTheme();
  return list(colors);
}