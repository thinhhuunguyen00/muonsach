import { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView} from 'react-native';
import { Table, Row, Rows } from "react-native-table-component"
import short from "short-uuid";
import StyleSVSach from "./StyleSVSach";
import AddSVSach from "./AddSVSach";
import {firebase} from '../config'
import firestore from '@react-native-firebase/firestore';
import { updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../config';


const TableSVSach = (props) => {
  const {listTemporarySVSach, isOpenSVSach} = props;
  const [listSv, setListSv] = useState([]);
  const [listSVBorrow, setListSVBorrow] = useState([]);
  const [listBookBorrow, setListBookBorrow] = useState([]);
  // const [ data, setData] =useState({
  //   ID: '',
  //   IDSach: '',
  //   IDSV: '',
  //   Ngaymuon: '',
  //   Ngaytra: '',
  //   Setting:''
  // })
  const todoSVRef = firebase.firestore().collection('sinhvien');
  const todoSVBookRef = firebase.firestore().collection('sinhviensach');

    useEffect(() => {
      const listSV =[];
      todoSVRef
        .onSnapshot(
            querySnapshot =>{
                querySnapshot.forEach((doc)=>{
                    const {DiaChi,MSSV,SDT, TenSV} =doc.data()
                    listSV.push({
                      ID:doc.id,
                      DiaChi,
                      MSSV,
                      SDT,
                      TenSV,
                    })
                })
                setListSv(listSV);
            }
        )
    }, []);

    useEffect(() => {
      const listSVBorrow =[];
      todoSVBookRef
        .onSnapshot(
            querySnapshot =>{
                querySnapshot.forEach((doc)=>{
                  const {TenSach,MSSV, Ngaymuon, Ngaytra,} =doc.data();
                    listSVBorrow.push({
                      ID:doc.id,
                      TenSach,
                      MSSV,
                      Ngaymuon,
                      Ngaytra,
                    })
                })
                setListSVBorrow(listSVBorrow);
            }
        )
    }, []);

    useEffect(() => {
      const data = listSVBorrow?.map(({ID,TenSach,MSSV, Ngaymuon, Ngaytra}) => ({
        ID,
        TenSach,
        TenSV: listSv?.find((item) => item.MSSV === MSSV)?.TenSV ?? '',
        Ngaymuon,
        Ngaytra,
      }));
      setListBookBorrow(data);
      console.log(data)
      props.setMyBodySVSach(data);
    }, [listSv, listSVBorrow]);
  

    return (
      <SafeAreaView>
        <Table >
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
              <td style={{paddingLeft: 10 ,margin: 20, }}>Sinh viên</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Ngày mượn</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Ngày trả</td>
              <td style={{paddingLeft: 10 ,margin: 20, }}>Setting</td>
            </tr>
            {listBookBorrow?.map(({ ID, TenSV, TenSach, Ngaymuon, Ngaytra }, index) => {

              
              var date = new Date(Ngaymuon.seconds *1000);
              var options = {
                      year: 'numeric', month: 'numeric', day: 'numeric',
                  };
              
              var result = date.toLocaleDateString('en', options);
              

              var date = new Date(Ngaytra.seconds *1000);
              var options = {
                      year: 'numeric', month: 'numeric', day: 'numeric',
                  };
              
              var result1 = date.toLocaleDateString('en', options);
              

              return(
              <tr style={{height: 50,backgroundColor:'#EEEEEE'}} key={index}>
                <td style={{ paddingLeft: 10  }}>{TenSach}</td>
                <td style={{ paddingLeft: 10 }}>{TenSV}</td>
                <td style={{ paddingLeft: 10  }}>{result}</td>
                <td style={{ paddingLeft: 10  }}>{result1}</td>
                <td>
                  <button onClick={() => props.handleDeleteSVSach(ID)} style={{ marginLeft: 10, backgroundColor: '	#FF0000', color: 'white' }}>Xóa</button>
                </td>
              </tr>
            )})}
            {console.log('table: ', listTemporarySVSach)}
          </table>
        </Table>
        <SafeAreaView style={StyleSVSach.container}>
        
      {isOpenSVSach && <AddSVSach listTemporarySVSach={listTemporarySVSach} setIsOpenSVSach={props.setIsOpenSVSach}/>}
    </SafeAreaView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
    paddingVertical :25,
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#FFCC00', 
  },
  TableText: { 
    margin: 10,
  },
});

export default TableSVSach;