import React from "react";
import { View, Text } from "react-native";
import { Btn} from "../../../common/components/btn";
import { useToggleMode } from '../../../common/theme/theme';
import { useButton } from '../../../common/theme/button';
import { useTranslation } from 'react-i18next';
import * as firebase from 'firebase';
import { Separator } from "../../../common/components/separator";
import { useDocument } from "../../../firestore";
import { Input, Label, Form, ImgPicker, Submit } from "../../../common/components/forms";
interface Seller {
  id: string,
  uid: string,
  displayName: string,
  email: string,
  photoURL?: string,
  bio? : string
}

const ProfileScreen = () => {
  const toggleMode = useToggleMode();
  const { buttonWithMarginTop } = useButton();
  const { t } = useTranslation();
  const user = firebase.auth().currentUser;

  if (user) {
    const {uid, email, photoURL, displayName} = user;
    const createSeller = () => {
        firebase.firestore().collection("sellers").doc(uid).set({uid, email, photoURL, displayName});
      }
    const seller = useDocument<Seller>("sellers", uid)

    const updateSeller = (seller: Seller) => {
      for (const key in seller) {
        if (seller[key] === undefined) {
          delete seller[key]
        }
      }
      firebase.firestore().collection("sellers").doc(uid).update(seller);
    }

    const renderSellerProfile = () => {
      return (
        <Form defaultValues={seller} onSubmit={(value) => updateSeller(value)}>
          <ImgPicker name="photoURL"/>
          <Label>{t("seller.profile.name")}</Label>
          <Input name="displayName" placeholder={t("seller.profile.namePlaceholder")}/>
          <Label>{t("seller.profile.email")}</Label>
          <Input name="email" placeholder={t("seller.profile.emailPlaceholder")}/>
          <Label>{t("seller.profile.bio")}</Label>
          <Input name="bio" placeholder={t("seller.profile.bioPlaceholder")}/>
          <Submit>{t("seller.profile.update")}</Submit>
        </Form>
      );
    }

    return  (
      <View style={[buttonWithMarginTop, {flex: 1, alignItems: "stretch"}]}>
        {Object.keys(seller).length ?
          renderSellerProfile()
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
