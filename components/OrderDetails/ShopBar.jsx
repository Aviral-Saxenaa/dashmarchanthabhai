import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontLoader from '../../FontLoader';

const ShopBar = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      Alert.alert("Quantity cannot be less than zero");
    }
  };

  const handleAddClick = () => {
    Alert.alert('ADD button clicked');
    setQuantity(1);
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10, borderWidth: 1, borderColor: "black", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 }}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#EB8633" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5, fontFamily: "DMSansB" }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#EB8633" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FontLoader>
      <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 10, borderColor: '#989BA4', borderWidth: 0.5, justifyContent: "space-between", alignItems: "center", paddingVertical: 20 }}>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', fontFamily: "DMSansSB" }}>BigBasket
            <Icon name='flash' style={{ fontSize: 22, color: '#FFB000', marginTop: 10 }}></Icon>
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 13, color: '#a9a9a9', marginTop: 9, marginLeft: 0, fontFamily: "DMSansR" }}>Shop no-4 , French Arcade ,Noida</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
            {/* Unfilled line */}
            <View style={{ backgroundColor: '#EB8634', height: 5, width: '80%' }} />
            {/* Filled line */}
            <View style={{ backgroundColor: '#ccc', height: 5, flex: 1 }} />
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          {quantity === 0 ? (
            <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',position:"relative",bottom:10}}>
              <View style={{ borderRadius: 5, padding: 0, alignItems: 'center', justifyContent: "center", height: 30, backgroundColor:"#66A865", width: 60 ,paddingHorizontal:7}}>
                <Text style={{ color: 'white', fontSize: 14, fontFamily: "DMSansB" }}>ADD</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 ,position:"relative",bottom:20}}>
              {renderCounterButtons()}
            </View>
          )}
          <Text style={{marginLeft:15,fontWeight:"500",fontSize:15,fontFamily:"DMSansB",position:"absolute",marginTop:60,}}>Rs 15</Text>
        </View>
      </View>
    </FontLoader>
  );
};

export default ShopBar;
