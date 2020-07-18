import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection } from "../firestore";
import { useTypography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

function ProductList() {
  const products = useCollection("products");
  const { text, subtitle } = useTypography();
  const navigation = useNavigation();

  const renderProduct = ({ item }: any) => (
    <View style={styles.item}>
      <Image style={styles.avatar} source={{ uri: item.image }} />
      <Text style={subtitle}>{item.name}</Text>
      <Text style={text}>{item.price} euros / {item.unit}</Text>
      <Text style={text}>{item.stock} {item.unit} in stock</Text>
    </View>
  )

  return(
    <View>
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
        >
        </FlatList>
        <Button
            onPress={() => navigation.navigate('Create')}
            title="Add"
            accessibilityLabel="Add a new product to the list"
        />
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "lightgrey",
      borderRadius: 4,
      padding: 20,
      margin: 10,
    },
    avatar: {
      borderRadius: 50,
      width: 100,
      height: 100,
    }
  });

export default ProductList;