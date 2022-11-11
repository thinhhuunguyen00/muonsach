import { StyleSheet,View, Text } from 'react-native';
import AddSach from './Components/Sach/AddSach';
import IndexSach from './Components/Sach/IndexSach';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Components/Home';
import IndexSV from './Components/SV/IndexSV';
import AddSV from './Components/SV/AddSV';
import IndexSVSach from './Components/SVSach/IndexSVSach';
import AddSVSach from './Components/SVSach/AddSVSach';
import Fetch from './Components/Fetch';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Sidebar from './Sidebar';
import SearchList from './Components/SearchList';
import TableSach from './Components/Sach/TableSach';
import { useState, useEffect } from 'react';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import EditSach from './Components/Sach/EditSach';
import Mapgg from './Mapgg';
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sidebar" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="AddSach" component={AddSach} />
        <Stack.Screen name="AddSV" component={AddSV} />
        <Stack.Screen name="AddSVSach" component={AddSVSach} />   
        <Stack.Screen name="IndexSach" component={IndexSach}   />  
        <Stack.Screen name="IndexSV" component={IndexSV} />
        <Stack.Screen name="IndexSVSach" component={IndexSVSach} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Mapgg/>
    )
    
  
}

const styles = StyleSheet.create({
})