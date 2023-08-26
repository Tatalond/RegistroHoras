/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './ios/src/views/LoginScreen';
import RegistrationScreen from './ios/src/views/RegistrationScreen';
import HomeScreen from './ios/src/views/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "./ios/src/components/Loader";

const Stack = createNativeStackNavigator();

const App = () => {

  //aqui deben de ir los hooks
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(()=>{
    setTimeout(authUser,2000);
  },[])
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName('LoginScreen');
        } else {
          setInitialRouteName('RegistrationScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }

    } catch (error) {
      setInitialRouteName('RegistrationScreen');

    }

  };

  return (

    <NavigationContainer>
      {initialRouteName == '' ? (
        <Loader visible ={true}  />) : (<>
        <Stack.Navigator 
          initialRouteName={initialRouteName} 
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </Stack.Navigator></>)}
    </NavigationContainer>
  )

};


export default App;
