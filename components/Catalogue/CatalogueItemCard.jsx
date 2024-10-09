import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import FontLoader from '../../FontLoader';

const CatalogueItemCard = ({ id, title, price, discountPrice, image, weight }) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

  // Find the cart item corresponding to the current CatalogueItemCard
//   const cartItem = cartItems.find((item) => item.id === id);

   const navigation = useNavigation();

  const dispatch=useDispatch()
  const handleEditClick=(item)=>{
    navigation.navigate('EditCatalouge', {
      id:id,
      title:title,
      price:price,
      discountPrice:discountPrice,
      image:image,
      weight:weight
    });
  };

  return (
    <FontLoader>
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 5, borderColor: '#989BA4', borderWidth: 0.5 }}>
       <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '90%', resizeMode: 'contain' ,borderWidth:2}} />
      </View>
      <View style={{ flex: 1, marginLeft: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500',fontFamily:"DMSansSB" }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 9,fontFamily:"DMSansSB" }}>{price}/-</Text>
          <Text style={{ fontSize: 15, color: '#a9a9a9', textDecorationLine: 'line-through',marginTop: 9, marginLeft: 5,fontFamily:"DMSansR" }}>{discountPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
          <Text style={{ fontSize: 16, color: 'black', backgroundColor: '#f2f2f2', paddingHorizontal: 5 ,fontFamily:"DMSansR"}}>{weight}</Text>
        </View>
     
        <TouchableOpacity onPress={handleEditClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',position:"relative",bottom:10}}>
          <View style={{ borderRadius: 5, padding: 4, alignItems: 'center',justifyContent:"center", height: 30, borderColor: '#EB8633', borderWidth: 1, width: 60 }}>
            <Text style={{ color: '#EB8633', fontSize: 14 ,fontFamily:"DMSansB"}}>Edit</Text>
          </View>
        </TouchableOpacity>
      
      
    </View>
    </View>
    </FontLoader>
  );
};

export default CatalogueItemCard;


