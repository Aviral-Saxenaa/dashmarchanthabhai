import React, { useState } from "react";
import { View } from "react-native";

import {
        SafeAreaView,
        StatusBar,
        Dimensions,
        TouchableOpacity,
        Text,
        Alert,
} from "react-native";

import OrderNavBar from "../components/OrderDetails/OrderNavBar";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import ProgressBar from "../components/OrderDetails/ProgessBar";
import FontLoader from "../FontLoader";

const OrderScreen = () => {
        const [activeTab, setActiveTab] = useState("Summary");

        const handlePress = (title) => {
                setActiveTab(title);
                Alert.alert(title);
        };

        return (
                <FontLoader>
                        <SafeAreaView
                                style={{ flex: 1, backgroundColor: "#f2f2f2" }}
                        >
                                <StatusBar
                                        backgroundColor="#000125"
                                        barStyle="light-content"
                                />

                                <OrderNavBar title="Order Details" />

                                {/*------------TAB BAR ⬇️⬇️⬇️⬇️ ------------------- */}
                                <View
                                        style={{
                                                flexDirection: "row",
                                                backgroundColor: "#000125",
                                                borderBottomWidth: 0.8,
                                                borderColor: "blue",
                                        }}
                                >
                                        {["Summary", "Items"].map((title) => {
                                                const isActive =
                                                        title === activeTab;
                                                return (
                                                        <TouchableOpacity
                                                                key={title}
                                                                style={{
                                                                        flex: 1,
                                                                        alignItems: "center",
                                                                        justifyContent:
                                                                                "center",
                                                                        padding: 10,
                                                                        
                                                                        
                                                                }}
                                                                onPress={() =>
                                                                        handlePress(
                                                                                title
                                                                        )
                                                                }
                                                        >
                                                                <Text
                                                                        style={{
                                                                                color: isActive
                                                                                        ? "white"
                                                                                        : "#f3f3f3",
                                                                                fontSize: 15,
                                                                                fontWeight: 300,
                                                                                fontFamily:"DMSansR"
                                                                        }}
                                                                >
                                                                        {title}
                                                                </Text>
                                                                {isActive && (
                                                                        <View
                                                                                style={{
                                                                                        position: "absolute",
                                                                                        bottom: 0,
                                                                                        left: 0,
                                                                                        right: 0,
                                                                                        height: 2,
                                                                                        backgroundColor:
                                                                                                "white",
                                                                                }}
                                                                        />
                                                                )}
                                                        </TouchableOpacity>
                                                );
                                        })}
                                </View>
                                {/*------------TAB BAR⬆️⬆️⬆️ ------------------- */}
                                <ProgressBar />

                                <OrderDetails />
                        </SafeAreaView>
                </FontLoader>
        );
};

export default OrderScreen;
