import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderPage from './Screens/OrderPage';
import HomeScreen from './Screens/HomeScreen';
import Catalogue from './Screens/Catalogue';
import Support from './Screens/Support';
import EditCatalouge from './Screens/EditCatalouge';
import NewOrderScreen from './Screens/NewOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import LoginScreen from './Screens/Loginscreenone';
import LoginscreenTwo from './Screens/Loginscreentwo';
import ShopDetails from './Screens/ShopDetails';
import ShopCategory from './Screens/ShopCategory';
import ThankYouScreen from './Screens/DetailsSubmitted';
import ShopDetailstwo from './Screens/ShopDetailstwo';
import DeliveryLocation from './Screens/DeliveryLocation';
import StatsScreen from './Screens/StatsScreen';
import Test from './Screens/Test';
import OrdersList from './Screens/OrdersList';
import SwipedOrder from './Screens/SwipedOrder';
import { registerRootComponent } from 'expo';
import BottomTabWrapper from './BottomTabWrapper';
import StoreScreen from './Screens/Catalogue';
import StoreScreen1 from './Screens/StoreScreen1';
import CatalogueTest from './Screens/CatalogueTest';
import AddProduct from './Screens/AddProduct';
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home">
                    {props => (
                        <BottomTabWrapper>
                            <HomeScreen {...props} />
                        </BottomTabWrapper>
                    )}
                </Stack.Screen>
                <Stack.Screen name="OrderPage">
                    {props => (
                        <BottomTabWrapper>
                            <OrderPage {...props} />
                        </BottomTabWrapper>
                    )}
                </Stack.Screen>
                <Stack.Screen name="StatsScreen" component={StatsScreen} />
                <Stack.Screen name="Catalogue" component={Catalogue} />
                <Stack.Screen name="EditCatalouge" component={EditCatalouge} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="NewOrderScreen" component={NewOrderScreen} />
                <Stack.Screen name="OrderScreen" component={OrderScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="LoginscreenTwo" component={LoginscreenTwo} />
                <Stack.Screen name="ShopDetails" component={ShopDetails} />
                <Stack.Screen name="ShopCategory" component={ShopCategory} />
                <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
                <Stack.Screen name="ShopDetailstwo" component={ShopDetailstwo} />
                <Stack.Screen name="DeliveryLocation" component={DeliveryLocation} />
                <Stack.Screen name="OrdersList" component={OrdersList} />
                <Stack.Screen name="SwipedOrder" component={SwipedOrder} />
                <Stack.Screen name="Test" component={Test} />
                <Stack.Screen name="Store" component={StoreScreen1} />
                <Stack.Screen name="Store2" component={CatalogueTest} />
                <Stack.Screen name="AddProduct" component={AddProduct} />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;
