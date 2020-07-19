import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form, Input, Submit } from '../forms';
import { createDoc } from '../firestore';

function CreateScreen() {
    const navigation = useNavigation();
    const add = async (product: any) => {
      await createDoc("products");
      navigation.goBack();
    }
    return (
      <View>
        <Form onSubmit={add}>
          <Input name="name" placeholder="Name of the product" />
          <Input name="price" type="decimal-pad" placeholder="Price" />
          <Input name="stock" type="decimal-pad" placeholder="Amount in Stock" />
          <Input name="unit" type="decimal-pad" placeholder="Unit (kg, unit, ...)" />
          <Submit>Save Product</Submit>
        </Form>
      </View>
    )
  }

export default CreateScreen;