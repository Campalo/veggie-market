import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection } from "../firestore";
import { useTypography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { useList } from '../theme/list';

function ProductList() {
  const products = useCollection("products");
  const navigation = useNavigation();
  const { text, subtitle } = useTypography();
  const { list, listItem, itemTitle, itemSubtitle, itemAvatar } = useList();

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
    <View>
        <FlatList style={list}
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