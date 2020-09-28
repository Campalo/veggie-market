import React, {FunctionComponent} from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Theme } from '../theme/theme';

export const Separator: FunctionComponent = () => {
  const theme = useTheme() as Theme;
  return <View
    style={{ marginTop: 8, marginBottom: 20, borderColor: theme.colors.secondary, borderWidth: 1}}
    />
}