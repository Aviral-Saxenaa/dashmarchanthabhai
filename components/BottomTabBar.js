// BottomTabBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontLoader from '../FontLoader';

const BottomTabBar = ({ onTabPress, currentTab }) => {
    return (
        <FontLoader>
        <View style={styles.tabBar}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onTabPress('Home')}>
                <Icon name={currentTab === 'Home' ? "home" : "home-outline"} size={24} color={currentTab === 'Home' ? 'tomato' : 'gray'} />
                <Text style={{ color: currentTab === 'Home' ? 'tomato' : 'gray', fontWeight: currentTab === 'Home' ? 'bold' : 'normal',fontFamily:"DMSansR" }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onTabPress('OrderPage')}>
                <Icon name={currentTab === 'OrderPage' ? "cart" : "cart-outline"} size={24} color={currentTab === 'OrderPage' ? 'tomato' : 'gray'} />
                <Text style={{ color: currentTab === 'OrderPage' ? 'tomato' : 'gray', fontWeight: currentTab === 'OrderPage' ? 'bold' : 'normal' ,fontFamily:"DMSansR" }}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onTabPress('Catalogue')}>
                <Icon name={currentTab === 'Catalogue' ? "book" : "book-outline"} size={24} color={currentTab === 'Catalogue' ? 'tomato' : 'gray'} />
                <Text style={{ color: currentTab === 'Catalogue' ? 'tomato' : 'gray', fontWeight: currentTab === 'Catalogue' ? 'bold' : 'normal' ,fontFamily:"DMSansR" }}>Catalogue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onTabPress('Support')}>
                <Icon name={currentTab === 'Support' ? "headset" : "headset-outline"} size={24} color={currentTab === 'Support' ? 'tomato' : 'gray'} />
                <Text style={{ color: currentTab === 'Support' ? 'tomato' : 'gray', fontWeight: currentTab === 'Support' ? 'bold' : 'normal' ,fontFamily:"DMSansR" }}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onTabPress('Test')}>
                <Icon name={currentTab === 'Test' ? "build" : "build"} size={24} color={currentTab === 'Test' ? 'tomato' : 'gray'} />
                <Text style={{ color: currentTab === 'Test' ? 'tomato' : 'gray', fontWeight: currentTab === 'Test' ? 'bold' : 'normal' ,fontFamily:"DMSansR" }}>Test</Text>
            </TouchableOpacity>
        </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '100%',backgroundColor:'white',elevation:50
    },
});

export default BottomTabBar;
