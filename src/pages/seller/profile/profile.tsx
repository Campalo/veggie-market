import React from "react";
import { View, Text } from "react-native";
import { Btn} from "../../../common/components/btn";
import { useToggleMode } from '../../../common/theme/theme';
import { useButton } from '../../../common/theme/button';



const ProfileScreen = () => {
  const toggleMode = useToggleMode();
  const { buttonWithMarginTop } = useButton();

  return  (
    <View style={buttonWithMarginTop}>
        <Btn onPress={toggleMode}>Change Theme</Btn>
    </View>
   )
}

export default ProfileScreen;
