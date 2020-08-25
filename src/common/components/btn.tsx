import React, { FunctionComponent } from "react";
import { useButton } from "../theme/button";
import { Text, StyleSheet } from "react-native";


interface BtnProps {
  onPress: (...event: any[]) => void;
  ariaLabel?: string;
  style?: object;
}

export const Btn: FunctionComponent<BtnProps> = ({ children, onPress, ariaLabel, style }) => {
  const { button } = useButton();
  const text = typeof children === 'string' ? children : 'Press';
  return <Text style={[button, style]} accessibilityLabel={ariaLabel} onPress={onPress}>{text}</Text>
}