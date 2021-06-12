import React, { useState } from 'react';
import {View,Image, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles'
import QuantitySelector from '../QuantitySelector'
import { CartProduct } from '../../models';
import {DataStore} from 'aws-amplify';

interface CartProductItemProps {
    cartItem: CartProduct
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {

    const assignQuantity = async (val : number) => {
        const original = await DataStore.query(CartProduct, cartItem.id);
        if(original){
            await DataStore.save(
                CartProduct.copyOf(original, updated => {
                  updated.quantity = val;
                }),
              );
            };
        }
    
    return(
        <View style ={styles.root}>
            <View style ={styles.row}>
            <Image style= {styles.image} source = {{uri: cartItem.product?.image}}/>
            <View style ={styles.rightContainer}>
                <Text style ={styles.title} numberOfLines ={3}>{cartItem.product?.title}</Text>
                <View style ={styles.ratingsContainer}>
                    {[0,1,2,3,4].map((el,i) =>
                        <FontAwesome
                        key = {`${cartItem.product?.id}-${i}`}
                        style = {styles.star}
                        name = {i < Math.floor(cartItem.product?.avgRating || 0)? 'star':'star-o'}
                        size = {18}
                        color = {'#e47911'}/>
                    )}
                    <Text>{cartItem.product?.ratings}</Text>
                </View>
                <Text style ={styles.price}>from ${cartItem.product?.price}</Text>
            </View>
        </View>
        <View style = {styles.rowContainer}>
            <QuantitySelector quantity = {cartItem.quantity} setQuantity = {assignQuantity}/>
        </View>
        </View>
    )
};

export default CartProductItem;
