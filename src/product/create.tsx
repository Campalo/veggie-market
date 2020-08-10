import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createDoc } from '../firestore';
import { converter, FormProduct } from './model';
import ProductFormFields from '../components/productForm';

function CreateScreen() {
  const navigation = useNavigation();

  const add = async (product: FormProduct) => {
    await createDoc("products", converter, product);
    navigation.goBack();
  }

  return (
    <View>
        <ProductFormFields action={add} submitLabel="Save product"/>
    </View>
  )
}

export default CreateScreen;