import React, {useRef} from 'react';
import { Text, View, Image, Button, FlatList, Animated } from 'react-native';
import { useCollection } from "../firestore";
import { Link } from '@react-navigation/native';
import { useList } from '../theme/list';
import { useButton } from '../theme/button';

function ProductList() {
  const products = useCollection("products");
  const { list, listItem, itemTitle, itemSubtitle, itemAvatar } = useList();
  const { button } = useButton();

  const initialValues = products.map(() => {
    return new Animated.Value(0);
  })

  const animations = products.map((item, index) => {
      return (
        Animated.timing(initialValues[index], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        })
      )
  })

  Animated.stagger(400, animations).start();


  const renderProduct = ({ item , index}: any) => (
    <Animated.View key={index} style={[listItem, {opacity: initialValues[index]}]}>
      <Image style={itemAvatar} source={{ uri: item.image }} />
      <View>
        <Text style={itemTitle}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={itemSubtitle}>{item.price}€ / {item.unit}</Text>
          <Text style={itemSubtitle}> - </Text>
          <Text style={itemSubtitle}>{item.stock} {item.unit} in stock</Text>
        </View>
      </View>
    </Animated.View>
  )

  return(
    <View style={{flex: 1}}>
        <View            >
            <FlatList style={list}
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                >
            </FlatList>
        </View>
        <Link style={button} to="/Create">Add</Link>
    </View>
  )
}

export default ProductList;