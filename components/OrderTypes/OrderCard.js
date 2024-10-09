// OrderCard.js

import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontLoader from '../../FontLoader';

const OrderCard = ({ order, userDetails }) => {
    const { 'Order-ID': orderId, 'Order-Items': orderItems, 'Order-Value': orderValue, 'Order-Created': orderCreated } = order;

    // Function to format date from ISO format to custom format
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        
        // Define month names and ordinal suffixes
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const ordinalSuffix = (day) => {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        
        // Format date components
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        
        // Construct formatted date string
        const formattedDate = `${weekday}, ${day}${ordinalSuffix(day)} ${month} ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;
        
        return formattedDate;
    };

    // Format the order created date
    const formattedOrderCreated = formatDate(orderCreated);

    const text = orderId.toString();

    // Check if userDetails is available
    if (!userDetails) {
        return null; // or render a loading state or placeholder
    }


    return (
        <FontLoader>
            <View
                style={{
                    backgroundColor: '#fffaff',
                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 0.4,
                    borderColor: '#ead0d0',
                    elevation: 2,
                }}>
                {/* First Row */}
                <View
                    style={{
                        flex: 0.2,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ marginLeft: 10, fontSize: 18, fontFamily: "DMSansR" }}>
                        #OD{text.slice(0, -4)}
                        <Text style={{ backgroundColor: '#fef014', fontSize: 18, fontFamily: "DMSansB", paddingHorizontal: 10, borderRadius: 10 }}>{text.slice(-4)}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name="shopping-bag"
                            style={{
                                textAlignVertical: 'center',
                                marginRight: 5,
                                fontSize: 20,
                                color: '#131972',
                            }} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginRight: 10, fontFamily: "DMSansR" }}>
                            {orderItems.length}
                        </Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ead0d0', height: 1.5, width: '100%' }}></View>
                {/* Second Row */}
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <View style={{ flex: .8 }}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Icon
                                name="navigation"
                                style={{
                                    textAlignVertical: 'center',
                                    marginRight: 5,
                                    fontSize: 15,
                                    color: '#615f5f',
                                    marginLeft: 5
                                }} />
                            <View style={{ justifyContent: 'center', flex: 1, marginBottom: 5 }}>
                                <Text style={{ fontSize: 16, fontFamily: "DMSansB", paddingVertical: 0, marginBottom: 2, color: "#131313" }}>{userDetails.userName}</Text>
                                <Text style={{ fontSize: 15, color: '#565454', fontFamily: "DMSansSB", marginBottom: 5 }}>{userDetails.userAddress}</Text>
                            </View>
                        </View>
                        {/* phone no */}
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Icon
                                name="phone"
                                style={{
                                    textAlignVertical: 'center',
                                    marginRight: 5,
                                    fontSize: 17,
                                    color: '#615f5f',
                                    marginLeft: 5
                                }} />
                            <View style={{}}>
                                <Text style={{ textDecorationLine: 'underline', color: '#ba74ac', fontFamily: "DMSansSB", marginBottom: 5, fontSize: 15 }}>+91 {userDetails.userPhone}</Text>
                            </View>
                        </View>
                        {/* Date */}
                        <View style={{ width: '100%', flexDirection: 'row', padding: 4 }}>
                            <Icon
                                name="calendar"
                                style={{
                                    textAlignVertical: 'center',
                                    marginRight: 5,
                                    fontSize: 17,
                                    color: '#615f5f',
                                    marginLeft: 3
                                }} />
                            <View>
                                <Text style={{ color: '#565454', fontFamily: "DMSansR", fontSize: 15 }}>{formattedOrderCreated}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: '#ead0d0', width: 2, height: '70%', alignSelf: 'center', marginRight: 10
                    }}></View>
                    <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }} >
                        <View
                            style={{
                                flex: 0.4,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                            <Icon
                                name="credit-card"
                                style={{
                                    textAlignVertical: 'center',
                                    marginRight: 5,
                                    fontSize: 17,
                                    color: '#615f5f',
                                }} />
                            <Text style={{ fontSize: 10, marginRight: 10, color: '#565454', fontFamily: "DMSansR" }}>Order Amount</Text>
                        </View>
                        <Text style={{ color: '#8bc34b', fontSize: 25, textAlign: 'center', fontFamily: "DMSansB" }}>₹ {orderValue}</Text>
                    </View>
                </View>
                {/* Third Row */}
                <View style={{ flex: 0.1, backgroundColor: 'transparent', borderTopColor: '#ead0d0', borderTopWidth: 1, marginTop: 2, paddingVertical:25,justifyContent: 'center', alignContent: 'center', paddingBottom: -5 }}>
                    {/* <TouchableOpacity style={{ borderColor: '#ead0d0', flex: 0.75, width: '95%', alignSelf: 'center', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfcdc' }}>
                        <Text style={{ color: '#3a3737', fontFamily: "DMSansR" }}>View More</Text>
                    </TouchableOpacity> */}
                </View>
            </View >
        </FontLoader>
    );
};

export default OrderCard;
