import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

var{ width } = Dimensions.get("window");


export default class Cart extends Component {

  constructor(props) {
     super(props);
     this.state = {
      dataCart:[],
     };
  }

  componentDidMount()
  {
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const cartfood = JSON.parse(cart)
        this.setState({dataCart:cartfood})
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     this.setState({dataCart:dataCar})
    }
  }

  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
         <View style={{height:40}} />
         <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Hanopto</Text>
         <View style={{height:10}} />

         <View style={{flex:1}}>

           <ScrollView>

             {
               this.state.dataCart.map((item,i)=>{
                 return(
                   <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                     <Image resizeMode={"contain"} style={{width:width/3,height:width/3,borderRadius: 100}} source={{uri: item.food.image}}/>
                     <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                       <View>
                         <Text style={{fontWeight:"bold", textDecorationLine:"underline", color:"#ff0000", fontSize:20}}>{item.food.name}</Text>
                         <Text style={{fontWeight:"bold",color:"#33c37d", fontSize:18}}>Soupe de nouilles de riz servie dans un grand bol comprenant des nouilles de riz, la viande de boeuf ou du poulet, des herbes aromatiques, des pousses de soja et du citon.</Text>
                          <Text style={{fontWeight:"bold", textDecorationLine:"underline", color:"#ff0000", fontSize:20}}>Restaurants</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Bat Dan (49 rue Bat Dan, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Vui (13 Hang Giay, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Ganh (4 Hang Ma, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Cuong (23 Hang Muoi, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Bo Phu Xuan (36 Hang Da, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Duong Tau (3 Tran Phu, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Thin (13 Lo Duc, Hoan Kiem)</Text>
                          <Text style={{fontWeight:"bold",fontSize:18}}>+- Pho Ly Quoc Su (10 Ly Quoc Su, Hoan Kiem)</Text>
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>₫{item.price*item.quantity}</Text>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                             <Ionicons name="ios-remove-circle" size={35} color={"#33c37d"} />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                           <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                             <Ionicons name="ios-add-circle" size={35} color={"#33c37d"} />
                           </TouchableOpacity>
                         </View>
                       </View>
                     </View>
                   </View>
                 )
               })
             }

             <View style={{height:20}} />
           </ScrollView>
           </View>

           <View style={{height:20}} />

            {/* <Text style={{color:"#33c37d",fontSize:28}}>${ this.onLoadTotal() }</Text> */}
            <View style={{height:10}} />

            <TouchableOpacity style={{
                backgroundColor:"#33c37d",
                width:width-40,
                alignItems:'center',
                padding:10,
                borderRadius:5,
                margin:20
              }}>
              <Text style={{
                  fontSize:24,
                  fontWeight:"bold",
                  color:'white'
                }}>
                RECHERCHE
              </Text>
            </TouchableOpacity>

      </View>
    );
  }

  onLoadTotal(){
    var total = 0;
    const cart = this.state.dataCart;

    for(var i=0; i <= cart.length ; i++){
      total = total + (cart[i].price * cart[i].quantity);
      }
      return total;
  }

}
