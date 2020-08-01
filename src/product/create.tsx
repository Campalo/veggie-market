import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Form, Input, Submit, Select, Label, ImgPicker } from '../forms';
import { createDoc } from '../firestore';
import { converter, FormProduct } from './model';

function CreateScreen() {
  const navigation = useNavigation();
  const add = async (product: FormProduct) => {
    console.log('product', product);
    await createDoc("products", converter, product);
    navigation.goBack();
  }
  return (
    <View>
      <Form onSubmit={add}>
        <Label>Select an image</Label>
        <ImgPicker name="image"/>
        <Label>Product Name</Label>
        <Input name="name" placeholder="Name of the product" />
        <Label>Price</Label>
        <Input name="price" type="numeric" placeholder="Price" />
        <Label>Stock</Label>
        <Input name="stock" type="numeric" placeholder="Amount in Stock" />
        <Label>Unit</Label>
        <Select name="unit" options={['kg', 'unite']} />
        <Submit>Save Product</Submit>
      </Form>
    </View>
  )
}

export default CreateScreen;