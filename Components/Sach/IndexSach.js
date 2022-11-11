import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import StyleSach  from './StyleSach';
import TableSach from './TableSach';
import { SafeAreaView } from 'react-native-web';
import {firebase} from '../config'
// import firestore from '@react-native-firebase/firestore';
import { firestore } from 'firebase/firestore';
import { updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../config';
import EditSach from './EditSach';
// Optionally import the services that you want to use


const IndexSach = ({navigation}) => {

  const [listTemporary, setListTemporary] = useState([]);
  const [myBodySach, setMyBodySach] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    IDSach: '',
    TenSach: '',
    TacGia: '',
    GiaTien:'',
    NXB: ''
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(5);
  const pageNumbers = () => {
    const data = [];
    for (let i = 1; i <= Math.ceil(myBodySach.length / newsPerPage); i++) {
      data.push(i);
    }
    return data;
  }

  const todoRef = firebase.firestore().collection('books')

  const renderTodos = () => {
    const books =[];
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    todoRef
      .onSnapshot(
          querySnapshot =>{
              querySnapshot.forEach((doc)=>{
                  const {TenSach,TacGia,GiaTien, NXB} =doc.data()
                  books.push({
                    IDSach:doc.id,
                    TenSach,
                    TacGia,
                    GiaTien,
                    NXB,
                  })
              })
              setMyBodySach(books);
              const currentTodos = books.slice(indexOfFirstNews, indexOfLastNews);
              setListTemporary(currentTodos);
          }
      )
  };

  useEffect(() => {
    renderTodos();
  }, [currentPage]);

  const choosePage = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  useEffect(() => {
    console.log(valueSearch);
    myFilterData();
    myFilterData1();
  }, [valueSearch]);

  const setValue = (value) => {
    console.log('search: ', value);
    setValueSearch(value);
  };

  const myFilterData = () => {
    const listSearch = listTemporary?.filter((item) =>
      item.TenSach.includes(valueSearch),
    );
    console.log("listSearch: ", listSearch);
    valueSearch.length > 0
      ? setListTemporary([...listSearch])
      : renderTodos();
  };
  const myFilterData1 = () => {
    const listSearch = listTemporary?.filter((item) =>
    item.TacGia.includes(valueSearch)
    );
    console.log("listSearch: ", listSearch);
    valueSearch.length > 0
      ? setListTemporary([...listSearch])
      : renderTodos();
  };
  const handleDelete = (id) => {
    deleteDoc(doc(db, "books", id)).then(() =>{
      console.log('data update');
      const books =[];
      const indexOfLastNews = currentPage * newsPerPage;
      const indexOfFirstNews = indexOfLastNews - newsPerPage;
      todoRef
        .onSnapshot(
            querySnapshot =>{
                querySnapshot.forEach((doc)=>{
                    const {TenSach,TacGia,GiaTien, NXB} =doc.data()
                    books.push({
                      IDSach:doc.id,
                      TenSach,
                      TacGia,
                      GiaTien,
                      NXB,
                    })
                });
                setMyBodySach(books);
                const currentTodos = books.slice(indexOfFirstNews, indexOfLastNews);
                setListTemporary(currentTodos);
            }
        )
    }).catch((error)=>{
      console.log(error);
    });
  };
  

  const handleUpdate = (id) => {
    updateDoc(doc(db, "books",id ), {
      TenSach: data.TenSach,
      TacGia: data.TacGia,
      GiaTien: data.GiaTien,
      NXB: data.NXB,
    }).then(() =>{
      console.log('data update');
      const books =[];
      const indexOfLastNews = currentPage * newsPerPage;
      const indexOfFirstNews = indexOfLastNews - newsPerPage;
      todoRef
        .onSnapshot(
            querySnapshot =>{
                querySnapshot.forEach((doc)=>{
                    const {TenSach,TacGia,GiaTien, NXB} =doc.data()
                    books.push({
                      IDSach:doc.id,
                      TenSach,
                      TacGia,
                      GiaTien,
                      NXB,
                    })
                });
                setMyBodySach(books);
                const currentTodos = books.slice(indexOfFirstNews, indexOfLastNews);
                setListTemporary(currentTodos);
            }
        )
    }).catch((error)=>{
      console.log(error);
    });
  };
  
  
  return (
    <SafeAreaView style={StyleSach.container}>
      <View style={StyleSach.container}>        
        <View style={StyleSach.top}>
          <Text style={StyleSach.header}> Sách</Text>
          <TextInput
            placeholder='Search'
            style={StyleSach.input}
            onChangeText={(value) => setValue(value)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(!isOpen);
              // navigation && navigation.navigate('AddSach');
              console.log('navigation: ', navigation);
            }}>
            <View style={StyleSach.icon}>
              <Text style={StyleSach.addIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TableSach 
        listTemporary={listTemporary} 
        setListTemporary={setListTemporary} 
        handleDelete={handleDelete} 
        handleUpdate={handleUpdate} 
        data={data} 
        setData={setData} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}/>
      </View>
      <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:20, marginRight: 30, paddingRight:5}}>
        {pageNumbers()?.map((number) => {
          if (currentPage === number)
            return (
              <Text key={number} id={number} style={{backgroundColor: "#007bff", display:'flex', flexWrap:'wrap',
              color: "#fff",fontSize: 20 ,marginLeft:10 ,paddingHorizontal:7.5, paddingVertical :5,justifyContent:'center'}}>
                {number}
              </Text>
            );
          else
            return (
              <Text key={number} style={{fontSize: 20, marginLeft:10, borderWidth:1, borderColor:'#dee2e6',paddingHorizontal:7.5, paddingVertical :5}}onPress={() => choosePage(number)}>
                {number}
              </Text>
            );
        })}
        
      </View>
      
    </SafeAreaView>
      )
}

export default IndexSach;