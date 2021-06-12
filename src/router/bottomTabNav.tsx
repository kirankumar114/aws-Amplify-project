import React from 'react';
import {View,Image, Text, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import ProductScreen from '../screens/ProuctScreeen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import SignOutScreen from '../screens/SignOutScreen';


const BottomTabNav = () => {

    const Tab = createBottomTabNavigator();

    return(
            <Tab.Navigator tabBarOptions ={{ showLabel : false}}>
                <Tab.Screen 
                component = {HomeStack}
                name = 'Home'
                options = {{
                    tabBarIcon : ({color}) => (
                        <Entypo name = "home" color = {color} size = {25}/>
                    )
                }} 
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                      // navigation.popToTop();
                      navigation.navigate(route.name);
                    },
                })}/>
                <Tab.Screen 
                component = {CartStack} 
                name = 'Cart'
                options = {{
                    tabBarIcon : ({color}) => (
                        <Entypo name = "shopping-cart" color = {color} size = {25}/>
                    )
                }} />
                <Tab.Screen 
                component = {SignOutScreen} 
                name = 'singOut'
                options = {{
                    tabBarIcon : ({color}) => (
                        <Entypo name = "menu" color = {color} size = {25}/>
                    )
                }} />
            </Tab.Navigator>
    )
};


export default BottomTabNav;
