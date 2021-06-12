import {StyleSheet} from 'react-native';

const styles = StyleSheet.create(
    {   
        root:{
            padding: 10,
        },
        row:{
            marginVertical : 5
        },
        label:{
            fontWeight : 'bold'
        },
        input:{
            borderRightWidth : 1,
            borderLeftWidth : 1,
            borderTopWidth : 1,
            borderBottomWidth : 1,
            backgroundColor: 'white',
            padding: 5,
            marginVertical : 5,
            height : 40,
            borderColor: 'black',
            borderRadius: 2
        },
        error:{
            marginVertical: 10,
            color: 'red'
        }
    }
)


export default styles;