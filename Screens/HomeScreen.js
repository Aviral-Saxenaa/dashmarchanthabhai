import React from "react";
import Card from "../components/Home/Card";

import { SafeAreaView, StatusBar, View } from 'react-native';
import NavBar from "../components/Home/NavBar";
import DispatchCard from "../components/Home/DispatchCard";
import FontLoader from "../FontLoader";
import BottomTabBar from "../components/BottomTabBar";




const HomeScreen = () => {
    return (
        <FontLoader>
        <SafeAreaView>
            <StatusBar backgroundColor="#000125" barStyle="light-content" />
            <NavBar />
            <View style={{ backgroundColor: '#e7ecef', height: '80%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingTop: 30, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginLeft:10,marginRight:10 }}>
                    <Card backgroundColor="#e68943" iconName="arrow-down-circle" rotationDegree={45} title="New Bag(s)" />
                    <Card backgroundColor="#1bbf70" iconName="progress-check" rotationDegree={0} title="Accepted Bag(s)" />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <DispatchCard />
                </View>


              




            </View>

        </SafeAreaView>
        </FontLoader>
    )
}

export default HomeScreen;