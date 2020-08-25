import React, {useState, useEffect} from "react";
import { View, Image, Text } from "react-native";
import { Form, Label, Input, Submit } from "../../common/components/forms";
import { auth, User } from "firebase";
import { Btn } from "../../common/components/btn";
import { useTypography } from "../../common/theme/typography";
import { density } from "../../common/theme/theme";

interface Credential {
  email: string,
  password: string
}

const SignupScreen = () => {
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
        <Submit >Signup</Submit>
      </Form>
      <Text style={[text, {paddingVertical: 2 * density, textAlign: "center"}]}>Or</Text>
      <Btn onPress={signinWithGoogle}>Login with Google</Btn>
    </View>
  )

  return user ? renderAvatar : renderForm;
};

export default SignupScreen;
