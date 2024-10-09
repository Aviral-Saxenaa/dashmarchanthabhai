import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';



const OrderNavBar = ({title}) => {
    return (
        <FontLoader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#000125',}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="chevron-back-outline" size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'white', marginLeft: 10 ,fontFamily:"DMSansR"}}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="logo-whatsapp" size={25} color="white" style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="help-circle-outline" size={32} color="white" style={{ margin: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
        </FontLoader>
    );
};

export default OrderNavBar;
