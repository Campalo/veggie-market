import React from 'react';
import { View, Text, Button } from 'react-native';
import { createDoc } from "../firestore";
import { useNavigation } from '@react-navigation/native';


function CreateScreen() {
    const navigation = useNavigation();
    const add = async () => {
      await createDoc("products");
      navigation.goBack();
    }
    return (
      <View>
        <Text>... forms are coming</Text>
        <Button title="Save" onPress={add} accessibilityLabel="Save the new product to the list" />
      </View>
    )
  }

export default CreateScreen;