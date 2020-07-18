import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { Text, View, Button, SafeAreaView } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { getTheme, ThemeContext, useToggleMode } from './src/theme/theme';
import { useTypography } from './src/theme/typography';


import ProductList from "./src/product/productList";
import CreateScreen from './src/product/createProduct';

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
  const toggleMode = useToggleMode();

  return (
    <SafeAreaView style={app}>
      <ProductList />
      <Button title="Change Theme" onPress={toggleMode} />
    </SafeAreaView>
  );
}

function EditScreen({ navigation }: EditScreenProps) {
  return (
    <View>
      <Text>... forms with current values are coming</Text>
    </View>
  )
}
