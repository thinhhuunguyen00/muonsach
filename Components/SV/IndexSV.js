import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import StyleSach from '../Sach/StyleSach';
import { SafeAreaView } from 'react-native-web';
import TableSV,{myBodySV} from './TableSV';
import StyleSV from './StyleSV';
import short from 'short-uuid';
import {firebase} from '../config'


const IndexSV = ({navigation}) => {

  const [data, setData] = useState({
    IDSV: '',
    TenSV: '',
    MSSV: '',
    SDT: '',
    DiaChi: '',
    Setting: ''
  })
  const [listTemporarySV, setListTemporarySV] = useState([]);
  const [myBodySV, setMyBodySV] = useState([]);
  const [valueSearchSV, setValueSearchSV] = useState("");
  const [isOpenSV, setIsOpenSV] = useState(false);
  
  const [currentPageSV, setCurrentPageSV] = useState(1);
  const [newsPerPageSV, setNewsPerPageSV] = useState(5);
  const pageNumbersSV = () => {
    const data = [];
    for (let i = 1; i <= Math.ceil(myBodySV.length / newsPerPageSV); i++) {
      data.push(i);
    }
    return data;
  }

  const todoRef = firebase.firestore().collection('sinhvien')

  const renderTodosSV = () => {
    const sinhvien =[];
    const indexOfLastNews = currentPageSV * newsPerPageSV;
    const indexOfFirstNews = indexOfLastNews - newsPerPageSV;
    todoRef
      .onSnapshot(
          querySnapshot =>{
              querySnapshot.forEach((doc)=>{
                  const {TenSV,MSSV,SDT, DiaChi} =doc.data()
                  sinhvien.push({
                    IDSV:doc.id,
                    TenSV,
                    MSSV,
                    SDT,
                    DiaChi,
                  })
              })
              setMyBodySV(sinhvien);
              const currentTodos = sinhvien.slice(indexOfFirstNews, indexOfLastNews);
              setListTemporarySV(currentTodos);
          }
      )
    // return currentTodos?.map((todo, index) => console.log(todo));
    // return <TableSach listTemporary={currentTodos} />;

  };
  // const renderTodosSV = () => {
  //   const indexOfLastNews = currentPageSV * newsPerPageSV;
  //   const indexOfFirstNews = indexOfLastNews - newsPerPageSV;
  //   const currentTodos = myBodySV.slice(indexOfFirstNews, indexOfLastNews);
  //   console.log(currentTodos);
  //   setListTemporarySV(currentTodos);
  // };
  useEffect(() => {
    renderTodosSV();
    console.log(listTemporarySV);
  }, [currentPageSV])

  const choosePageSV = (value) => {
    console.log(value);
    setCurrentPageSV(value);
  };

  useEffect(() => {
    console.log(valueSearchSV);
    myFilterData();
  }, [valueSearchSV]);

  const setValue = (value) => {
    console.log('search: ', value);
    setValueSearchSV(value);
  };

  const myFilterData = () => {
    const listSearchSV = listTemporarySV?.filter((item) =>
      item.TenSV.includes(valueSearchSV)
    );
    console.log("listSearchSV: ", listSearchSV);
    valueSearchSV.length > 0
      ? setListTemporarySV([...listSearchSV])
      : renderTodosSV();
  };
  const handleDeleteSV = (id) => {
    const newListSV = listTemporarySV?.filter((item) => item.IDSV !== id);
    console.log('newListSV: ', newListSV)
    setListTemporarySV([...newListSV]);
  };
  
  return (
    <SafeAreaView style={StyleSV.container}>
      <View style={StyleSV.container}>        
        <View style={StyleSV.top}>
          <Text style={StyleSV.header}> Sinh viên</Text>
          <TextInput
            placeholder='Search'
            style={StyleSV.input}
            onChangeText={(value) => setValue(value)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsOpenSV(!isOpenSV);
              // navigation && navigation.navigate('AddSv');
              console.log('navigation: ', navigation);
            }}>
            <View style={StyleSV.icon}>
              <Text style={StyleSV.addIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TableSV listTemporarySV={listTemporarySV} handleDeleteSV={handleDeleteSV} isOpenSV={isOpenSV} setIsOpenSV={setIsOpenSV}/>
      <View style={{flexDirection:'row', justifyContent:'flex-end', marginBottom:20, marginRight: 30, paddingRight:5}}>
        {pageNumbersSV()?.map((number) => {
          if (currentPageSV === number)
            return (
              <Text key={number} id={number} style={{backgroundColor: "#007bff", display:'flex', flexWrap:'wrap',
              color: "#fff",fontSize: 20 ,marginLeft:10 ,paddingHorizontal:7.5, paddingVertical :5,justifyContent:'center'}}>
                {number}
              </Text>
            );
          else
            return (
              <Text key={number} style={{fontSize: 20, marginLeft:10, borderWidth:1, borderColor:'#dee2e6',paddingHorizontal:7.5, paddingVertical :5}}onPress={() => choosePageSV(number)}>
                {number}
              </Text>
            );
        })}
        
      </View>
      {/* <View>{renderTodosSV()}</View>       */}
      
    </SafeAreaView>
      )
}


export default IndexSV;
