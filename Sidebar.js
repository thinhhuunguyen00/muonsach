import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import home from './assets/home.png';
import SV from './assets/SV.png';
import SVSach from './assets/SVSach.png';
import HomeL from './assets/HomeL.png'
import AdminLTELogo from'./assets/AdminLTELogo.png';
import library from './assets/library.png'
import menu from './assets/menu.png';
import close from './assets/close.png';
import IndexSach from './Components/Sach/IndexSach';
import IndexSV  from './Components/SV/IndexSV'
import IndexSVSach from './Components/SVSach/IndexSVSach';
import Home from './Components/Home';


const Sidebar = ({navigation}) => {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  console.log('1: ', navigation)

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
        <Image source={AdminLTELogo} style={{
          width: 45,
          height: 45,
          borderRadius: 10,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          margin: 10,
          marginTop:18
        }}>AdminLTE</Text>
          </View>    
          <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          margin: 10,
          marginTop: 50
        }}>THƯ VIỆN</Text>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }
          {TabButton (currentTab, setCurrentTab, "Kho Sách", home)}
          {TabButton(currentTab, setCurrentTab, "Danh sách SV", SV)}
          {TabButton(currentTab, setCurrentTab, "Danh sách mượn", SVSach)}
        </View>
      </View>

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 1,

        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
          
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {

            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 1,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 200,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -15 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 30,
              height: 30,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>
            <Text style={{
              fontSize: 35,
              fontWeight: 'bold',
              paddingTop: 20,
              color: 'black'
            }}></Text>

          </TouchableOpacity>
          
          {currentTab === "Kho Sách" && <IndexSach setCurrentTab={setCurrentTab} navigation={navigation}/>}
          {currentTab === "Danh sách SV" && <IndexSV navigation={navigation}/>}
          {currentTab === "Danh sách mượn" && <IndexSVSach navigation={navigation}/>}
          {currentTab === "home" && <Home navigation={navigation}/>}
          {/* <IndexSach navigation={navigation}/> */}
          {/* <Image source={library} style={{
            width: 300,
            height: 300,
            marginLeft: '10%',
            marginTop: 10
          }}></Image>


          <Text style={{
            fontSize: 40,
            fontWeight: 'bold'
            , paddingTop: 15,
            paddingBottom: 5,
            marginLeft: '13%',

          }}>Welcome</Text> */}
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "Search") {

        
        // Do your Stuff...
        
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>


        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343A40',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
export default Sidebar;