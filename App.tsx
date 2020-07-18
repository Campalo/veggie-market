import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useCollection} from "./src/firestore";

export default function App() {
  const products = useCollection("products");
  return (
    <View style={styles.container}>
      {products.map(product =>
      <View style={styles.item}>
        <Image style={styles.avatar} source={{ uri: product.image}}/>
        <Text>{product.name}</Text>
        <Text>{product.price} euros / {product.unit}</Text>
        <Text>{product.stock} {product.unit} en stock</Text>
      </View>
        )}
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
