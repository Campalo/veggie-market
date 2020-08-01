import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form, Input, Submit, Select, Label, ImgPicker } from '../forms';
import { converter, FormProduct, formProduct } from './model';
import { firestore } from 'firebase';
import { Btn } from '../components/btn';


function EditScreen() {
  const navigation = useNavigation();
  const { id } = useRoute().params as { id: string };
  const [product, setProduct] = useState<FormProduct>();
  const doc = firestore().doc(`products/${id}`).withConverter(converter);
  
  useEffect(() => {  
    firestore().doc(`products/${id}`).withConverter(converter).get()
      .then(snapshot => snapshot.data())
      .then(data => setProduct(data));
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: () => <Btn onPress={remove}>Delete</Btn> });
  }, [navigation]);

  const edit = async (product: any) => {
    await doc.update(product);
    navigation.goBack();
  }
  const remove = async () => {
    await doc.delete();
    navigation.goBack();
  }

  if (!product) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <Form defaultValues={formProduct(product)} onSubmit={edit}>
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
        <Submit>Update Product</Submit>
      </Form>
    </View>
  )
}

export default EditScreen;