import { StyleSheet } from 'react-native';

const StyleSach = StyleSheet.create({
  container: {
  flex:1
  }, 
  top:{
    flexDirection :'row',
    width: '100%',
    justifyContent: "space-around",
    alignItems : "top",
    paddingHorizontal : 5,
    marginBottom :10,
    
  },
  header:{
    color : 'black',
    fontSize : 35,
    marginTop : 15,
    marginLeft :-88
  },
  input:{
    backgroundColor : 'white',
    height : 35,
    width : '35%',
    borderRadius: 20,
    borderWidth:1,
    marginTop : 15,
    marginLeft : 35,
    paddingHorizontal :15,
  },
  icon:{
    width : 35,
    height: 35,
    borderRadius:35,
    backgroundColor: 'black',    
    justifyContent:'center',
    alignItems :'center',
    borderRadius:35,
    marginTop : 15,
  },
  addIcon:{
    color :'white',
    fontSize : 35,
    marginTop : -6,
  },
  HeaderAdd:{
    fontSize:24, 
    fontWeight :'400', 
    color:'#fff'
  },
  body:{
    flex :1,
  },
  inputSach:{
    backgroundColor : 'white',
    borderRadius: 7,
    borderWidth:1,
    marginTop : 15,
    marginHorizontal : 45,
    paddingHorizontal :15,
    fontSize : 22,
    
  },
  AddSachText:{
    color :'black',
    fontSize: 20,
    marginTop : 10,
    marginHorizontal :18
  },
  ButtonSubmit:{
    justifyContent : 'center',
    alignItems:  'center',
    marginTop :10,
    borderRadius :30,
    marginBottom :5,
  },
  ButtonBack:{
    marginTop :10,
    borderRadius :30,
    marginRight:50,
    alignItems :'flex-end'
  },
  Home:{
    flex:1,
    backgroundColor:'#CCFFFF',
    
  },
  TopHome:{
    
  },
  HomeImage:{ 
    width: 200,
    height: 200,
    

  },
  HomeButton:{
    alignItems : "stretch",
   
  },
 });

export default StyleSach;