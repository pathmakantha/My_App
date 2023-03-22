import React, { useEffect, useState } from 'react';
//import { StyleSheet, View, TextInput, Pressable, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { firebase } from './config'



import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogIn from './src/LogIn';
import SignUp from './src/SignUp';
import Dashboard from './src/Dashboard';
import Header from './components/Header';
import Settings from './src/Settings';
import Splash from './src/Splash';

const Stack = createNativeStackNavigator();

function App() {

  const [Initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //handdle
  function onAuthStateChanged(user){
    setUser(user);
    if (Initializing) setInitializing(false);
  }

  useEffect(()=> {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (Initializing) return null;

  if (!user){
  
    return (
        <Stack.Navigator>
          <Stack.Screen 
              name="Splash" 
              component={Splash}
              options={{headerShown: false,
                headerTitle: () => <Header name="Splash"/>,
                headerStyle:{
                  height:150,
                  borderBottomLeftRadius:50,
                  borderBottomRightRadius:50,
                  backgroundColor:'#00e4d0',
                  shadowColor: '#000',
                  elevation:25
                }
              }}              
              />
          <Stack.Screen 
              name="LogIn" 
              component={LogIn}
              options={{headerShown: false,
                headerTitle: () => <Header name="My App"/>,
                headerStyle:{
                  height:150,
                  borderBottomLeftRadius:50,
                  borderBottomRightRadius:50,
                  backgroundColor:'#00e4d0',
                  shadowColor: '#000',
                  elevation:25
                }
              }}              
              />

          <Stack.Screen 
              name="SignUp" 
              component={SignUp}
              options={{headerShown: false,
                headerTitle: () => <Header name="SignUp"/>,
                headerStyle:{
                  height:150,
                  borderBottomLeftRadius:50,
                  borderBottomRightRadius:50,
                  backgroundColor:'#00e4d0',
                  shadowColor: '#000',
                  elevation:25
                }
              }}              
              />
              
        </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      
     
      
      <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
              options={{headerShown: false,
                headerTitle: () => <Header name="Dashboard"/>,
                headerStyle:{
                  height:150,
                  borderBottomLeftRadius:50,
                  borderBottomRightRadius:50,
                  backgroundColor:'#00e4d0',
                  shadowColor: '#000',
                  elevation:25
                }
              }}              
              />
        <Stack.Screen 
              name="Settings" 
              component={Settings}
              options={{headerShown: true,
                headerTitle: () => <Header name="Settings"/>,
                headerStyle:{
                  height:150,
                  borderBottomLeftRadius:50,
                  borderBottomRightRadius:50,
                  backgroundColor:'#1E1E1E',
                  shadowColor: '#000',
                  elevation:25
                }
              }}              
              />
      
    </Stack.Navigator>
    
  );
}

export default () =>{
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
