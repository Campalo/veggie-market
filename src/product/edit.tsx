import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form, Input, Submit, Select } from '../forms';
import { converter, FormProduct } from './model';
import { firestore } from 'firebase';



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
      <Form defaultValues={product} onSubmit={edit}>
        <Input name="name" placeholder="Name of the product" />
        <Input name="price" type="decimal-pad" placeholder="Price" />
        <Input name="stock" type="decimal-pad" placeholder="Amount in Stock" />
        <Select name="unit" options={['kg', 'unite']} />
        <Submit>Save Product</Submit>
      </Form>
      <Button title="Delete" onPress={remove} />
    </View>
  )
}

export default EditScreen;