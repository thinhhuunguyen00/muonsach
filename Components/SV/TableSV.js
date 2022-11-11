import React, { useState } from "react"
import { StyleSheet,SafeAreaView, TouchableOpacity} from 'react-native';
import { Table, Row} from "react-native-table-component"
import AddSV from "./AddSV";
import short from 'short-uuid';
import StyleSV from "./StyleSV";
import { View } from "react-native-web";
import { Modal, Portal, Text, Button, Provider, TextInput,  } from 'react-native-paper';


import { updateDoc, doc } from 'firebase/firestore';
import {db} from '../config';

export const myBodySV =[{
  IDSV: short.generate(),
  TenSV: 'AAAAA',
  MSSV: 123,
  SDT: 'a',
  DiaChi: 'TG1',
  Setting: ''
},

  {
    IDSV: short.generate(),
    TenSV: 'B',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  },
  {
    IDSV: short.generate(),
    TenSV: 'C',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  }, {
    IDSV: short.generate(),
    TenSV: 'D',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  }, {
    IDSV: short.generate(),
    TenSV: 'E',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  }, {
    IDSV: short.generate(),
    TenSV: 'F',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  }, {
    IDSV: short.generate(),
    TenSV: 'G',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  }, {
    IDSV: short.generate(),
    TenSV: 'H',
    MSSV: 1000,
    SDT: 'a',
    DiaChi: 'TG1',
    Setting: ''
  },
]

const TableSV = (props) => {

  const {listTemporarySV, isOpenSV} = props;
  const [visible, setVisible] = React.useState(false);

  const showModal = (id) => {setVisible(true); setIDSV(id)};
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [IDSV, setIDSV] = useState('')
  const [TenSV, setTenSV] = useState('')
  const [MSSV, setMSSV] = useState('')
  const [SDT, setSDT] = useState('')
  const [DiaChi, setDiaChi] = useState('')


  const [ data, setData] =useState({
    IDSV: '',
    TenSV: '',
    MSSV: '',
    SDT: '',
    DiaChi: '',
    Setting:''
  })
  const HeadTable= [
            'ID sinh viên',
            'Tên sinh viên',
            'MSSV',
            'SĐT',
            'Địa chỉ',
            'Setting']

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
  const handleUpdate = (id) => {
    updateDoc(doc(db, "sinhvien",id ), {
      TenSV:TenSV,
      NSSV:MSSV,
      SDT: SDT,
      DiaChi:DiaChi,
    }).then(() =>{
      console.log('data update');
    }).catch((error)=>{
      console.log(error);
    });;
  };
    return (
      <Provider>
      <Portal style={{flex:1}}>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={styles.container}>
            <View>
              <View >
                <Text style={{fontSize:30, fontWeight :'400', color:'black'}}>Sửa thông tin sinh viên</Text>
              </View>
                  <SafeAreaView style={styles.login}>
                  <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Tên sinh viên</Text>
                      <TextInput style={styles.input} onChangeText={(TenSV)=> onChangeTenSV(TenSV)} value={TenSV}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Mã số sinh viên</Text>
                      <TextInput style={styles.input} onChangeText={(MSSV)=> onChangeMSSV(MSSV)} value={MSSV}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Số điện thoại</Text>
                      <TextInput style={styles.input} onChangeText={(SDT)=> onChangeSDT(SDT)} value={SDT}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Địa chỉ</Text>
                      <TextInput style={styles.input} onChangeText={(DiaChi)=> onChangeDiaChi(DiaChi)} value={DiaChi}></TextInput>
                    </View>
                    <View > 
                      <TouchableOpacity style={styles.button} onPress={() => {hideModal();                         
                                                  handleUpdate(IDSV);
                                                  }}>
                        <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}}>Lưu thông tin</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {hideModal();}}>
                        <Text  style={{ fontSize:17, fontWeight :'400', color:'#fff'}} >Hủy</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </SafeAreaView>
      </View>
          </Modal>
        </Portal>
    <SafeAreaView>
        <Table >
          <View>
          <table>
        <tr style={{
              height: 50,
              margin: 10,
              alignContent: "center",
              backgroundColor: '#ffe0f0',
              fontWeight: 'bold',
              fontSize:18
              
            }}>
              <td style={{paddingLeft: 10,margin: 20,  }}>Tên sinh viên</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>MSSV</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>SĐT</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Địa chỉ</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Setting</td>
            </tr>
          {listTemporarySV && listTemporarySV?.map(({ IDSV, TenSV, MSSV, SDT, DiaChi }, index) => (
              <tr style={{height: 50,backgroundColor:'#EEEEEE'}} key={index}>
                <td style={{ paddingLeft: 10  }}>{TenSV}</td>
                <td style={{ paddingLeft: 10 }}>{MSSV}</td>
                <td style={{ paddingLeft: 10  }}>{SDT}</td>
                <td style={{ paddingLeft: 10  }}>{DiaChi}</td>
                <td>
                  <button onClick={() => showModal(IDSV)} style={{  marginLeft: 10, backgroundColor: '	#CCCC99', color: 'black' }}>Edit</button>
                  <button onClick={() => props.handleDeleteSV(IDSV)} style={{ marginLeft: 10, backgroundColor: '	#FF0000', color: 'white' }}>Delete</button>
                </td>
              </tr>))}
              {console.log('table: ', listTemporarySV)}
              </table>
              </View>
        </Table>
        <SafeAreaView style={StyleSV.container}>
           {isOpenSV && <AddSV listTemporarySV={listTemporarySV} setIsOpenSV={props.setIsOpenSV} />}
        </SafeAreaView>
      </SafeAreaView>
      </Provider>
    )
}


export default TableSV;

const styles = StyleSheet.create({
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0',
    fontWeight : 'bold',
  },
  TableText: { 
    margin: 10,
  },
    container: {
      flex: 1,
      backgroundColor: "White",
      alignItems: "center",
      justifyContent: "center",
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
   
    input:{
      width:250,
      height:40,
      borderColor:'black',
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
      backgroundColor:'#353942',
      alignItems:'center',
      justifyContent:'center',
      marginVertical:10,
    }
  


});
