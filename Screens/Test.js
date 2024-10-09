import React, { useEffect } from 'react';
import { View, StyleSheet, Text,Image,TouchableOpacity,TextInput } from 'react-native';
import OrderItemCard from '../components/OrderDetails/OrderItemCard';
import { Client } from 'appwrite';
import storage from 'local-storage-fallback';
import FontLoader from '../FontLoader';
if (!('localStorage' in window)) {
    window.localStorage = storage;
  }
const Test = () => {
  useEffect(() => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65773c8581b895f83d40');

    // Subscribe to changes in the specific document
    const unsubscribe = client.subscribe('databases.data-level-1.collections.StoresDB.documents.657d6d2698af7c836c74', response => {
      console.log('Realtime payload:', response.payload);
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FontLoader>
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <OrderItemCard />
      <View style={{}}>
    <View style={{flexDirection: "row",backgroundColor:'#fff',paddingTop:5}}>
        <Image source={{uri: "https://i5.walmartimages.com/asr/a20a1bc8-20bc-4d75-8760-53a774be9950.46af488cd5d4f4366e14e94fde6732a9.jpeg"}} style={{width: '24%', height: 100,backgroundColor:'#f4f4f4',resizeMode:'contain',borderColor:"#e6e9fb",borderWidth:0.9,borderRadius:10}} />
        <View style={{flexDirection: "column", marginLeft: 10, flex: 1,paddingRight:3}}>
            <Text style={{fontFamily: "DMSansSB", flexWrap: "wrap",letterSpacing:-0.2,fontSize:15,color:"#212121"}}>Doritos Chips Creamy Spy Flavour Chips Creamy Spy Flavour</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 15}}>
                <View style={{}}>
                    <Text style={{fontFamily: "DMSansR",color:'#131315',paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#f5f6f8", alignItems: "center", justifyContent: "center", marginTop: 2, borderRadius: 2,borderColor:"#c3c3c3",borderWidth:0.5}}>200gm</Text>
                </View>
                <View style={{paddingVertical: 0, paddingHorizontal: 10, backgroundColor: "#f5f6f8", borderRadius: 4, borderColor: "c3c3c3",marginRight:10,borderWidth:0.2,display:'flex',flexDirection:'column',borderStyle:"dashed"}}>
                    <Text style={{paddingHorizontal: 0, textAlign: "center", fontSize: 12, color: "#646464", fontFamily: "DMSansR",marginLeft:0,alignSelf:'center',marginBottom:0,marginRight:0}}>MRP</Text>
                    <Text style={{paddingHorizontal: 0, textAlign: "center", fontSize: 25, color: "#212121", fontFamily: "DMSansB",marginTop:0}}>₹ 55</Text>
                </View>
            </View>
        </View>
    </View>
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 5, backgroundColor: "transparent",paddingVertical:20}}>
        <View style={{paddingHorizontal: 5, backgroundColor: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center", paddingVertical: 2, borderRadius: 5,borderColor:"#c3c3c3",borderWidth:0.5,marginLeft:10}}>
            <Text style={{fontSize: 12, fontFamily: "DMSansR",color:'#646464'}}>Current Selling Price</Text>
            <Text style={{fontSize: 25, color: "#505054", fontFamily: "DMSansB",marginTop:5}}>₹ 45</Text>
        </View>
        <View style={{ width:'60%', backgroundColor: "#212121",  borderRadius: 10, borderWidth: 2, borderColor: '#000', marginRight: 10 }}>
    <Text style={{ fontSize: 14, textAlign: "center", fontFamily: "DMSansR", color: 'white', marginBottom: 2 }}>New Price</Text>
    <View style={{ flexDirection: 'row', backgroundColor: '#000', borderRadius: 5, width: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
    <Text style={{ color: 'white', fontSize: 30, backgroundColor: '#000', padding: 0, fontFamily: 'DMSansSB', alignSelf: 'center' ,marginRight:5}}>₹</Text>
    <TextInput
        style={{ backgroundColor: '#000', borderRadius: 5, padding: 5, fontFamily: 'DMSansSB', flex: 1, fontSize: 30, color: 'white' }}
        placeholder="Enter Price"
        placeholderTextColor="#8d8f93"
        placeholderStyle={{ fontSize: 20, fontFamily: 'DMSansSB' }}   keyboardType="numeric" 
    />
</View>

</View>

    </View>
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 15}}>
        <TouchableOpacity style={{paddingVertical: 15, paddingHorizontal: 25, border: "1px solid green", backgroundColor: "#d41712", borderRadius: 15}}>
            <Text style={{color: "white", fontFamily: "DMSansB",fontSize:20}}>Out of Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingVertical: 15, paddingHorizontal: 55, border: "1px solid green", backgroundColor: "#6eac4d", borderRadius: 15}}>
            <Text style={{color: "white", fontFamily: "DMSansB",fontSize:20}}>Update</Text>
        </TouchableOpacity>
    </View>
</View>
    </View>
    </FontLoader>
  );
};

export default Test;
