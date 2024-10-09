import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FontLoader from '../../FontLoader';



const OrderItemCardMain = ({ onAddButtonClick }) => {
 
  
  const handlePress = () => {
    onAddButtonClick();

    console.log("button pressed");
  };

  return (
    <FontLoader>
      <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 0, borderColor: '#989BA4', borderWidth: 0.5 ,justifyContent:"space-between",alignItems:"center",marginTop:40}}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: 'https://i5.walmartimages.com/asr/71e5349f-831e-4f1d-8987-59e35ac188e9_1.626a9554f4d4bb6d0560a39265ce80ba.jpeg' }} style={{ width: '100%', height: '90%', resizeMode: 'contain' ,borderWidth:2}} />
        </View>
        <View style={{ flex: 1, marginLeft: 7 }}>
          <Text style={{ fontSize: 15, fontWeight: '500',fontFamily:"DMSansSB" }}>Mountain Dew</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: 'black', marginTop: 15,fontFamily:"DMSansSB" }}>starts @</Text>
            <Text style={{ fontSize: 20, color: '#a9a9a9',marginTop: 10, marginLeft: 1,fontFamily:"DMSansR",color:"#66A966",fontWeight:"600" }}>₹11</Text>
          </View>
        </View>
        <View style={{marginRight:5}}>
        <View style={{ position: "relative", bottom: 23, left: 16 }}>
          <View style={{ backgroundColor: "#64AA66", paddingHorizontal: 10, paddingVertical: 3,borderBottomLeftRadius: 10,borderTopRightRadius: 10, flexDirection: 'row', alignItems: 'center', overflow:"hidden" }}>
            <Text style={{ fontSize: 16, color: 'white', fontFamily: "DMSansSB", paddingLeft: 5 }}>₹11</Text>
            <Text style={{ fontSize: 12, color: 'grey', fontFamily: "DMSansR", color: "#F6F5F5", marginLeft: 14, paddingTop: 8 }}>₹15</Text>
          </View>
        </View>

          <TouchableOpacity onPress={handlePress} style={{backgroundColor:"#66A866",paddingHorizontal:30,paddingVertical:5,borderRadius:10,marginTop:13}}>
            <Text style={{color:"white",fontWeight:"500"}}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FontLoader>
  );
};

export default OrderItemCardMain;