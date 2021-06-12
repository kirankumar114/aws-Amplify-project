import React from 'react';
import {View,Image, ScrollView, Text, StyleSheet, FlatList} from 'react-native';
import CartProductItem from '../../components/CartProductItem'
import products from '../../data/cart';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify'

const SignOutScreen = () => {

    const signOut = () => {
        Auth.signOut();
    }

    return(
        <View style = {{flexDirection: 'row'}}>
             <View style ={{width: '25%'}}></View>
             <Button onPress = {signOut} text = "Sign Out" containerStyle = {{width: '50%'}}/>
        </View>
    )
};

const styles = StyleSheet.create(
    {   
        page:{
            padding: 10
        }
    }
)

export default SignOutScreen;
