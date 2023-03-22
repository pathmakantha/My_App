import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { useTogglePasswordVisibility2 } from '../hooks/useTogglePasswordVisibility2';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const SignUp = () => {

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
      useTogglePasswordVisibility();
    const { passwordVisibility2, rightIcon2, handlePasswordVisibility2 } =
      useTogglePasswordVisibility2();

    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUserName] = useState('');

    const checkPasswordValidity = value => {
      const isContainsUppercase = /^(?=.*[A-Z]).*$/;
      if(!isContainsUppercase.test(value)){
        return 'Upper'
      }

      const isContainsLowercase = /^(?=.*[a-z]).*$/;
      if(!isContainsLowercase.test(value)){
        return 'Lower'
      }

      const isContainsNumber = /^(?=.*[0-9]).*$/;
      if(!isContainsNumber.test(value)){
        return 'Number'
      }

      const isValidLenght = /^.{8,16}$/;
      if(!isValidLenght.test(value)){
        return '8 charct'
      }

    
      return null;

    }

    const handdleLogin = () => {
      const checkPassword = checkPasswordValidity(password)
      if (!checkPassword){
        alert("Success Login")
      } else{
        alert(checkPassword)
      }

    }


    const signUpUser = async (email, password, username) => {
      await firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
          
              firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                  username,
                  email,
              })

          })
          .catch (error => {
              alert(error.message)
          })
          
              
          //})
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
            placeholder="Name"
            placeholderTextColor='#C0C0C0'
            value={username}
            onChangeText={setUserName}
            keyboardType="default"
          />
          </View>
    
          <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12, marginBottom: 16,backgroundColor:'#3D3D3D',}}>     
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email Address"
            placeholderTextColor='#C0C0C0'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          </View>
    
          <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12, marginBottom: 16,backgroundColor:'#3D3D3D', }}>   
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
    
          <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12,backgroundColor:'#3D3D3D',marginBottom: 16 }}>   
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor='#C0C0C0'
            name="Password2"
             
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility2}
            value={password2}
            enablesReturnKeyAutomatically
            onChangeText={text => setPassword2(text)}
          />
           <View style={{position: "absolute", right:10, marginVertical:20}}>
              <Pressable onPress={handlePasswordVisibility2}>
                  <MaterialCommunityIcons name={rightIcon2} size={18} color="#9796A199" />
                </Pressable>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <MaterialIcons name={'cached'} size={14} color="#9796A199" marginBottom={5} paddingHorizontal={5} />
            <Text style={{color:'#D0D0D0', fontSize:12, fontWeight:'400', position: 'relative', marginBottom: 5, textAlign:'right'}}>One lowercase character</Text>

            <MaterialIcons name={'cached'} size={14} color="#9796A199" marginBottom={5} paddingHorizontal={5} position="absolute" right={150} />
            <Text style={{color:'#D0D0D0', fontSize:12, fontWeight:'400', position: 'absolute', marginBottom: 5,marginBottom: 20, right: 10}}>One lowercase character</Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <MaterialIcons name={'cached'} size={14} color="#9796A199" marginBottom={5} paddingHorizontal={5} />
            <Text style={{color:'#D0D0D0', fontSize:12, fontWeight:'400', position: 'relative', marginBottom: 5, textAlign:'right',}}>One uppercase character</Text>

            <MaterialIcons name={'cached'} size={14} color="#9796A199" marginBottom={5} paddingHorizontal={5} position="absolute" right={150}/>
            <Text style={{color:'#D0D0D0', fontSize:12, fontWeight:'400', position: 'absolute', marginBottom: 5, textAlign:'right',marginBottom: 20, right: 24}}>8 characters minimum</Text>
          </View>

          <View style={{flexDirection:'row'}}>
            <MaterialIcons name={'cached'} size={14} color="#9796A199" marginBottom={5} paddingHorizontal={5} />
            <Text style={{color:'#D0D0D0', fontSize:12, fontWeight:'400', position: 'relative', marginBottom: 5, textAlign:'right',marginBottom: 20}}>One number</Text>
          </View>
       
    
          <TouchableOpacity onPress={()=>signUpUser(email,password,username)} style={{backgroundColor: '#FFD482', borderRadius: 10, height: 48, padding: 10, marginBottom: 30}}>
          <Text style={{textAlign:'center',color: "#000000", fontWeight: "600", fontSize: 20, textAlignVertical:'center'}}>
            Sign Up
          </Text>
          </TouchableOpacity>
    
          <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30, position:'relative', top: 140,}}>
            <Text style={{color:'#ffff',fontWeight: 600}}>Have an account?</Text>
            
            <TouchableOpacity onPress={()=> navigation.navigate("LogIn")} >
              <Text style={{color:'#FFD482', textDecorationLine:"underline", fontWeight: 600 }}> Sign In</Text>
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

export default SignUp

