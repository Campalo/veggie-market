import React, {useState, useEffect} from "react";
import {  View, Image, Text } from "react-native";
import { Form, Label, Input, Submit } from "../../common/components/forms";
import { auth, User } from "firebase";
import { Btn } from "../../common/components/btn";
import {useButton} from '../../common/theme/button';
import { useTypography } from "../../common/theme/typography";
import { density } from "../../common/theme/theme";
import { useNavigation } from '@react-navigation/native';


interface Credential {
  email: string,
  password: string
}

const SignupScreen = () => {
  const navigation = useNavigation();
  const {buttonWrapper } = useButton();
  const { text, subtitle } = useTypography();
  const [user, setUser] = useState<User | null>(null);

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
        style={{width: 100, height: 100, borderRadius: 50, marginVertical: 2 * density, display: "flex", alignSelf: "center"}}
        source={require("../../common/assets/undraw_profile.png")}
      />
      <Text style={[subtitle, {justifyContent: "center"}]}>
        Welcome {user?.displayName}
      </Text>
      <Text style={[subtitle, {justifyContent: "center", paddingBottom: 2 * density}]}>
      You're connected now
      </Text>
        <Btn style={buttonWrapper} onPress={()=> navigation.navigate("Profile")}>Go to Profile and Settings</Btn>
        <Btn onPress={signout}>Logout</Btn>
    </View>
  )

  const renderForm = (
    <View>
      <Form onSubmit={signup}>
        <Label>Email</Label>
        <Input name="email" placeholder="Your email" />
        <Label>Password</Label>
        <Input name="password" placeholder="Your password" secureTextEntry={true}/>
        <Submit>Signup</Submit>
      </Form>
      <Text style={[text, {paddingTop: 2 * density, textAlign: "center"}]}>Or</Text>
      <Btn style={buttonWrapper} onPress={signinWithGoogle}>Login with Google</Btn>
    </View>
  )

  return user ? renderAvatar : renderForm;
};

export default SignupScreen;
