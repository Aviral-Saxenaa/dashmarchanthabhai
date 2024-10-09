import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const SearchBarCatalogue = () => {
    return (
        <FontLoader>
        <View style={{ overflow: 'hidden', paddingBottom: 0 }}>
            <View style={{ backgroundColor: '#000125', padding: 5,  shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5 ,justifyContent:'center'}}>
             

                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10,  borderColor: '#858484', borderWidth: 1,marginHorizontal:10,color:'gray' ,alignItems:'center'}}>
                    <Icon name="search" size={20} color="black" />
                    <TextInput placeholder="Search for products..." style={{ marginLeft: 10 ,fontFamily:"DMSansSB"}} />
                </View>
            </View>
        </View>
        </FontLoader>

    );
};

export default SearchBarCatalogue;
