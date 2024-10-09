import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontLoader from '../FontLoader';

const Support = () => {
    return (
        <FontLoader>
        <View>
            <Text style={{fontFamily:"DMSansR",flex:1,justifyContent:"center",alignItems:"center",fontSize:20}}>SUPPORT SCREEN</Text>
        </View>
        </FontLoader>
    );
}

const styles = StyleSheet.create({})

export default Support;
