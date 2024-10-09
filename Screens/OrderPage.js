import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Card from "../components/Home/Card";
import NavBar from "../components/Home/NavBar";
import SearchingView from "../components/Home/SearchingView";
import FontLoader from "../FontLoader";

const OrderPage = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const setStoreID = async () => {
            try {
                await AsyncStorage.setItem('Store-ID', '200');
                console.log('Store-ID set to 200');
            } catch (error) {
                console.error('Failed to set Store-ID:', error);
            }
        };

        setStoreID();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const navigateToNewOrderScreen = (title, statusKey, color) => {
        navigation.navigate('NewOrderScreen', { title, statusKey, color });
    };

    return (
        <FontLoader>
            <SafeAreaView style={{ backgroundColor: '#f3f4f6', flex: 1 }}>
                <StatusBar backgroundColor="#000125" barStyle="light-content" />
                <NavBar />
                <View style={{ backgroundColor: '#000125', height: '80%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 20, marginBottom: 5 }}>
                    <SearchingView />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:30 }}>
                        <Card 
                            backgroundColor="#6463d9" 
                            iconName="bag-add" 
                            rotationDegree={0} 
                            title="New Bag(s)" 
                            textBg="#504fae" 
                            mainText='2' 
                            subTitle="600"
                            onPress={() => navigateToNewOrderScreen('New Bag(s)', '1', '#6463d9')} 
                        />
                        <Card 
                            backgroundColor="#2b8058" 
                            iconName="bag-handle" 
                            rotationDegree={0} 
                            title="Accepted Bag(s)" 
                            textBg="#11673e" 
                            mainText='10' 
                            subTitle="365"
                            onPress={() => navigateToNewOrderScreen('Accepted Bag(s)', '2', '#2b8058')} 
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Card 
                            backgroundColor="#fd7d57" 
                            iconName="bag-remove" 
                            rotationDegree={0} 
                            title="Rejected Orders" 
                            textBg="#ca6446" 
                            mainText='5' 
                            subTitle="100"
                            onPress={() => navigateToNewOrderScreen('5', 'rejected', '#fd7d57')} 
                        />
                        <Card 
                            backgroundColor="#f3a842" 
                            iconName="bag-check" 
                            rotationDegree={0} 
                            title="Delivered Orders" 
                            textBg="#c28635" 
                            mainText='50' 
                            subTitle="15,874"
                            onPress={() => navigateToNewOrderScreen('Delivered Orders', '6', '#f3a842')} 
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Card 
                            backgroundColor="#978ba6" 
                            iconName1="bike-fast" 
                            rotationDegree={0} 
                            title="Dispatched Orders" 
                            textBg="#796f85" 
                            mainText='1' 
                            subTitle="325"
                            onPress={() => navigateToNewOrderScreen('Dispatched Orders', '3', '#978ba6')} 
                        />
                        <Card 
                            backgroundColor="#14acee" 
                            iconName1="bookmark-check" 
                            rotationDegree={0} 
                            title="Ongoing offers" 
                            textBg="#108abe" 
                            mainText='0' 
                            subTitle="0"
                            onPress={() => navigateToNewOrderScreen('Dispatched Orders', '3', '#978ba6')} 
                        />
                    </View>
                </View>
            </SafeAreaView>
        </FontLoader>
    );
};

export default OrderPage;
