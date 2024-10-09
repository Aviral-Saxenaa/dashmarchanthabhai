

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FontLoader from '../../FontLoader';


const CustomCheckbox = ({ checked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      {/* Use the 'check-box' icon when checked, 'check-box-outline-blank' otherwise */}
      <Icon name={checked ? 'check-box' : 'check-box-outline-blank'} size={25} color="black" />
    </TouchableOpacity>
  );
};


const OrderItemCard = () => {

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  
  

  return (

   

    <FontLoader>
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 50, borderColor: '#989BA4', borderWidth: 0.5 ,justifyContent:"space-between",alignItems:"center"}}>
       <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: 'https://i5.walmartimages.com/asr/71e5349f-831e-4f1d-8987-59e35ac188e9_1.626a9554f4d4bb6d0560a39265ce80ba.jpeg' }} style={{ width: '100%', height: '90%', resizeMode: 'contain' ,borderWidth:2}} />
      </View>
      <View style={{ flex: 1, marginLeft: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500',fontFamily:"DMSansSB" }}>Mountain Dew</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 9,fontFamily:"DMSansSB" }}>23/-</Text>
          <Text style={{ fontSize: 15, color: '#a9a9a9', textDecorationLine: 'line-through',marginTop: 9, marginLeft: 5,fontFamily:"DMSansR" }}>11</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
          <Text style={{ fontSize: 16, color: 'black' ,fontFamily:"DMSansR"}}>44ML x</Text>
          <Text style={{ fontSize: 18, color: 'red', backgroundColor: '#f2f2f2', paddingHorizontal: 5 ,fontFamily:"DMSansR",fontWeight:"800",marginLeft:5}}>2</Text>
        </View>
        </View>
     <View style={{marginRight:20}}>
        <CustomCheckbox checked={isChecked} onToggle={toggleCheckbox} />
        </View>
      
    
    </View>
    </FontLoader>
  );
};

export default OrderItemCard;


