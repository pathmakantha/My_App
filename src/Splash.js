import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('LogIn')
    },3000)
    
  
   

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#2A2A2A'}}>
    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
      <Text style={{fontSize:24, fontWeight:600, color:'#fff'}}>My App</Text>
    </TouchableOpacity>
    </SafeAreaView>
        
        );
  }
  

export default Splash

