import { Text,View, TextInput, Button,TouchableOpacity } from 'react-native'
import React ,{ useEffect, useState }from 'react'
import StyleSVSach  from './StyleSVSach';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { select } from '@react-native-material/core';
import {firebase} from '../config'
import firestore from '@react-native-firebase/firestore';
import { updateDoc, collection, doc, deleteDoc, addDoc } from 'firebase/firestore';
import {db} from '../config';
import short from 'short-uuid';
import Select from "react-select";


const AddSVSach = (props) => {
  const [Ngaymuon, setNgaymuon] = useState('')
  const [Ngaytra, setNgaytra] = useState('')
  const [TenSach, setTenSach] = useState('')
  const [MSSV, setMSSV] = useState('')

  const [myBodySach, setMyBodySach] = useState([]);
  const [myBodySV, setMyBodySV] = useState([]);
  const styles = {
    container: (css, state) => ({ ...css, width: "100%" }),
    input: (css, state) => ({ ...css, color: state.selectProps.color})
  };
  const todoRef = firebase.firestore().collection('books');
  const todoRefSVSach = firebase.firestore().collection('sinhvien');
  const todoRefSV = firebase.firestore().collection('sinhviensach');

  useEffect(() => {
    const books =[];
    todoRef
      .onSnapshot(
          querySnapshot =>{
              querySnapshot.forEach((doc)=>{
                  const {TenSach,TacGia,GiaTien, NXB} =doc.data()
                  books.push({
                    value:doc.id,
                    label: TenSach,
                  })
              })
              setMyBodySach(books);
          }
      )
  }, []);
  useEffect(() => {
    const sinhvien =[];
    todoRefSVSach
      .onSnapshot(
          querySnapshot =>{
              querySnapshot.forEach((doc)=>{
                  const {MSSV} =doc.data()
                  sinhvien.push({
                    value:doc.id,
                    label: MSSV,
                  })
              })
              setMyBodySV(sinhvien);
          }
      )
  }, []);

  function addSVSach(){
    addDoc(collection(db, "sinhviensach"), {
      TenSach:data.TenSach,
      MSSV: data.MSSV,
      Ngaymuon: startDate,
      Ngaytra: startDate1
    }).then(() =>{
      console.log('data submit');
    }).catch((error)=>{
      console.log(error);
    });;
  }
  
  const [data, setData] =useState({
    ID: '',
    TenSach: '',
    MSSV: '',
    Ngaymuon: '',
    Ngaytra: '',
    Setting:''
  })

  const onChangeTenSach= (value) =>{
    setData((data) => ({
      ...data,
      TenSach: value.label
    }));
  }
  const onChangeMSSV= (value) =>{
    setData((data) => ({
      ...data,
      MSSV: value.label
    }));
    console.log(value.label)
  }
  
  
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  
  const handleChange = (value, id) => {
    if (id === "Ngaymuon")
      setStartDate(value);
    if (id === "Ngaytra")
      setStartDate1(value)

    if (id === "Ngaymuon" || id === "Ngaytra") {
      setData({...data, [id]: `${value.getDate()} / ${value.getMonth() + 1} / ${value.getFullYear()}`});
    }
    else
      setData({
        ...data,
        [id]: value
      });
  }
  
  const submitForm = () => {
    // alert('thanhcong');
    console.log('data: ', props);
    props.listTemporarySVSach.push({...data, ID: short.generate()});

    // navigation && navigation.goBack();
  }

  const [mode, setMode] = useState('date')
  const [show,setShow] = useState('')

  const showMode=(currentMode) =>{
    setShow(true)
    setMode(currentMode)
  }

  return (
    <View style={{
      width: '100%',
      minHeight: '100vh',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform:
        [{ translateX: '-50%' },
        { translateY: '-30%' }],
      backgroundColor: '#00000070'
    }}>
      <View style={{
        position: 'fixed', top: '50%',
        left: '50%',
        backgroundColor: 'white',
        transform: [{ translateX: '-50%' },
        { translateY: '-50%' }],
        width: '70%'
      }}>
        <View style={{height: 60, width:"100%", backgroundColor:'#353942',alignItems:'center',justifyContent:'center',}}>
          <Text style={StyleSVSach.HeaderAdd}>Thông tin mượn sách</Text>
        </View>
        <View style={StyleSVSach.body}>
        
        <View style={StyleSVSach.ButtonBack}> 
          <Button style={StyleSVSach.Back} title='Back' onPress={() => {
            props.setIsOpenSVSach(false);
          }}></Button>
        </View>
        
          <View style={{
        display: 'flex',
        flexDirection: 'column'
      }}>

      <View style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
        <View
          style={{marginLeft: 45, alignItems: 'flex-start', marginTop:15 }}>
        <Text style={StyleSVSach.AddSVSachText}>Ngày mượn</Text>
          <DatePicker 
            onPress={() => showMode('date1')}
            selected={startDate}
            onChange={(text)=> handleChange(text, 'Ngaymuon')}
          />
        </View>
        <View
          style={{ marginLeft: 45, alignItems: 'flex-start', marginTop: 15 }}>
        <Text style={StyleSVSach.AddSVSachText}>Ngày trả </Text>
          <DatePicker
            onPress={() => showMode('date2')}
            selected={startDate1}
            onChange={(text)=> handleChange(text, 'Ngaytra')}
          />
        </View>
      </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <View
            style={{marginLeft: 45, alignItems: 'flex-start', marginTop:15, marginRight:15 }}>
        <Text style={StyleSVSach.AddSVSachText}> Tên Sách</Text>
            <Select onChange={(TenSach)=> onChangeTenSach(TenSach)}  color="blue" options={myBodySach} styles={styles} />
          </View>
          <View
            style={{marginLeft: 45, alignItems: 'flex-start', marginTop:15, marginRight:15 }}>
          <Text style={StyleSVSach.AddSVSachText}> Mã số sinh viên </Text>
            <Select onChange={(MSSV)=> onChangeMSSV(MSSV)}  color="blue" options={myBodySV} styles={styles} />
          </View>
          
          <View style={StyleSVSach.ButtonSubmit}>
          <Button style={{height: 40,
                            width:240,
                            borderRadius:10,
                            backgroundColor:'#00CFEB90',
                            alignItems:'center',
                            justifyContent:'center',
                            marginVertical:10,}}
            onPress={() => {
              props.setIsOpenSVSach(false);
              addSVSach();
              submitForm();
              }} title='submid'>
          </Button>
        </View>
        </View>
        </View>
      </View>
    </View>
  )
}


export default AddSVSach;