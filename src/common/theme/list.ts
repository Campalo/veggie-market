import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Theme } from './theme';

const list = (theme: Theme) => StyleSheet.create({
  list: {
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    alignItems: 'center',
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
    color: theme.colors.text
  },
  itemSubtitle: {
    fontWeight: '100',
    fontSize: 12,
    color: theme.colors.text
  }
});

export function useList() {
  const theme = useTheme() as Theme;
  return list(theme);
}