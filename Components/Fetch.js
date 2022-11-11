import { StylesContext } from "@material-ui/styles";
import { QuerySnapshot } from "firebase/firestore";
import React from "react";
import { useEffect,useState } from "react";
import { Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {firebase} from './config';
import { StyleSheet, View, Text } from "react-native";

const Fetch =() =>{
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('todos')

    useEffect(async ()=> {
        todoRef
        .onSnapshot(
            querySnapshot =>{
                const users =[]
                querySnapshot.forEach((doc)=>{
                    const {heading, text } =doc.data()
                    users.push({
                        id:doc.id,
                        heading,
                        text,
                    })
                })
                setUsers(users)
            }
        )
    },[])

    return(
        <View style={{ flex :1, marginTop: 100}}>
            <FlatList 
            style={{height:'100%'}}
            data={users}
            numColumns={1}
            renderItem={({item}) => (
                <Pressable
                style={styles.container}
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.itemHeading}>{item.heading}</Text>
                        <Text style={styles.itemText}>{item.text}</Text>
                    </View>
                </Pressable>
            )}
            />
        </View>
    )
}

export default Fetch  

const styles= StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
    },
    itemHeading:{
        fontWeight :'bold'
    },
    itemText:{
        fontWeight:'300',
    }
})