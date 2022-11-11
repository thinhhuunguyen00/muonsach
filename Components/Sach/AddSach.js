import { View, TextInput, Button, SafeAreaView, Text } from 'react-native'
import React, { isValidElement, useState, useEffect } from 'react'
import StyleSach from './StyleSach';
import { myBodySach, newData } from './TableSach';
import short from 'short-uuid';
import { initializeApp } from 'firebase/app';
import {firebase} from '../config'
import firestore from '@react-native-firebase/firestore'
import {db} from '../config'
// Optionally import the services that you want to use
import "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-web';

const AddSach = (props) => {

  const [IDSach, setIdSach] = useState('')
  const [TenSach, setTenSach] = useState('')
  const [TacGia, setTacGia] = useState('')
  const [GiaTien, setGiaTien] = useState('')
  const [NXB, setNXB] = useState('')

  function addBook(){
    addDoc(collection(db, "books"), {
      TenSach,
      TacGia,
      GiaTien,
      NXB,
    }).then(() =>{
      console.log('data submit');
    }).catch((error)=>{
      console.log(error);
    });
  }


  const [data, setData] = useState({
    IDSach: '',
    TenSach: '',
    TacGia: '',
    GiaTien: '',
    NXB: '',
    Setting: ''
  })

  const onChangeTenSach= (value) =>{
    setTenSach(value)
  }
  const onChangeTacgia= (value) =>{    
    setTacGia(value)
  }
  const onChangeGiaTien= (value) =>{
    setGiaTien(value)
  }
  const onChangeNXB= (value) =>{
    setNXB(value)
  }
  const submitForm = () => {
    alert('Thêm sách thành công');
    console.log('data: ', props);
    props.listTemporary.push({ ...data, IDSach: short.generate() });
    // navigation && navigation.goBack();
  }

  return (

    <SafeAreaView style={{
      flex :1,
      width: '100%',
      height:'100%',
      minHeight: '100vh',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform:
        [{ translateX: '-50%' },
        { translateY: '-36%' }],
      backgroundColor: '#00000070'
    }}>
      <View
        style={{
          position: 'fixed', top: '50%',
          left: '50%',
          backgroundColor: 'white',
          transform: [{ translateX: '-50%' },
          { translateY: '-50%' }]
        }}
      >
        <View style={{height: 60, width:"100%", backgroundColor:'#353942',alignItems:'center',justifyContent:'center',}}>
          <Text style={StyleSach.HeaderAdd}>Thêm sách mới</Text>
        </View>
      
      <SafeAreaView style={StyleSach.body}>
            <View>
              <View style={StyleSach.Formgroup}>
                <Text style={StyleSach.AddSachText}> Tên sách</Text>
                <TextInput
                  style={StyleSach.inputSach}
                  onChangeText={(TenSach)=> onChangeTenSach(TenSach)}
                  value={TenSach}/>
              </View>
              <View style={StyleSach.Formgroup}>
                <Text style={StyleSach.AddSachText}> Tác giả</Text>
                <TextInput
                  style={StyleSach.inputSach}
                  onChangeText={(TacGia)=> onChangeTacgia(TacGia)}
                  value={TacGia} />
              </View>
              <View style={StyleSach.Formgroup}>
                <Text style={StyleSach.AddSachText}> Giá Tiền</Text>
                <TextInput
                  style={StyleSach.inputSach}
                  onChangeText={(GiaTien)=> onChangeGiaTien(GiaTien)}
                  value={GiaTien} />
              </View>
              <View style={StyleSach.Formgroup}>
                <Text style={StyleSach.AddSachText}> Nhà xuất bản </Text>
                <TextInput
                  style={StyleSach.inputSach}
                  onChangeText={(NXB)=> onChangeNXB(NXB)}
                  value={NXB} />
              </View>
          <View style={StyleSach.ButtonSubmit}>
          </View>
          <View style={{alignItems: "center", justifyContent: "center",}}> 
            <TouchableOpacity style={{height: 40, width:240, borderRadius:10, backgroundColor:'#353942',alignItems:'center',justifyContent:'center', marginVertical:10,}}
                                      onPress={() => {
                                        props.setIsOpen(false);
                                        submitForm();
                                        addBook() // nhập từ form 
                                        }}>
              <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height: 40, width:240, borderRadius:10, backgroundColor:'#353942',alignItems:'center',justifyContent:'center', marginVertical:10,}} 
                                      onPress={() => {
                                        props.setIsOpen(false);}}>
              <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}} >Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      </View>
    </SafeAreaView>
  )
}


export default AddSach;

