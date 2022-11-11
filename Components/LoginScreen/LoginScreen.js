import { StatusBar } from "expo-status-bar";
import  React,  { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import {BlurView} from 'expo-blur';

import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {app} from "../config";
import  {firebaseConfig} from '../config'
import { navigation } from "@material-ui/icons";

const LoginScreen= ({navigation}) =>{

const uri ='https://toigingiuvedep.vn/wp-content/uploads/2021/08/background-sach-dep-den-ngo-ngang.jpg'

const [email, setEmail] =React.useState('')
const [password, setPassword] =React.useState('')

//const app = initializeApp(firebaseConfig);
const auth= getAuth(app);

const handleSignin =() => {
  signInWithEmailAndPassword(auth , email , password)
  .then((userCredential)=> {
    console.log('Signin in')
    const user =userCredential.user;
    console.log(user);
    navigation.navigate('Sidebar')
  })
  .catch(error => {
    console.log(error)
  })
}

 

  return (
    <View style={styles.container}>
      <Image source ={{uri}} style ={[styles.image, StyleSheet.absoluteFill]}></Image>
      <ScrollView contentContainerStyle ={{
        flex :1,
        width: '100%',
        height :'100%',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={require('../../assets/iconlogin.png')} style={styles.profilePicture}></Image>
            <View>
              <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Email</Text>
              <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder= 'admin@gmail.com'></TextInput>
            </View>
            <View>
              <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Password</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder= 'password' secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text onPress={handleSignin} style={{ fontSize:17, fontWeight :'400', color:'black'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
  width: '100%',
  height :'100%',
  resizeMode:'cover',
  },
 
  login: {
    width: 350,
    height: 500,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    alignItems:'center'
  },
 
  profilePicture: {
    height: 100,
    width:100,
    borderRadius:50,
    borderColor:'#fff',
    borderWidth:1,
    marginVertical:30,
  },
  input:{
    width:250,
    height:40,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    marginVertical:10,
    backgroundColor:'#fffffff90',
    marginBottom:20
  },
  button:{
    height: 40,
    width:240,
    borderRadius:10,
    backgroundColor:'#00CFEB90',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10,
  }
 
});