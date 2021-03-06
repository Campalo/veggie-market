import React, { useLayoutEffect, FunctionComponent } from 'react';
import { Text, View, Image, FlatList, Animated, Easing } from 'react-native';
import { useCollection } from "../../../firestore";
import { Link, useNavigation } from '@react-navigation/native';
import { useList } from '../../../common/theme/list';
import { useButton } from '../../../common/theme/button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation} from "react-i18next";
import { getUnitLabel, Product } from "../../../common/types/product.model";

function ProductList() {
  const navigation = useNavigation();
  const products = useCollection("products");
  const { list, listItem, itemTitle, itemSubtitle, itemAvatar } = useList();
  const { button } = useButton();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: () => {
      return (
        <View>
          <Link style={button} to="/Auth">{t("login")} / {t("logout")}</Link>
        </View>
      )
    }});

  }, [navigation]);

  const initialValues = products.map(() => {
    return new Animated.Value(0);
  })

  const ItemAnimations = products.map((item, index) => {
    return (
      Animated.timing(initialValues[index], {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    )
  })

  const initialValue = new Animated.Value(0);
  const LinkAnimation = Animated.timing(initialValue, {
    toValue: 1,
    duration: 500,
    easing: Easing.elastic(1),
    useNativeDriver: true
  });

  Animated.stagger(400, [...ItemAnimations, LinkAnimation]).start();

  const unitLabel = getUnitLabel();


  const renderProduct : FunctionComponent<{item: Product, index: number}> = ({ item, index }) => (
    <Animated.View key={index} style={{ opacity: initialValues[index] }}>
      <TouchableOpacity style={listItem} onPress={() => navigation.navigate('Edit', { id: item.id })}>
        <Image style={itemAvatar} source={{ uri: item.image }} />
        <View>
          <Text style={itemTitle}>{item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={itemSubtitle}>{item.price}€ / {unitLabel[item.unit]}</Text>
            <Text style={itemSubtitle}> - </Text>
            <Text style={itemSubtitle}>{item.stock} {unitLabel[item.unit]} {t("seller.product.available")}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={{ flex: 1 }}>
      <FlatList style={list}
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
      >
      </FlatList>
      <Animated.View key={products.length} style={{ transform: [{ scale: initialValue }], opacity: initialValue }}>
        <View>
          <Link style={button} to="/Create">{t("seller.product.add")}</Link>
        </View>
      </Animated.View>
    </View>
  )
}

export default ProductList;