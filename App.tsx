/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Cities } from './src/HomeScreen/Cities'
import { AddCity } from './src/AddCityScreen/AddCity';
import { AddLocation } from './src/AddLocationScreen/AddLocation';
import { Locations } from './src/LocationsScreen/Locations';
import { Info } from './src/InfoScreen/Info';
import { IconButton } from 'react-native-paper';

import uuid from 'react-native-uuid'

// interfaces for data content of application
export interface iLocation {
  name: string;
  info: string;
  id: string;
};

export interface iCity {
  id: string;
  name: string;
  country: string;
  locations?: iLocation[];
}

const testLahti: iCity = {
  id: uuid.v4().toString(),
  name: 'Lahti',
  country: 'Finland',
  locations: [
    {
      name: 'Ski Jumping Hill',
      info: 'Nice view tower',
      id: uuid.v4().toString(),
    },
    {
      name: 'Ice Hall',
      info: 'Pelicans home arena',
      id: uuid.v4().toString(),
    }
  ]
}

const testData: iCity[] = [
  testLahti
];

// navigation route parameters
type RootStackParamList = {
  Cities: {cities: iCity[], addCity: (city: iCity) => void};
  AddCity: undefined;
  Locations: {city: string};
  AddLocation: {city: string};
  Info: undefined;
}

// provides type safety
const Stack = createNativeStackNavigator<RootStackParamList>();

export type CitiesScreenProps = NativeStackScreenProps<RootStackParamList, 'Cities'>;
export type AddCityScreenProps = NativeStackScreenProps<RootStackParamList, 'AddCity'>;
export type LocationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Locations'>;
export type AddLocationScreenProps = NativeStackScreenProps<RootStackParamList, 'AddLocation'>;
export type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>;

export type CitiesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cities'>;
export type LocationsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Locations'>;
export type AddLocationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddLocation'>;

// placeholder for two screens (ToDO: make a real component)

function App(): React.JSX.Element {
  const [cities, setCities] = useState<iCity[]>(testData);

  const addCity = (city: iCity) => {
    console.log(`adding a city ${JSON.stringify(city)}`);
  }

  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Cities'
        screenOptions={{
            headerTitleAlign: 'center',
        }}
        >
        <Stack.Screen 
          name='Cities'
          component={Cities}
          initialParams={{cities}}
          options={({navigation}) => ({
            title: 'Cities App',
            headerLeft: () => (
              <IconButton 
                icon='information-outline'
                onPress={() => navigation.navigate('Info')}
                />
            ),
            headerRight: () => (
              <IconButton 
                icon='plus-circle-outline'
                onPress={() => navigation.navigate('AddCity')}
                />
            )
          })}
        ></Stack.Screen>
        <Stack.Screen 
          name='AddCity'
          component={AddCity}
          options={{
            title: 'Add City'
          }}
        ></Stack.Screen>
        <Stack.Screen 
          name='Locations'
          component={Locations}
          options={{
            title: 'Locations of'
          }}
        ></Stack.Screen>
        <Stack.Screen 
          name='AddLocation'
          component={AddLocation}
          options={{
            title: 'Add Location to'
          }}
        ></Stack.Screen>
        <Stack.Screen 
          name='Info'
          component={Info}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
