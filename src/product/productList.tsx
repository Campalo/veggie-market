import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection } from "../firestore";
import { Link } from '@react-navigation/native';
import { useList } from '../theme/list';
import { useButton } from '../theme/button';

function ProductList() {
  const products = useCollection("products");
  const { list, listItem, itemTitle, itemSubtitle, itemAvatar } = useList();
  const { button } = useButton();

  const renderProduct = ({ item }: any) => (
    <View style={listItem}>
      <Image style={itemAvatar} source={{ uri: item.image }} />
      <View>
        <Text style={itemTitle}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={itemSubtitle}>{item.price}€ / {item.unit}</Text>
          <Text style={itemSubtitle}> - </Text>
          <Text style={itemSubtitle}>{item.stock} {item.unit} in stock</Text>
        </View>
      </View>
    </View>
  )

  return(
    <View style={{flex: 1}}>
        <FlatList style={list}
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
        >
        </FlatList>
        <Link style={button} to="/Create">Add</Link>
    </View>
  )
}

export default ProductList;