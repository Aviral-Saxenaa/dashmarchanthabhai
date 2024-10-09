import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSwitch from './CustomSwitch';
import FontLoader from '../../FontLoader';

const NavBar = () => {
    return (
        <FontLoader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: "#000125",}}>
            <TouchableOpacity style={{ backgroundColor: 'transparent', borderRadius: 50, padding: 5, marginTop: 5 }}>
                <Icon name="menu" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: 'white', flex: 1, marginLeft: 5 ,fontFamily:"DMSansSB"}}>BigBasket</Text>

            <View style={{ flexDirection: 'row' }}>
                <CustomSwitch />

            </View>
        </View>
        </FontLoader>
    );
};

export default NavBar;
