import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation()
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) =>{
            if(snapshot.exists){
                setUserName(snapshot.data())
            }
            else{
                console.log('User Not exist')
            }

        })
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.h1}>
                My App
            </Text>

            <View style={{paddingHorizontal:16}}>

            <View style={{ backgroundColor:'#fff', borderRadius: 12, marginBottom: 16,backgroundColor:'#3D3D3D',width:370}}>     
                    <Text style={styles.input}>
                        Name
                    </Text>
                    <Text style={styles.text}>
                        {username.username}
                    </Text>
                </View>
                
                <View style={{ backgroundColor:'#fff', borderRadius: 12, marginBottom: 16,backgroundColor:'#3D3D3D',}}>     
                    <Text style={styles.input}>
                        Email
                    </Text>
                    <Text style={styles.text}>
                        {username.email}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => {firebase.auth().signOut()}}  style={{backgroundColor: '#FFD482', borderRadius: 10, height: 48, padding: 10, position:'relative', top: 240,}}>
                    <Text style={{flexDirection:'row',textAlign:'center',color: "#000000", fontWeight: "600", fontSize: 20, textAlignVertical:'center'}}>
                        Log Out
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
        
        );
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
        padding: 10,
        marginVertical: -3,
        width: '100%',
        color:'#ffff',
        fontWeight: "600", 
    },
    input: {
      
      padding: 10,
      marginVertical: -3,
      width: '100%',
      color:'#C0C0C0',
    },
   
    
  });

export default Settings

