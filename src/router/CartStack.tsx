import React from 'react';
import {View,Image, Text, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen'
import { createStackNavigator } from '@react-navigation/stack';


const CartStack = () => {

    const Stack = createStackNavigator();

    return(
            <Stack.Navigator>
                <Stack.Screen component = {ShoppingCartScreen} name = 'CartScreen'/>
                <Stack.Screen component = {AddressScreen} name = 'AddressScreen'/>
            </Stack.Navigator>
    )
};


export default CartStack;
