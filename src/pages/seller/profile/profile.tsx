import React from "react";
import { View } from "react-native";
import { Btn} from "../../../common/components/btn";
import { useToggleMode } from '../../../common/theme/theme';
import { useButton } from '../../../common/theme/button';
import { useTranslation } from 'react-i18next';
import * as firebase from 'firebase';
import { Separator } from "../../../common/components/separator";



const ProfileScreen = () => {
  const toggleMode = useToggleMode();
  const { buttonWithMarginTop } = useButton();
  const { t } = useTranslation();

  const createSeller = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const {uid, email, photoURL, displayName} = user;
      firebase.firestore().collection("sellers").doc(uid).set({uid, email, photoURL, displayName});
    }
  }


  return  (
    <View style={[buttonWithMarginTop, {flex: 1, alignItems: "stretch"}]}>
        <Btn onPress={createSeller}>{t("buyer.profile.becomeSeller")}</Btn>
        <Separator />
        <Btn onPress={toggleMode}>{t("changeTheme")}</Btn>
    </View>
   )
}

export default ProfileScreen;
