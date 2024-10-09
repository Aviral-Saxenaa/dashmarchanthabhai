import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const NavBarCatalogue = ({ storeName }) => {
    return (
        <FontLoader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: "#000125",paddingVertical:8}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="chevron-back-outline" size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: 'white', marginLeft: 10 ,fontFamily:"DMSansSB"}}>{storeName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="search" size={25} color="white" style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="help-circle" size={30} color="white" style={{ margin: 1 }} />
                </TouchableOpacity>
            </View>
        </View>
        </FontLoader>
    );
};

export default NavBarCatalogue;
