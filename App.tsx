import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import {useCollection, createDoc} from "./src/firestore";

export default function App() {
  const products = useCollection("products");
  return (
    <View style={styles.container}>
      {products.map(product =>
      <View style={styles.item} key={product.id}>
        <Image style={styles.avatar} source={{ uri: product.image}}/>
        <Text>{product.name}</Text>
        <Text>{product.price} euros / {product.unit}</Text>
        <Text>{product.stock} {product.unit} in stock</Text>
      </View>
        )}
      <Button
      onPress={ () => createDoc("products")}
      title = "Add"
      accessibilityLabel="Add a new product to the list"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    display: "flex",
    flexDirection:"column",
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
