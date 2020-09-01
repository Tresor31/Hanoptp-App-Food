// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class Adresse extends Component {

//   constructor(props) {
//      super(props);
//      this.state = {
//        data:"",
//      };
//   }

//   render() {
//     return (
//       <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
//          <Text>Adresse</Text>
//       </View>
//     );
//   }
// }









import React, { useState, useEffect } from 'react';
import MapView , {Marker} from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

// import Geolocation from '@react-native-community/geolocation';

export default class Adresse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:"",
      latitude:48.2973451,
      longitude:4.0744009,
      location:null,
      geocode:null,
      errorMessage:""
    };
 }


  render() {

    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude : this.state.longitude,
            latitudeDelta: 48.293024,
            longitudeDelta: 4.079306,
          }}
          onPress={(e) => this.onClickMap(e.nativeEvent)}
        >
          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={(e) => this.movementMarker(e.nativeEvent)}
            title="Here"  />
        </MapView>

        <TouchableOpacity style={{
            backgroundColor:"white",
            height:60, width:60,
            borderRadius:50,
            alignItems:'center',
            padding:5,
            position:"absolute",
            top :10 ,
            right:10
          }} onPress={()=>this._getLocation()}>
          <Ionicons name="md-locate" size={50} color={"gray"}  />
        </TouchableOpacity>


      </View>
    );
  }

  _getLocation()
  {
    Location.getCurrentPositionAsync((info) => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
    },(error)=>{
      console.log(JSON.stringify(error))
    })
  }

  // getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
  //   const { latitude , longitude } = location.coords
  //   this.getGeocodeAsync({latitude, longitude})
  //   this.setState({ location: {latitude, longitude}});

  // };
  movementMarker(e){

    // get coordinate from mapviews
    const { latitude, longitude } = e.coordinate
    // update coordinate

    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }

  onClickMap(e)
  {
    const {latitude,longitude} = e.coordinate
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});







// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   });

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });








// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { MapView, Location } from 'expo';
// // import * as Permission from 'expo-';
// import Constants from 'expo-constants';


// export default class App extends Component {
//   state = {
//     mapRegion: null,
//     hasLocationPermissions: false,
//     locationResult: null
//   };

//   componentDidMount() {
//     this.getLocationAsync();
//   }

//     handleMapRegionChange (mapRegion){
//       console.log(mapRegion);
//       this.setState({ mapRegion });
//     }

//   async getLocationAsync (){
//    let { status } = await Permissions.askAsync(Permissions.LOCATION);
//    if (status !== 'granted') {
//      this.setState({
//        locationResult: 'Permission to access location was denied',
//      });
//    } else {
//      this.setState({ hasLocationPermissions: true });
//    }

//    let location = await Location.getCurrentPositionAsync({});
//    this.setState({ locationResult: JSON.stringify(location) });

//    // Center the map on the location we just fetched.
//     this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           Pan, zoom, and tap on the map!
//         </Text>

//         {
//           this.state.locationResult === null ?
//           <Text>Finding your current location...</Text> :
//           this.state.hasLocationPermissions === false ?
//             <Text>Location permissions are not granted.</Text> :
//             this.state.mapRegion === null ?
//             <Text>Map region doesn't exist.</Text> :
//             <MapView
//               style={{ alignSelf: 'stretch', height: 400 }}
//               region={this.state.mapRegion}
//               onRegionChange={this.handleMapRegionChange}
//             />
//         }

//         <Text>
//           Location: {this.state.locationResult}
//         </Text>
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     paddingTop: Constants.statusBarHeight,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });
