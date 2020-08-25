import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { converter, FormProduct } from '../../../common/types/product.model';
import { firestore } from 'firebase';
import { Btn } from '../../../common/components/btn';
import ProductFormFields from './form';


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
      <ProductFormFields onSubmit={edit} submitLabel="Update Product" product={product}/>
    </View>
  )
}

export default EditScreen;