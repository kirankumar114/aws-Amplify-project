import React, {useEffect, useRef, useState} from 'react';
import {View,Image,Picker, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import styles from './styles'
//import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {useRoute} from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { Product, CartProduct } from '../../models';
import Auth from '@aws-amplify/auth';


const ProductScreen = () => {
    const[product, setProduct] = useState<Product | undefined>(undefined);
    const[selectedOption, setSelectedOption] = useState("");
    const[quantity, setQuantity] = useState(1);
    const Route = useRoute();

    useEffect(() => {
        if(!Route.params?.id){
            return;
        }
        DataStore.query(Product, Route.params.id).then(setProduct);
    },[Route.params?.id]);

    useEffect(() => {
        if(product?.options){
            setSelectedOption(product.options[0]);
        }
    },[product]);

    const addToCart = () => {
        console.log("userData");
        const addItem = async () =>{
            const userData = await Auth.currentAuthenticatedUser();
            console.log(userData);
            const sub =  userData.attributes.sub;
            if(!product || !userData){
                return;
            }
            if(quantity>0){
                const productAvailable  = await DataStore.query(CartProduct, cp=> cp.productID('eq',product?.id));
                if(productAvailable.length === 0){
                    const cartItem = new CartProduct({
                        quantity: quantity,
                        option: selectedOption,
                        userSub: sub,
                        productID: product?.id
                    });
                    await DataStore.save(cartItem);
                    console.log("Item added");
                }else{
                        await DataStore.save(
                            CartProduct.copyOf(productAvailable[0], updated => {
                              updated.quantity = productAvailable[0].quantity + quantity;
                            }),
                          );
                }
            }else{
                console.warn("Can't add Product into the cart");
            }
        }
        addItem();
    }

    if(!product){
        return <ActivityIndicator/>
    }
    return(
    <ScrollView style ={styles.page}>
        <Text style ={styles.title}>{product.title}</Text>

        <ImageCarousel images = {product.images}/>
        <View>
            <Picker  selectedValue={selectedOption}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}>
                {product.options?.map(option => (
                    <Picker.Item label = {option} value = {option}/>
                ))}
            </Picker>
        </View>
        <Text style ={styles.price}>from ${product.price}</Text>
        <Text style ={styles.description}>{product.description}</Text>
        <QuantitySelector  quantity = {quantity} setQuantity = {setQuantity} />
        <Button text = {'Add to Cart'} 
        containerStyle = {{backgroundColor : '#e3c905'}}
        onPress = {addToCart}/>
        <Button text = {'Buy Now'} onPress = {() => {console.log('Buy Now')}}/>
    </ScrollView>
    )
};

export default ProductScreen;
