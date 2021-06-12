import React, { useEffect, useState } from 'react';
import {View,Image, ScrollView, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import CartProductItem from '../../components/CartProductItem'
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import { Product, CartProduct } from '../../models';
import { set } from 'react-native-reanimated';

const ShoppingCartScreen = () => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const navigation =  useNavigation();

    const fetchCartProducts = async () => {
        var userData = await Auth.currentAuthenticatedUser();
        var user = userData.attributes.sub;
        DataStore.query(CartProduct, cp => cp.userSub('eq', user)).then(setCartProducts);
    };

    useEffect(() => {
        fetchCartProducts();
    } ,[]);

    useEffect(() => {
        if (cartProducts.filter(cp => !cp.product).length === 0) {
          return;
        }
    
        const fetchProducts = async () => {
          const products = await Promise.all(
            cartProducts.map(cartProduct =>
              DataStore.query(Product, cartProduct.productID),
            ),
          );
    
          setCartProducts(currentCartProducts =>
            currentCartProducts.map(cartProduct => ({
              ...cartProduct,
              product: products.find(p => p.id === cartProduct.productID),
            })),
          );
        };
    
        fetchProducts();
      }, [cartProducts]);

      useEffect(() => {
        const subscription = DataStore.observe(CartProduct).subscribe(msg =>
          fetchCartProducts(),
        );
        return subscription.unsubscribe;
      }, []);
  

      useEffect(() => {
        const subscriptions = cartProducts.map(cp =>
          DataStore.observe(CartProduct, cp.id).subscribe(msg => {
            if (msg.opType === 'UPDATE') {
              setCartProducts(curCartProducts =>
                curCartProducts.map(cp => {
                  if (cp.id !== msg.element.id) {
                    return cp;
                  }
                  return {
                    ...cp,
                    ...msg.element,
                  };
                }),
              );
            }
          }),
        );
    
        return () => {
          subscriptions.forEach(sub => sub.unsubscribe());
        };
      }, [cartProducts]);

      const price = cartProducts.reduce(
        (sumVal, product) => sumVal + (product?.product?.price || 0) * product.quantity, 0
    );


    if(cartProducts.filter(cp => !cp.product).length !== 0){
        return (
            <ActivityIndicator/>
        )
    }

    const onCheckout = () => {
      navigation.navigate('AddressScreen',{price})
    }

    return(
    <View style ={styles.page}>
        <View >
            <Text style = {{fontSize: 18}}>Subtotal ({cartProducts.length} Items) :
                <Text style = {{color: '#e47911', fontWeight: 'bold'}}>${price.toFixed(2)}</Text>
            </Text>
            <Button text = {'Proceed to CheckOut'} 
             containerStyle = {{backgroundColor : '#e3c905'}}
            onPress = {onCheckout}/>
        </View>
        
        <FlatList
        data = {cartProducts}
        renderItem ={({item}) => <CartProductItem cartItem = {item}/>}
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

export default ShoppingCartScreen;
