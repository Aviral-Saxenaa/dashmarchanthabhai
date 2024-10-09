import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const NavBarOrder = ({ title, onBackPress, onSecondIconPress, backIconName, secondIconName ,bgcolor}) => {
    return (
        <FontLoader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: bgcolor, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={onBackPress}>
                    <Icon name={backIconName} size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, color: 'white', marginLeft: 10 ,fontFamily:"DMSansSB"}}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onSecondIconPress}>
                    <Icon name={secondIconName} size={25} color="white" style={{ margin: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
        </FontLoader>
    );
};

export default NavBarOrder;
