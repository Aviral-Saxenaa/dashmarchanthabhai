import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../FontLoader';

const DispatchCard = () => {
    return (
        <FontLoader>
        <View style={{ backgroundColor: '#fec031', height: 100, width: '97%', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{  flexDirection: 'column',  }}>
                <Text style={{ marginLeft: 5, color: 'white', marginTop: 5 ,fontFamily:"DMSansSB",backgroundColor:"#cb9a27",paddingHorizontal:5,paddingVertical:3,borderRadius:8}}>Dispatched Orders</Text>
                <Text
                style={{
                  marginLeft: 10,
                  textAlignVertical: "center",
                  color: "white",
                  fontFamily: "DMSansR",
                  fontSize: 30,
                  fontWeight:'bold'
                }}
              >
                3
              </Text>
            </View>
            
            <Icon name="bike-fast" style={{ fontSize: 25, color: 'white', marginRight: 5, }}></Icon>

        </View >
        </FontLoader>
    );
}



export default DispatchCard;
