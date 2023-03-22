import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity,FlatList, Image, } from 'react-native';

import { firebase } from '../config'
import { getCharacters } from '../api';
import { useNavigation } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Dashboard = () => {
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

    const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <Text style={styles.name}>{item.fullName}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.house}>{item.houseName}</Text>
    </View>
  );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{position: "absolute", right:20,  top:80}}>

            <TouchableOpacity onPress={()=> navigation.navigate("Settings")}>
              <AntDesign name='setting' size={48} style={{color:"#fff"}} />
           </TouchableOpacity>
           
          </View>
            <Text style={styles.h1}>
                Hello, {username.username}
            </Text>
            
            <View style={{paddingHorizontal:16, top:90}}>
            <Text style={styles.text}>Game of Thrones Characters</Text>
            <View style={{flexDirection:'row', backgroundColor:'#fff', borderRadius: 12, marginBottom: 10,backgroundColor:'#3D3D3D', }}>
                <TextInput
                    style={styles.input2}
                    placeholderTextColor='#C0C0C0'
                    placeholder="Search characters"
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
            </View>
            <FlatList
                    data={filteredCharacters}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
          
                {/* <TouchableOpacity onPress={()=> navigation.navigate("CharacterListScreen")}  style={{backgroundColor: '#FFD482', borderRadius: 10, height: 48, padding: 10, position:'relative', top: 240,}}>
                    <Text style={{flexDirection:'row',textAlign:'center',color: "#000000", fontWeight: "600", fontSize: 20, textAlignVertical:'center'}}>
                    Game of Thrones Character
                    </Text>
                </TouchableOpacity> */}
                

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
      width: '100%',
      //height: 29,
      //left: 150,
      top: 90,
      paddingLeft: 16,
      textAlign: 'left',
    },
    text: {
        padding: 10,
        textAlign: 'center',
        width: '100%',
        color:'#ffff',
        fontWeight: "600", 
    },
    input2: {
      
      padding: 10,
      marginVertical: -3,
      width: '100%',
      color:'#C0C0C0',
    },
    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      list: {
        flexGrow: 2,
        justifyContent: 'center',
      },
      item: {
        backgroundColor: '#3D3D3D',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color:"#fff",
      },
      title: {
        fontSize: 16,
        marginTop: 5,
        color:"#fff",
      },
      house: {
        fontSize: 16,
        marginTop: 5,
        color:"#fff",
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
    
  });

export default Dashboard

