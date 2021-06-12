import React, { useEffect, useState } from 'react';
import {View,Image, Text, StyleSheet, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem'
//import products from '../../data/products';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models';

interface homeScrrenProps {
    searchValue : string
}
 
const HomeScreen = ({searchValue}: homeScrrenProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const k = 5;
    useEffect(() => {
        DataStore.query(Product).then(setProducts);
        console.log("Fetching data");
        const clearData = async () => {
            await DataStore.clear();
        }
        const setData = async () => {
            await DataStore.save(
                new Product({
                    title: "Havit Mechanical Keyboard Wired 89 Keys Gaming Keyboard Red Switch Keyboard with PBT Keycaps for PC Gamer",
                    description: `Features & details
                    - New and Refined Keys`,
                    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/keyboard1.jpg',
                    images: [
                      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/keyboard1.jpg',
                      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/keyboard2.jpg'
                    ],
                    options: [
                      'Black Keyboard',
                      'Space Grey Keyboard'
                    ],
                    avgRating: 4.8,
                    ratings: 2989,
                    price: 99.98,
                    oldPrice: 120.06,
                })
              );
        }
        //setData();
        //clearData();

    },[]);

    return(
    <View style ={styles.page}>
        <FlatList
        data = {products}
        renderItem ={({item}) => <ProductItem item = {item}/>}
        keyExtractor =  {(item) => item.id}
        showsVerticalScrollIndicator = {false}
        />
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

export default HomeScreen;
