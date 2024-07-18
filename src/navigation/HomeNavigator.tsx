import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/home';
import Albums from '../screens/albums';
import Categories from '../screens/categories';
import Events from '../screens/events';
import Settings from '../screens/settings';

const Tab = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Albums" component={Albums} />
            <Tab.Screen name="Categories" component={Categories} />
            <Tab.Screen name="Events" component={Events} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default HomeNavigator;