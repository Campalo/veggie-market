import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection, createDoc } from "./src/firestore";
import { useTheme, ThemeContext, ThemeMode } from './src/theme';

type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: undefined;
}

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>
type CreateScreenProps = StackScreenProps<RootStackParamList, 'Create'>
type EditScreenProps = StackScreenProps<RootStackParamList, 'Edit'>


const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState<ThemeMode>('light');
  return (
    <ThemeContext.Provider value={[mode, setMode]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard'}}/>
          <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create your product'}}/>
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit your product'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

function HomeScreen({navigation}: HomeScreenProps) {
  const products = useCollection("products");
  const [{ app, text, title, subtitle }, toggleMode] = useTheme();

  const renderProduct = ({ item }: any) => (
      <View style={styles.item}>
        <Image style={styles.avatar} source={{ uri: item.image}}/>
        <Text style={subtitle}>{item.name}</Text>
        <Text style={text}>{item.price} euros / {item.unit}</Text>
        <Text style={text}>{item.stock} {item.unit} in stock</Text>
      </View>
  )

  return (
      <SafeAreaView style={app}>
        <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={ item => item.id}
        >
        </FlatList>
        <Button
          onPress={ () => navigation.navigate('Create')}
          title = "Add"
          accessibilityLabel="Add a new product to the list"
        />
      <Button title="Change Theme" onPress={toggleMode} />
      </SafeAreaView>
  );
}

function CreateScreen({navigation}: CreateScreenProps) {
  return (
    <View>
      <Text>... forms are coming</Text>
      <Button
        onPress={async () => {
          await createDoc("products"),
          navigation.goBack()
        }}
        title= "Save"
        accessibilityLabel="Save the new product to the list"
      />
    </View>
  )
}

function EditScreen({navigation}: EditScreenProps) {
  return (
    <View>
      <Text>... forms with current values are coming</Text>
    </View>
  )
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
