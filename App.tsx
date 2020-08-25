import 'react-native-gesture-handler';
import React, { useState, useLayoutEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native';
import { getTheme, ThemeContext, useToggleMode } from './src/common/theme/theme';
import { useTypography } from './src/common/theme/typography';

import ProductList from "./src/pages/seller/product/list";
import CreateScreen from './src/pages/seller/product/create';
import EditScreen from './src/pages/seller/product/edit';
import { ColorSchemeName } from 'react-native-appearance';
import { Btn } from './src/common/components/btn';

const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState<ColorSchemeName>("dark");

  return (
      <ThemeContext.Provider value={[mode, setMode]}>
        <NavigationContainer theme={getTheme(mode)}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={ProductList} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create your product' }} />
            <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit your product' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
  );
}