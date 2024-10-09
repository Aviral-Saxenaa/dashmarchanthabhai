import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text, Modal, ActivityIndicator, } from 'react-native';
import NavBarOrder from '../components/OrderTypes/NavBarOrder';
import OrderCard from '../components/OrderTypes/OrderCard';
import FontLoader from '../FontLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client, Databases, Query } from 'appwrite';

const NewOrderScreen = ({ route, navigation }) => {
    const { title, statusKey, color } = route.params;
    const [orders, setOrders] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const storeId = await AsyncStorage.getItem('Store-ID');
                if (storeId !== null) {
                    const client = new Client()
                        .setEndpoint('https://cloud.appwrite.io/v1')
                        .setProject('65773c8581b895f83d40');

                    const databases = new Databases(client);
                    const result = await databases.listDocuments(
                        'data-level-1', // Replace with your database ID
                        'OrdersDB', // Replace with your collection ID
                        [
                            Query.equal('Store-ID', storeId),
                            Query.equal('Status-Key', statusKey)
                        ]
                    );

                    console.log('Fetched orders:', result.documents);
                    setOrders(result.documents);

                    const userIds = result.documents.map(order => order['User-ID']);
                    await fetchUserDetails(userIds);
                } else {
                    console.error('Store-ID not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setTimeout(() => setLoading(false), 2000); // Keep spinner for 2 seconds
            }
        };

        const fetchUserDetails = async (userIds) => {
            const client = new Client()
                .setEndpoint('https://cloud.appwrite.io/v1')
                .setProject('65773c8581b895f83d40');

            const databases = new Databases(client);
            const userDetails = {};

            for (const userId of userIds) {
                const result = await databases.listDocuments(
                    'data-level-1', // Replace with your database ID
                    'UsersDB', // Replace with your collection ID
                    [
                        Query.equal('User-Phone', userId)
                    ]
                );

                if (result.documents.length > 0) {
                    const user = result.documents[0];
                    userDetails[userId] = {
                        userName: user['User-Name'],
                        userPhone: user['User-Phone'],
                        userAddress: `${user['User-SocietyBlock']}-${user['User-SocietyFlat']}, ${user['User-SocietyName']}, ${user['User-City']}`
                    };
                }
            }

            setUserDetails(userDetails);
        };

        fetchOrders();
    }, [statusKey]);

    return (
        <FontLoader>
            <StatusBar
                backgroundColor={color}
                barStyle="light-content"
            />
            <View style={{ flex: 1 }}>
                <NavBarOrder
                    title={title}
                    onBackPress={() => navigation.goBack()}
                    onSecondIconPress={() => { /* Do something when the help icon is pressed */ }}
                    backIconName="chevron-back-outline"
                    secondIconName="search-outline"
                    bgcolor={color}
                />
                {loading ? (
                    <Modal
                        transparent={true}
                        animationType="none"
                        visible={loading}
                        onRequestClose={() => {}}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={loading}
                                    size="large"
                                    color="#0000ff"
                                />
                                <Text style={styles.loadingText}>Fetching data...</Text>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => (
                            <OrderCard
                                order={item}
                                userDetails={userDetails[item['User-ID']]}
                            />
                        )}
                        keyExtractor={(item) => item.$id}
                        ListEmptyComponent={<Text style={{ fontFamily: 'DMSansB', color: 'gray', fontSize: 30, alignSelf: 'center', marginTop: 50 }}>No orders found</Text>}
                        contentContainerStyle={{ backgroundColor: '#f3f4f6', paddingBottom: 10 }}
                    />
                )}
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 200,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
       fontFamily:'DMSansSB'
    }
});

export default NewOrderScreen;
