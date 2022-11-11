import { Component, useState } from "react";
import React from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, StyleSheet, TextInput } from 'react-native';
import Constants from 'expo-constants';
import PlacesAutocomplete,{geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import { GoogleMap } from "@react-google-maps/api";
const GOOGLE_PLACES_API_KEY = 'AIzaSyAOSgzTUEEsybshv5nwc67eVy18uozTq7A';


class Mapgg extends Component{
  
  constructor(props) {
    super(props);
    this.state = { address: '' ,


    mapCenter:{
      lat: 10.844259, 
      lng: 106.635678
    }
};
  }
  
  render(){
    return(
      <div styles={{}}>
      <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data.description)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
      {/* <Map 
        google={this.props.google}
        style = {{width:"100%", height:"100%"}}
        zoom={17}
        initialCenter={
          {
            lat:this.state.mapCenter.lat,
            lng:this.state.mapCenter.lng,
            
          }}
          center={{
            lat:this.state.mapCenter.lat,
            lng:this.state.mapCenter.lng,
          }}>
        <Marker  position={{
        lat:this.state.mapCenter.lat,
        lng:this.state.mapCenter.lng,
      }}/>
      </Map> */}
      </div>
    );
  }
}
export default GoogleApiWrapper ({
  apiKey:GOOGLE_PLACES_API_KEY
})(Mapgg)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});

// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// export default function Mapgg() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <GoogleMap zoom={10} center={
//       {lat: 10.844259, 
//       lng: 106.635678}}
//        mapContainerClassName={{width:"100%", height:"100vh"}}>
//       <Marker position={{lat: 10.844259, 
//       lng: 106.635678}} />
//     </GoogleMap>
//   );
// }