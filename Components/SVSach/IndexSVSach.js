import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React ,{ useEffect, useState } from 'react';
import StyleSVSach  from './StyleSVSach';
import { SafeAreaView } from 'react-native-web';
import TableSVSach from './TableSVSach';


const IndexSVSach = ({navigation}) => {
  const [listTemporarySVSach, setListTemporarySVSach] = useState([]);
  
  const [myBodySVSach, setMyBodySVSach] = useState([]);
  const [valueSearchSVSach, setValueSearchSVSach] = useState("");
  const [isOpenSVSach, setIsOpenSVSach] = useState(false);
  
  const [listSVSach, setListSVSach] = useState([]);
  const [currentPageSVSach, setCurrentPageSVSach] = useState(1);
  const [newsPerPageSVSach, setNewsPerPageSVSach] = useState(5);
  const pageNumbersSVSach = () => {
    const data = [];
    for (let i = 1; i <= Math.ceil(myBodySVSach.length / newsPerPageSVSach); i++) {
      data.push(i);
    }
    return data;
  };

  // const todoRef = firebase.firestore().collection('sinhviensach')

  // const renderTodos = () => {
  //   const sinhviensach =[];
  //   const indexOfLastNews = currentPage * newsPerPage;
  //   const indexOfFirstNews = indexOfLastNews - newsPerPage;
  //   todoRef
  //     .onSnapshot(
  //         querySnapshot =>{
  //             querySnapshot.forEach((doc)=>{
  //                 const {TenSach,MSSV, Ngaymuon, Ngaytra,} =doc.data()
  //                 books.push({
  //                   ID:doc.id,
  //                   TenSach,
  //                   MSSV,
  //                   Ngaymuon,
  //                   Ngaytra,
  //                 })
  //             })
  //             setMyBodySVSach(sinhviensach);
  //             const currentTodos = books.slice(indexOfFirstNews, indexOfLastNews);
  //             setListTemporary(currentTodos);
  //         }
  //     )
  // };

  // useEffect(() => {
  //   setListSVSach([...myBodySVSach]);
  // }, []);

  const renderTodosSVSach = () => {
    const indexOfLastNews = currentPageSVSach * newsPerPageSVSach;
    const indexOfFirstNews = indexOfLastNews - newsPerPageSVSach;
    const currentTodos = myBodySVSach.slice(indexOfFirstNews, indexOfLastNews);
    console.log(currentTodos);
    // return currentTodos?.map((todo, index) => console.log(todo));
    // return <TableSVSach data={currentTodos} />;
    setListTemporarySVSach(currentTodos);
  };

  const choosePageSVSach = (value) => {
    console.log(value);
    setCurrentPageSVSach(value);
  };


  // useEffect(() => {
  //   setListTemporarySVSach([...myBodySVSach]);
  // }, [myBodySVSach]);

  useEffect(() => {
    console.log(valueSearchSVSach);
    myFilterData();
  }, [valueSearchSVSach]);

  const setValue = (value) => {
    console.log('search: ', value);
    setValueSearchSVSach(value);
  };

  const myFilterData = () => {
    const listSearchSVSach = listTemporarySVSach?.filter((item) =>
      item.Ngaymuon.includes(valueSearchSVSach)
    );
    console.log("listSearchSVSach: ", listSearchSVSach);
    valueSearchSVSach.length > 0
      ? setListTemporarySVSach([...listSearchSVSach])
      : renderTodosSVSach();
  };
  const handleDeleteSVSach = (id) => {
    const newListSVSach = listTemporarySVSach?.filter((item) => item.ID !== id);
    console.log('newListSVSach: ', newListSVSach)
    setListTemporarySVSach([...newListSVSach]);
  };
  
  return (
    <SafeAreaView style={StyleSVSach.container}>
      <View style={StyleSVSach.container}>        
        <View style={StyleSVSach.top}>
          <Text style={StyleSVSach.header}>Danh sách mượn</Text>
          <TextInput
            placeholder='Search'
            style={StyleSVSach.input}
            onChangeText={(value) => setValue(value)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsOpenSVSach(!isOpenSVSach);
              // navigation && navigation.navigate('AddSVSach');
              console.log('navigation: ', navigation);
            }}>
            <View style={StyleSVSach.icon}>
              <Text style={StyleSVSach.addIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TableSVSach listTemporarySVSach={listTemporarySVSach} setMyBodySVSach={setMyBodySVSach} handleDeleteSVSach={handleDeleteSVSach} isOpenSVSach={isOpenSVSach} setIsOpenSVSach={setIsOpenSVSach}/>

      <View style={{flexDirection:'row', justifyContent:'flex-end', marginBottom:20, marginRight: 30, paddingRight:5}}>
        {pageNumbersSVSach()?.map((number) => {
          if (currentPageSVSach === number)
            return (
              <Text key={number} id={number} style={{backgroundColor: "#007bff", display:'flex', flexWrap:'wrap',
              color: "#fff",fontSize: 20 ,marginLeft:10 ,paddingHorizontal:7.5, paddingVertical :5,justifyContent:'center'}}>
                {number}
              </Text>
            );
          else
            return (
              <Text key={number} style={{fontSize: 20, marginLeft:10, borderWidth:1, borderColor:'#dee2e6',paddingHorizontal:7.5, paddingVertical :5}}onPress={() => choosePageSVSach(number)}>
                {number}
              </Text>
            );
        })}
        
      </View>
      {/* <View>{renderTodosSVSach()}</View>       */}
    </SafeAreaView>
      )
}
export default IndexSVSach;