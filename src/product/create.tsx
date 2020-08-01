import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Form, Input, Submit, Select, Label, ImgPicker } from '../forms';
import { createDoc } from '../firestore';
import { converter, FormProduct, formProduct } from './model';

function CreateScreen() {
  const navigation = useNavigation();
  const add = async (product: FormProduct) => {
    await createDoc("products", converter, product);
    navigation.goBack();
  }
  return (
    <View>
      <Form defaultValues={formProduct()} onSubmit={add}>
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