import React from "react";
import { View } from "react-native";
import { Btn} from "../../../common/components/btn";
import { useToggleMode } from '../../../common/theme/theme';
import { useButton } from '../../../common/theme/button';
import { useTranslation } from 'react-i18next';



const ProfileScreen = () => {
  const toggleMode = useToggleMode();
  const { buttonWithMarginTop } = useButton();
  const { t } = useTranslation();

  return  (
    <View style={buttonWithMarginTop}>
        <Btn onPress={toggleMode}>{t("changeTheme")}</Btn>
    </View>
   )
}

export default ProfileScreen;
