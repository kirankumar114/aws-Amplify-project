import React from 'react'

import {View, Text, Pressable, StyleSheet} from 'react-native'

interface ButtonProps{
    text : string;
    onPress: () => void;
    containerStyle?: object; 
}

const Button = ({text, onPress,containerStyle}: ButtonProps) =>  {


    return(
        <Pressable onPress = {onPress} style = {[styles.root, containerStyle]}>
            <Text  style = {styles.text}>{text}</Text>  
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root : {
        alignItems : 'center', 
        borderRightWidth : 1,
        borderLeftWidth : 1,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor: '#a15e1b',
        justifyContent: 'center',
        borderRadius :5,
        marginVertical: 10,
        height: 50,
        backgroundColor:'#e47911',
    },
    text : {
        fontSize : 20,
        fontWeight : 'bold'
    }
});

export default Button;