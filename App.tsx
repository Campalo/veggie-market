import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image, Button, FlatList, SafeAreaView } from 'react-native';
import { useCollection, createDoc } from "./src/firestore";
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { getTheme, ThemeContext, useToggleMode } from './src/theme/theme';
import { useTypography } from './src/theme/typography';

import ProductList from "./src/product/productList";

// TO CHECK: How to handle navigation with react-native/web because we don't use link with react-navigation/native

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
  const scheme = useColorScheme();
  const [mode, setMode] = useState(scheme);

  return (
    <AppearanceProvider>
      <ThemeContext.Provider value={[mode, setMode]}>
        <NavigationContainer theme={getTheme(mode)}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create your product' }} />
            <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit your product' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </AppearanceProvider>
  );
}

function HomeScreen() {
  const { app } = useTypography();

  return (
    <SafeAreaView style={app}>
      <ProductList />
    </SafeAreaView>
  );
}

function CreateScreen({ navigation }: CreateScreenProps) {
  const add = async () => {
    await createDoc("products");
    navigation.goBack();
  }
  return (
    <View>
      <Text>... forms are coming</Text>
      <Button title="Save" onPress={add} accessibilityLabel="Save the new product to the list" />
    </View>
  )
}

function EditScreen({ navigation }: EditScreenProps) {
  return (
    <View>
      <Text>... forms with current values are coming</Text>
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
