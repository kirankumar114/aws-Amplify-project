import React, { useState, useCallback } from 'react'

import {View, Text, Image,Pressable,FlatList, StyleSheet, useWindowDimensions} from 'react-native'



const ImageCarousel = ({images}:{images:string[]}) =>  {
    const WindowWidth = useWindowDimensions().width;
    const [activeIndex, setActiveIndex] = useState(0);
    const onFlatListUpdate = useCallback(({ viewableItems }) => {
        if(viewableItems.length > 0){
            setActiveIndex(viewableItems[0].index || 0);
        }
      },[]);
    return(
        <View>
        <FlatList
            data = {images}
            renderItem ={({item})=> (
                <Image style = {[styles.image, {width: WindowWidth -40}]} source = {{uri : item}}/>
            ) }
            horizontal
            showsHorizontalScrollIndicator = {false}
            snapToAlignment = {'center'}
            decelerationRate = {'fast'}
            snapToInterval = {WindowWidth-20}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 50,
              }}
              onViewableItemsChanged={onFlatListUpdate}
        />
        <View style = {styles.dotContainer}>
            {images.map((image, index) => (
                <View style = {[styles.dot , {
                    backgroundColor : index === activeIndex ? '#c9c9c9':'#ededed'
                }]}/>
            ))}
            </View>
        </View>
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
        height: 35,
        backgroundColor:'#e47911',
    },
    text : {
        fontSize : 15,
        fontWeight : 'bold'
    },
    image  : {
        margin : 10,
        height : 250,
        resizeMode :'contain'
    },
    dot:{
        width: 10,
        height : 10,
        borderRadius : 25,
        borderColor : '#c9c9c9',
        borderRightWidth : 1,
        borderLeftWidth : 1,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        margin : 5
    },
    dotContainer:{
        flexDirection : 'row',
        justifyContent : 'center'
    }
});

export default ImageCarousel;  