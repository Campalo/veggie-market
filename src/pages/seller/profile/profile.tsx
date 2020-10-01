import React from "react";
import { View, Text } from "react-native";
import { Btn} from "../../../common/components/btn";
import { useToggleMode } from '../../../common/theme/theme';
import { useButton } from '../../../common/theme/button';
import { useTranslation } from 'react-i18next';
import * as firebase from 'firebase';
import { Separator } from "../../../common/components/separator";
import { useDocument } from "../../../firestore";

interface Seller {
  id: string,
  displayName: string,
  uid: string,
  photoURL : string,
  email: string,
}

const ProfileScreen = () => {
  const toggleMode = useToggleMode();
  const { buttonWithMarginTop } = useButton();
  const { t } = useTranslation();
  const user = firebase.auth().currentUser;


  if (user) {
    const createSeller = () => {
        const {uid, email, photoURL, displayName} = user;
        firebase.firestore().collection("sellers").doc(uid).set({uid, email, photoURL, displayName});
      }
    const seller = useDocument<Seller>("sellers", user.uid)

    return  (
      <View style={[buttonWithMarginTop, {flex: 1, alignItems: "stretch"}]}>
        {!!seller ?
          <Text>I'm a seller</Text>
        :
          <Btn onPress={createSeller}>{t("buyer.profile.becomeSeller")}</Btn>
        }
          <Separator />
          <Btn onPress={toggleMode}>{t("changeTheme")}</Btn>
      </View>
     )
  } else {
    <Text>Please login or create an account</Text>
  }


}

export default ProfileScreen;
