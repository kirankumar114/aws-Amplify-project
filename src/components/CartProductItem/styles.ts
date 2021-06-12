import {StyleSheet} from 'react-native'

const styles = StyleSheet.create(
    {   
        page:{
            padding: 10
        },
        root :{
            borderEndWidth: 1,
            borderBottomWidth: 1,
            borderTopWidth:1,
            borderLeftWidth:1,
            borderColor:'#d1d1d1',
            borderRadius: 10,
            backgroundColor:'#fff',
            marginVertical: 5,
        },
        row: {
            flexDirection : 'row',
        },
        image:{
            height:150,
            flex:3,
            resizeMode: 'cover'
        },
        rightContainer:{
            padding :10,
            flex : 3
        },
        rowContainer : {
            margin : 5,
            marginVertical :5
        },
        title:{
            fontSize: 15,
            fontWeight:'bold'
        },
        price:{
            fontSize: 15,
            fontWeight:'bold'
        },
        ratingsContainer:{
            flexDirection : 'row',
            alignItems: 'center',
            marginVertical: 5            
        },
        star:{
            margin : 2
        }
    }
)

export default styles;