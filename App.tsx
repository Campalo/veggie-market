import 'react-native-gesture-handler';
import React, { useState, useLayoutEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native';
import { getTheme, ThemeContext, useToggleMode } from './src/theme/theme';
import { useTypography } from './src/theme/typography';

import ProductList from "./src/product/list";
import CreateScreen from './src/product/create';
import EditScreen from './src/product/edit';
import { ColorSchemeName } from 'react-native-appearance';
import { Btn } from './src/components/btn';

// TO CHECK: How to handle navigation with react-native/web because we don't use link with react-navigation/native

const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState<ColorSchemeName>("dark");

  return (
      <ThemeContext.Provider value={[mode, setMode]}>
        <NavigationContainer theme={getTheme(mode)}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create your product' }} />
            <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit your product' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const { app } = useTypography();
  const toggleMode = useToggleMode();

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: () => <Btn onPress={toggleMode}>Change Theme</Btn> });
  }, [navigation]);

  return (
    <SafeAreaView style={app}>
      <ProductList />
    </SafeAreaView>
  );
}
