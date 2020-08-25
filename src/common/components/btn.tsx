import React, { FunctionComponent } from "react";
import { useButton } from "../theme/button";
import { Text } from "react-native";

interface BtnProps {
  onPress: (...event: any[]) => void;
  ariaLabel?: string;
}

export const Btn: FunctionComponent<BtnProps> = ({ children, onPress, ariaLabel }) => {
  const { button } = useButton();
  const text = typeof children === 'string' ? children : 'Press';
  return <Text style={button} accessibilityLabel={ariaLabel} onPress={onPress}>{text}</Text>
}