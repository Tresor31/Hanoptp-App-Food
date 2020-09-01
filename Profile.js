// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class Profile extends Component {

//   constructor(props) {
//      super(props);
//      this.state = {
//        data:"",
//      };
//   }

//   render() {
//     return (
//       <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
//          <Text>Profile</Text>
//       </View>
//     );
//   }
// }


import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';

console.disableYellowBox = true;

export default function App() {

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('803047876769526', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  }

  return (
    isLoggedin ?
      userData ?
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 50 }}
            source={{ uri: userData.picture.data.url }}
            onLoadEnd={() => setImageLoadStatus(true)} />
          <ActivityIndicator size="large" color="#0000ff" animating={!isImageLoading} style={{ position: "absolute" }} />
          <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {userData.name}!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
        </View> :
        null
      :
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
          source={{uri: 'http://www.hanopto.com/wp-content/uploads/2020/07/logo-hanopto-300x294.jpeg'}} />
        <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
          <Text style={{ color: "#fff" }}>Se connecter avec Facebook</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});







// import React, { Component } from 'react';
// import { Text, Dimensions,  View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
// var { width } = Dimensions.get("window");
// import * as Facebook from 'expo-facebook';


// export default class Profile extends Component {

//   render() {

//     async function logIn() {
//       try {
//         await Facebook.initializeAsync('803047876769526');
//         const {
//           type,
//           token,
//         } = await Facebook.logInWithReadPermissionsAsync({
//           permissions: ['public_profile'],
//         });
//         if (type === 'success') {
//           // Get the user's name using Facebook's Graph API
//           const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//           Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
//         } else {
//           // type === 'cancel'
//         }
//       } catch ({ message }) {
//         alert(`Facebook Login Error: ${message}`);
//       }
//     }


//     return (
//       <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>

//           <View style={{justifyContent:'center'}}>
//              <Image source={require('../assets/portait.jpg')} style={{width:200,height:200,borderRadius:10}} />
//              <View style={{height:20}} />
//              <Text style={{fontSize:20,fontWeight:"bold"}}>Rola Jadiba</Text>
//              <Text style={{fontSize:20}}>rola.zaitoni@gmail.com</Text>
//              <View style={{height:20}} />
//            </View>

//            <TouchableOpacity
//              onPress={()=>logIn}
//              style={{
//                backgroundColor:"#3b5998",
//                width:width-40,
//                alignItems:'center',
//                padding:10,
//                borderRadius:5
//              }}>
//              <Text style={{
//                  fontSize:24,
//                  fontWeight:'bold',
//                  color:"white"
//                }}>
//                Login facebook
//              </Text>
//            </TouchableOpacity>
//       </View>
//     );
//   }

// }
