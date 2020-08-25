import React, {useState, useEffect} from "react";
import { View, Image, Text } from "react-native";
import { Form, Label, Input, Submit } from "../../common/components/forms";
import { auth, User } from "firebase";
import { Btn } from "../../common/components/btn";

interface Credential {
  email: string,
  password: string
}

const Signup = () => {
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
      <Text>Welcome {user?.displayName}</Text>
      {/* <Image style={{width: 100, height: 100}} source={{ uri: user?.photoURL || ''}}></Image> */}
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
    <Btn onPress={signinWithGoogle}>Login with Google</Btn>
  </View>
  )

  return user ? renderAvatar : renderForm;
};

export default Signup;
