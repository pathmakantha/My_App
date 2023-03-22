import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const LogIn = () => {

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error){
      alert(error.message)
    }
  }
    return (
      <SafeAreaView style={styles.container}>
      
      <Text style={styles.h1}>
        My App
      </Text>

      <View style={{paddingHorizontal:16}}>

      <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12, marginBottom: 16,backgroundColor:'#3D3D3D',}}>     
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor='#C0C0C0'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      </View>

      <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12,backgroundColor:'#3D3D3D', }}>   
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='#C0C0C0'
       
        name="password"
         
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
      />
        <View style={{position: "absolute", right:10, marginVertical:20}}>
          <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size={18} color="#9796A199" />
            </Pressable>
        </View>
      

      </View>

      <TouchableOpacity onPress={()=> {}}>
        <Text style={{color:'#fff', fontWeight:'400', position: 'relative', marginVertical: 10, textAlign:'right',marginBottom: 50}}>Forgot Password ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>loginUser(email,password)} style={{backgroundColor: '#FFD482', borderRadius: 10, height: 48, padding: 10, marginBottom: 30}}>
      <Text style={{textAlign:'center',color: "#000000", fontWeight: "600", fontSize: 20, textAlignVertical:'center'}}>
        Sign In
      </Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30, position:'relative', top: 240,}}>
        <Text style={{color:'#ffff',fontWeight: 600}}>Don’t have an account?</Text>
        
        <TouchableOpacity onPress={()=> navigation.navigate("SignUp")} >
          <Text style={{color:'#FFD482', textDecorationLine:"underline", fontWeight: 600 }}> Sign Up</Text>
        </TouchableOpacity> 
      </View>
      



      </View>
    </SafeAreaView>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
      flex: 1,
      color: "#FFFFFF", 
      //fontFamily: "Inter", 
      fontStyle: "normal",
      fontWeight: "600", 
      fontSize: 24,
      lineHeight: 29,
      
      position: 'absolute',
      width: 89,
      height: 29,
      //left: 150,
      top: 124,
  
      textAlign: 'center'
    },
    text: {
      flex: 1,
      color: "#666", 
      //fontFamily: "Inter", 
      fontStyle: "normal",
      fontWeight: "600", 
      fontSize: 12,
      lineHeight: 29,
      
      position: 'absolute',
      width: 89,
      height: 29,
      //left: 150,
      top: 124,
  
      textAlign: 'center'
    },
    input: {
      
      padding: 10,
      marginVertical: 10,
      width: '100%',
      color:'#fff',
    },
    button: {
      backgroundColor: '#FFD482',
      borderRadius: 10,
      flex: 1,
      padding:5,
      
  
      position: 'absolute',
      //width: 345,
      height: 48,
      left: 16,
      right:16,
      top: 200,
  
    },
    signup: {
     // flex: 1,
      color: "#FFD482", 
      //fontFamily: "Inter", 
      fontStyle: "normal",
      fontWeight: "600", 
      fontSize: 15,
      lineHeight: 18,
  
      //padding:5,
      //textAlign:'center',
  
      //position: 'absolute',
      //width: 345,
      height: 48,
      //left: 150,
      top: 270,
     
  
    },
    signup2: {
     
      color: "#fff", 
      //fontFamily: "Inter", 
      fontStyle: "normal",
      fontWeight: "600", 
      fontSize: 15,
      lineHeight: 18,
  
      //padding:5,
      //textAlign:'center',
  
      //position: 'absolute',
      width: 345,
      height: 48,
      //left: 150,
      top: 270,
     
  
    },
  }
  );

export default LogIn
