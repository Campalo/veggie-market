import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form, Input, Submit, Select } from '../forms';
import { createDoc } from '../firestore';
import { converter } from './model';

function CreateScreen() {
  const navigation = useNavigation();
  const add = async (product: any) => {
    await createDoc("products", converter, product);
    navigation.goBack();
  }
  return (
    <View>
      <Form onSubmit={add}>
        <Text>Product Name</Text>
        <Input name="name" placeholder="Name of the product" />
        <Text>Price</Text>
        <Input name="price" type="decimal-pad" placeholder="Price" />
        <Text>Stock</Text>
        <Input name="stock" type="decimal-pad" placeholder="Amount in Stock" />
        <Text>Unit</Text>
        <Select name="unit" options={['kg', 'unite']} />
        <Submit>Save Product</Submit>
      </Form>
    </View>
  )
}

export default CreateScreen;