import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { Button, SafeAreaView } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { getTheme, ThemeContext, useToggleMode } from './src/theme/theme';
import { useTypography } from './src/theme/typography';

import ProductList from "./src/product/productList";
import CreateScreen from './src/product/createProduct';
import EditScreen from './src/product/editProduct';

// TO CHECK: How to handle navigation with react-native/web because we don't use link with react-navigation/native

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
