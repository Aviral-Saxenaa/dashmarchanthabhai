import React from 'react';
import { View, Text, TouchableOpacity ,Image,ScrollView} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import FontLoader from '../../FontLoader';

const DashRecommendCard = ({ iconName, backgroundColor, title }) => {

    const items=[{id:1,url:'https://www.pngmart.com/files/5/Red-Bull-PNG-File.png',name:'Red Bull Can - 100 ML',pricebef:'160/-',priceafter:'150/-'},{id:2,url:'https://www.pngmart.com/files/5/Red-Bull-PNG-File.png',name:'Red Bull Can - 100 ML',pricebef:'160/-',priceafter:'150/-'},{id:3,url:'https://www.pngmart.com/files/5/Red-Bull-PNG-File.png',name:'Red Bull Can - 100 ML',pricebef:'160/-',priceafter:'150/-'},{id:4,url:'https://www.pngmart.com/files/5/Red-Bull-PNG-File.png',name:'Red Bull Can - 100 ML',pricebef:'160/-',priceafter:'150/-'}]

    return (
        <FontLoader>
        
            <View style={{ borderRadius: 10, backgroundColor: backgroundColor, padding:5, marginTop: 5, elevation: 5,paddingBottom:10 }}>
                {/* First Row */}
                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.95, flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ marginLeft: 10, textAlignVertical: 'center', color: 'white',fontFamily:"DMSansR" }}>{title}</Text>
                        <View style={{ marginLeft: 10, marginTop: 5, width: 40, backgroundColor: '#574f4f', height: 1 }}></View>

                    </View>
                    <Icon name={iconName} style={{ textAlignVertical: 'center', fontSize: 35, color: 'white', marginRight: 1 }}></Icon>

                </View>
                {/* Second Row */}
                <View style={{ flex: .9, marginBottom: 2, display: "flex", flexDirection: "row", marginTop: 15 }}>
    <ScrollView
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingLeft: 0 }}
    >
        {items.map(item => (
            <View key={item.id} style={{ backgroundColor: "white", padding:5, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginHorizontal:10 }}>
                <Image
                    source={{ uri: item.url }}
                    style={{ width: 80, height: 80 }}
                />
                <Text style={{ color: "blue", fontSize: 12, marginTop: 3 }}>{item.name}</Text>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
                    <Text style={{ fontSize: 10, textDecorationLine: "line-through" ,fontFamily:'DMSansR'}}>₹{item.pricebef}</Text>
                    <Text style={{ fontFamily:'DMSansSB',paddingLeft: 0, fontSize: 15, }}>₹{item.priceafter}</Text>
                </View>
            </View>
        ))}
    </ScrollView>
</View>

            </View >
        
        </FontLoader>
    )
}

export default DashRecommendCard;