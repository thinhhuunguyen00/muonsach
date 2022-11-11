import React ,{ useState, useEffect } from "react";
import { StyleSheet , SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import { Table, Row, Cell,TableWrapper} from "react-native-table-component"
import short from 'short-uuid';
import StyleSach from './StyleSach';
import AddSach from "./AddSach";
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';


import { updateDoc, collection, doc } from 'firebase/firestore';
import {db} from '../config';
import {firebase} from '../config'
import firestore from '@react-native-firebase/firestore';

 export const myBodySach = [
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG1',
    GiaTien: 1000,
    NXB: 'a',
    Setting:''  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG2',
    GiaTien: 1000,
    NXB: 'b',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach3',
    TacGia: 'TG3',
    GiaTien: 1000,
    NXB: 'c',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG1',
    GiaTien: 1000,
    NXB: 'a',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG2',
    GiaTien: 1000,
    NXB: 'b',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach3',
    TacGia: 'TG3',
    GiaTien: 1000,
    NXB: 'c',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG1',
    GiaTien: 1000,
    NXB: 'a',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG2',
    GiaTien: 1000,
    NXB: 'b',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach3',
    TacGia: 'TG3',
    GiaTien: 1000,
    NXB: 'c',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG1',
    GiaTien: 1000,
    NXB: 'a',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach1',
    TacGia: 'TG2',
    GiaTien: 1000,
    NXB: 'b',
    Setting:''
  },
  {
    IDSach: short.generate(),
    TenSach: 'sach3',
    TacGia: 'TG3',
    GiaTien: 1000,
    NXB: 'c',
    Setting:''
  },
  
]

const TableSach = (props) => {
  
  const {listTemporary, isOpen, data, setData, handleUpdate} = props;

  const [visible, setVisible] = React.useState(false);

  const showModal = (id) => {
    setVisible(true); 
    setData((data) => ({
      ...data,
      IDSach: id
    }));
    const book = listTemporary.find(({IDSach}) => IDSach === id);
    setData(book);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const onChangeTenSach= (value) =>{
    setData((data) => ({
      ...data,
      TenSach: value
    }));
  }
  const onChangeTacgia= (value) =>{    
    setData((data) => ({
      ...data,
      TacGia: value
    }));
  }
  const onChangeGiaTien= (value) =>{
    setData((data) => ({
      ...data,
      GiaTien: value
    }));
  }
  const onChangeNXB= (value) =>{
    setData((data) => ({
      ...data,
      NXB: value
    }));
  }
  // const submitForm = () => {
  //   alert('Thêm sách thành công');
  //   console.log('data: ', props);
  //   props.listTemporary.push({ ...data, IDSach: short.generate() });
  //   // navigation && navigation.goBack();
  // }
  const HeadTable = [
    'Tên sách',
    'Tác giả',
    'Giá tiền',
    'Nhà xuất bản',
    'Setting' ]

    return (
      <Provider>
      <Portal style={{flex:1}}>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={styles.container}>
            <View>
              <View >
                <Text style={{fontSize:30, fontWeight :'400', color:'black'}}>Sửa thông tin sách</Text>
              </View>
                  <SafeAreaView style={styles.login}>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Tên sách</Text>
                      <TextInput style={styles.input} onChangeText={(TenSach)=> onChangeTenSach(TenSach)} value={data.TenSach}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Tác giả</Text>
                      <TextInput style={styles.input} onChangeText={(TacGia)=> onChangeTacgia(TacGia)} value={data.TacGia}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Giá Tiền</Text>
                      <TextInput style={styles.input} onChangeText={(GiaTien)=> onChangeGiaTien(GiaTien)} value={data.GiaTien}></TextInput>
                    </View>
                    <View>
                      <Text style={{fontSize:17, fontWeight :'400', color:'black'}}>Nhà xuất bản</Text>
                      <TextInput style={styles.input} onChangeText={(NXB)=> onChangeNXB(NXB)} value={data.NXB}></TextInput>
                    </View>
                        <View > 
                          <TouchableOpacity style={styles.button} onPress={() => {hideModal();                         
                                                      handleUpdate(data.IDSach);
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
            <table >
            <tr style={{
              height: 50,
              margin: 10,
              alignContent: "center",
              backgroundColor: '#ffe0f0',
              fontWeight: 'bold',
              fontSize:18
              
            }}>
              
              <td style={{paddingLeft: 10,margin: 20,  }}>Tên sách</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Tác giả</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Giá tiền</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Nhà xuất bản</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Setting</td>
            </tr>
            {listTemporary && listTemporary?.map(({ IDSach, TenSach, TacGia, GiaTien, NXB }, index) => (
              <tr style={{ height: 50, backgroundColor: '#EEEEEE' }} key={index}>                
                <td style={{ paddingLeft: 10  }}>{TenSach}</td>
                <td style={{ paddingLeft: 10 }}>{TacGia}</td>
                <td style={{ paddingLeft: 10  }}>{GiaTien}</td>
                <td style={{ paddingLeft: 10  }}>{NXB}</td>
                <td>
                  {/* <button onClick={() => props.handleUpdate(IDSach)} style={{ marginLeft: 10, backgroundColor: '	#CCCC99', color: 'black' }} >Sửa</button> */}
                  <button onClick={() => showModal(IDSach)} style={{ marginLeft: 10, backgroundColor: '	#CCCC99', color: 'black' }} >Sửa</button>
                  <button onClick={() => props.handleDelete(IDSach)} style={{ marginLeft: 10, backgroundColor: '	#FF0000', color: 'white' }}>Xóa</button>
                </td>
              </tr>
            ))}
            {console.log('table: ', listTemporary)}
          </table>
          </View>
        </Table>
      <SafeAreaView style={StyleSach.container}>
        {isOpen && <AddSach listTemporary={listTemporary} setIsOpen={props.setIsOpen} />}
      </SafeAreaView>
    </SafeAreaView>
    </Provider>
  )
}

export default TableSach;

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