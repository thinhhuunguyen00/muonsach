import {Text , View, TextInput, Button, SafeAreaView ,TouchableOpacity} from 'react-native'
import React,{ useState } from 'react'
import StyleSV  from './StyleSV';
import TableSV from './TableSV';
import Mapgg from '../../Mapgg';
import short from 'short-uuid';

import {db} from '../config'
import "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';

const AddSV = (props) => {

  const [IDSV, setIDSV] = useState('')
  const [TenSV, setTenSV] = useState('')
  const [MSSV, setMSSV] = useState('')
  const [SDT, setSDT] = useState('')
  const [DiaChi, setDiaChi] = useState('')

  function addSinhVien(){
    addDoc(collection(db, "sinhvien"), {
      TenSV:TenSV,
      MSSV: MSSV,
      SDT: SDT,
      DiaChi: DiaChi,
    }).then(() =>{
      console.log('data submit');
    }).catch((error)=>{
      console.log(error);
    });;
  }

  
  const [ data, setData] =useState({
    IDSV: '',
    TenSV: '',
    MSSV: '',
    SDT: '',
    DiaChi: '',
    Setting:''
  })

  // const handleChange = (value, id) => {
  //   setData({
  //     ...data,
  //     [id]: value
  //   });
  // }
  const onChangeTenSV= (value) =>{
    setTenSV(value)
  }
  const onChangeMSSV= (value) =>{    
    setMSSV(value)
  }
  const onChangeSDT= (value) =>{
    setSDT(value)
  }
  const onChangeDiaChi= (value) =>{
    setDiaChi(value)
  }
  const submitForm = () => {
    // alert('thanhcong');
    console.log('data: ', props);
    props.listTemporarySV.push({...data, IDSV: short.generate()});
    // navigation && navigation.goBack();
  }
  return (
    <SafeAreaView style={{
      width: '100%',
      minHeight: '100vh',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform:
        [{ translateX: '-50%' },
        { translateY: '-40%' }],
      backgroundColor: '#00000070'
    }}>
      <View
        style={{
          position: 'fixed', top: '50%',
          left: '50%',
          backgroundColor: 'white',
          transform: [{ translateX: '-50%' },
          { translateY: '-50%' }]
        }}>
      <View style={{height: 60, width:"100%", backgroundColor:'#353942',alignItems:'center',justifyContent:'center',}}>
          <Text style={StyleSV.HeaderAdd}>Thêm sinh viên mới</Text>
        </View>
      <SafeAreaView style={StyleSV.body}>
        <Text style={StyleSV.AddSVText}> Tên sinh viên</Text>               
        <TextInput 
        style={StyleSV.inputSV}
        onChangeText={(TenSV)=> onChangeTenSV(TenSV)}
        value={TenSV} />
        <Text style={StyleSV.AddSVText}> MSSV</Text>
        <TextInput style={StyleSV.inputSV} 
        onChangeText={(MSSV)=> onChangeMSSV(MSSV)}
        value={MSSV} />
        <Text style={StyleSV.AddSVText}> SĐT</Text>
        <TextInput style={StyleSV.inputSV} 
        onChangeText={(SDT)=> onChangeSDT(SDT)}
        value={SDT} />
        <Text style={StyleSV.AddSVText}> Địa chỉ</Text>
        <TextInput style={StyleSV.inputSV} 
        onChangeText={(DiaChi)=> onChangeDiaChi(DiaChi)}
        value={DiaChi}/>
          <View style={{alignItems: "center", justifyContent: "center",}}> 
            <TouchableOpacity style={{height: 40, width:240, borderRadius:10, backgroundColor:'#353942',alignItems:'center',justifyContent:'center', marginVertical:10,}}
                                      onPress={() => {
                                        props.setIsOpenSV(false);
                                        submitForm();
                                        addSinhVien() // nhập từ form 
                                        }}>
              <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height: 40, width:240, borderRadius:10, backgroundColor:'#353942',alignItems:'center',justifyContent:'center', marginVertical:10,}} 
                                      onPress={() => {
                                        props.setIsOpenSV(false);}}>
              <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}} >Hủy</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
      </View>
      </SafeAreaView>
  )
}


export default AddSV;