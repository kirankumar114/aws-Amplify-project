import React from 'react';
import {View,Image, Text, Pressable, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import styles from './styles'

interface ProductItemProps {
    item:{
        id: string,
        title: string,
        image: string,
        avgRating : number,
        ratings: number,
        price : number,
        oldProce?: number
    };
}

const ProductItem = (props: ProductItemProps) => {
    const item = props.item;

    const navigation =  useNavigation();

    const pressItem = () => {
        console.warn("Pressed");
        navigation.navigate('ProductScreen', {id: item.id});
    }

    return( 
        <Pressable onPress = {pressItem}  style ={styles.root}>
            <Image style= {styles.image} source = {{uri: item.image}}/>
            <View style ={styles.rightContainer}>
                <Text style ={styles.title} numberOfLines ={3}>{item.title}</Text>
                <View style ={styles.ratingsContainer}>
                    {[0,1,2,3,4].map((el,i) =>
                        <FontAwesome
                        key = {`${item.id}-${i}`}
                        style = {styles.star}
                        name = {i < Math.floor(item.avgRating)? 'star':'star-o'}
                        size = {18}
                        color = {'#e47911'}/>
                    )}
                    <Text>{item.ratings}</Text>
                </View>
                <Text style ={styles.price}>from ${item.price}</Text>
            </View>
        </Pressable>
    )
};

export default ProductItem;
