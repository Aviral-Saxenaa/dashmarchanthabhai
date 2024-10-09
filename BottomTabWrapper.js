import React from 'react';
import { useRoute } from '@react-navigation/native';
import BottomTabBar from './components/BottomTabBar';

const BottomTabWrapper = ({ children }) => {
    const route = useRoute();
    const showBottomTabBar = route.name === 'Home' || route.name === 'OrderPage';

    return (
        <>
            {children}
            {showBottomTabBar && <BottomTabBar />}
        </>
    );
};

export default BottomTabWrapper;
