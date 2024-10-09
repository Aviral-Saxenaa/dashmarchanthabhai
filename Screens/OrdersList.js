import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// import { removeFromCart, updateCartItemQuantity } from '../../redux/actions/actions';
// import FontLoader from '../../FontLoader';

const OrdersList = ({ id, title, price, quantity,pid }) => {
        const image='https://www.bigbasket.com/media/uploads/p/xl/40019373_37-cadbury-dairy-milk-silk-chocolate-bar.jpg';

  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleRemoveClick = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    })
  };

  

  const totalPrice = price * quantity;

  return (
  
    <Animated.View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        opacity: fadeAnim,
        height:190,
        
      }}
    >
        

      <View style={{ width: 100, height: 100, borderRadius: 8, overflow: 'hidden' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' ,position:"absolute",left:-20}} />
      </View>
      <View style={{ flex: 1, marginLeft:-10 }}>
        <Text style={{ fontSize: 15,  color: '#333' }}>{title}</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#666' ,marginTop: 5}}>5 kg</Text>
          <Text style={{ fontSize: 17,  marginTop: 15, color: '#333' }}>₹ {60}</Text>
        </View>
              <View style={{ 
        width:86,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        marginTop: 25,
        borderWidth: 1, // Border width
        borderColor: 'black', // Border color
        padding: 1, // Padding to give some space inside the border
        position:"absolute",
        top:10,
        right:-10,
        borderRadius:10,
              paddingVertical:3
      }}>
        <TouchableOpacity style={{ padding: 0}}>
          <MaterialIcons name="close" size={26} color="#EB8633" style={{paddingRight:20}}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginHorizontal: 0,paddingRight:20}}>{5}</Text>
        
      </View>
      <Text style={{fontWeight:"600",fontSize:16,position:"absolute",right:115,top:135,width:200}}>Item Total : ₹{300}</Text>
      <View style={{
        borderTopWidth:.4,
        borderTopColor:"F3EEEA",
        marginTop:25,
        width:"100%"
      }}></View>
        <TouchableOpacity onPress={quantity > 1 ? handleRemoveClick : handleRemoveClick} style={{ marginTop: 10 ,width:100 ,position:"absolute",right:-5,top:100}}>
          
        <View style={{ borderRadius: 5, paddingVertical: 6, backgroundColor: '#EB8633', alignItems: 'center' ,marginTop:20}}>
          <Text style={{ color: '#FFF', fontSize: 15 }}>{quantity > 1 ? 'MODIFY' : 'MODIFY'}</Text>
        </View>
      </TouchableOpacity>
      </View>
    </Animated.View>

  );
};

export default OrdersList;
