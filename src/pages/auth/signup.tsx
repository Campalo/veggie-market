import React, {useState, useEffect} from "react";
import {  View, Image, Text } from "react-native";
import { Form, Label, Input, Submit } from "../../common/components/forms";
import { auth, User } from "firebase";
import { Btn } from "../../common/components/btn";
import {useButton} from '../../common/theme/button';
import { useTypography } from "../../common/theme/typography";
import { density } from "../../common/theme/theme";
import { Link } from '@react-navigation/native';
import { useImgPicker } from '../../common/theme/imgPicker';
import { useTranslation } from "react-i18next";


interface Credential {
  email: string,
  password: string
}

const SignupScreen = () => {
  const {button, buttonWithMarginTop } = useButton();
  const { text, subtitle } = useTypography();
  const [user, setUser] = useState<User | null>(null);
  const { avatar, avatarCentered } = useImgPicker();
  const { t } = useTranslation();

  useEffect(() => {
    auth().onAuthStateChanged((user) => setUser(user))
  }, []);

  const signup = ({email, password}: Credential) => {
    auth().createUserWithEmailAndPassword(email, password);
  }
  const signinWithGoogle = () => {
    auth().signInWithPopup(new auth.GoogleAuthProvider());
  };

  const signout = () => {
    auth().signOut();
  };

  const renderAvatar = (
    <View>
      <Image
        style={[avatar, avatarCentered]}
        source={ user ? {uri: user?.photoURL } : require("../../common/assets/undraw_profile.png")}
      />
      <Text style={[subtitle, {justifyContent: "center"}]}>
        {t("signup.welcome")} {user?.displayName}
      </Text>
      <Text style={[subtitle, {justifyContent: "center", paddingBottom: 2 * density}]}>
      {t("signup.connected")}
      </Text>
        <Link style={[button, buttonWithMarginTop]} to="/Profile">{t("signup.profileandSettings")}</Link>
        <Btn onPress={signout}>{t("logout")}</Btn>
    </View>
  )

  const renderForm = (
    <View>
      <Form onSubmit={signup}>
        <Label>{t("signup.email")}</Label>
        <Input name="email" placeholder={t("signup.emailPlaceholder")} />
        <Label>{t("signup.password")}</Label>
        <Input name="password" placeholder={t("signup.passwordPlaceholder")} secureTextEntry={true}/>
        <Submit>{t("signup.signup")}</Submit>
      </Form>
      <Text style={[text, {paddingTop: 2 * density, textAlign: "center"}]}>{t("signup.or")}</Text>
      <Btn style={buttonWithMarginTop} onPress={signinWithGoogle}>{t("signup.loginWithGoogle")}</Btn>
    </View>
  )

  return user ? renderAvatar : renderForm;
};

export default SignupScreen;
