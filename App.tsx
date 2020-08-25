import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { getTheme, ThemeContext } from './src/common/theme/theme';
import { ColorSchemeName } from 'react-native-appearance';

import ProductList from "./src/pages/seller/product/list";
import CreateScreen from './src/pages/seller/product/create';
import EditScreen from './src/pages/seller/product/edit';
import SignupScreen from './src/pages/auth/signup';
import ProfileScreen from  './src/pages/seller/profile/profile';

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
            <Stack.Screen name="Auth" component={SignupScreen} options={{title: 'Signup / Login with Google / Logout'}} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
  );
}