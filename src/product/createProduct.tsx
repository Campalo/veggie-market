import React from 'react';
import { View, Text, Button } from 'react-native';
import { createDoc } from "../firestore";
import { useNavigation } from '@react-navigation/native';

import { Form, Input, Submit } from '../forms';

function CreateScreen() {
    const navigation = useNavigation();
    const add = async () => {
      await createDoc("products");
      navigation.goBack();
    }
    return (
      <View>
        <Form onSubmit={add}>
          <Input name="name" />
          <Input name="price" />
          <Input name="stock" />
          <Input name="unit" />
          <Submit>Save Product</Submit>
        </Form>
      </View>
    )
  }

export default CreateScreen;