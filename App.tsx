import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection, createDoc } from "./src/firestore";
import { useTheme, ThemeContext, ThemeMode } from './src/theme';

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  return (
    <ThemeContext.Provider value={[mode, setMode]}>
    <NavigationContainer>
      <Home />
    </NavigationContainer>
    </ThemeContext.Provider>
  );
}

function Home() {
  const products = useCollection("products");
  const [{ app, text, title, subtitle }, toggleMode] = useTheme();

  const renderProduct = ({ item }: any) => (
      <View style={styles.item}>
        <Image style={styles.avatar} source={{ uri: item.image}}/>
        <Text>{item.name}</Text>
        <Text>{item.price} euros / {item.unit}</Text>
        <Text>{item.stock} {item.unit} in stock</Text>
      </View>
  )

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={ item => item.id}
        >
        </FlatList>
      <Button
        onPress={ () => createDoc("products")}
        title = "Add"
        accessibilityLabel="Add a new product to the list"
      />
      <Button title="Change Theme" onPress={toggleMode} />
      </SafeAreaView>
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
