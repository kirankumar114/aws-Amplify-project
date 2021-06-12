import React from 'react';
import {View,Image, Text, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './bottomTabNav';

const Router = () => {
    const Root = createStackNavigator();
    return(
        <NavigationContainer >
            <Root.Navigator>
                <Root.Screen component = {BottomTabNav} name = 'HomeTabs'/>
            </Root.Navigator>
        </NavigationContainer>
    )
};


export default Router;
