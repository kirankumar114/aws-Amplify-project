import React, {useState, useEffect} from 'react';
import {View,Image,Picker, Text, Alert,  ScrollView, TextInput} from 'react-native';
import styles from './styles'
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {Order, OrderProduct, CartProduct} from '../../models';
import countryList from 'country-list';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Auth, DataStore, API, graphqlOperation} from 'aws-amplify';
import {createPaymentIntent} from '../../graphql/mutations';
import {initPaymentSheet, presentPaymentSheet, useStripe} from '@stripe/stripe-react-native';

const countries =  countryList.getData();


const AddressScreen = () => {
    const[country, setCountry] = useState(countries[10].code);
    const[name, setName] = useState('');
    const[phone, setphone] = useState('');
    const[addRess, setAddress] = useState('');
    const[city, setCity] = useState('');
    const[adressError, setAddressError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const price = Math.floor(route.params?.price*100 || 0) ;


    useEffect(() => {
        fetchPaymentIntent();
      }, []);

      useEffect(() => {
        if(clientSecret){
            initializepayment();
        }
      }, [clientSecret]);

    
    const initializepayment = async () =>{
        if (!clientSecret) {
            return;
          }
          const {error} = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
          });
          console.log('success');
          if (error) {
            Alert.alert(error);
          }
    }

    const openPaymentSheet = async () => {
        if (!clientSecret) {
          return;
        }
        const {error} = await presentPaymentSheet({clientSecret});
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          saveOrder();
          Alert.alert('Success', 'Your payment is confirmed!');
        }
      };
    
    const fetchPaymentIntent = async () => {
        console.log("intent");
        const intent = await API.graphql(
            graphqlOperation(createPaymentIntent, {price}),
          );
        setClientSecret(intent.data.createPaymentIntent.clientSecret);
    }

    const saveOrder = async () => {
        // get user details
        const userData = await Auth.currentAuthenticatedUser();
        // create a new order
        const newOrder = await DataStore.save(
          new Order({
            userSub: userData.attributes.sub,
            name: name,
            phone: phone,
            country: country,
            city : city,
            addRess : addRess,
          }),
        );
        
        const cartItems = await DataStore.query(CartProduct, cp => cp.userSub('eq', userData.attributes.sub));

        await Promise.all(cartItems.map(cp => DataStore.delete(cp)));

    }

    const onCheckOut = () => {
        if(!name){
            Alert.alert("Name can not be empty");
            return;
        }

        if(adressError){
            Alert.alert("Fix the errors befor proceeding");
            return
        }
        console.log("Checkked Out");



        //saveOrder();

        //navigation.reset({
            //index: 0,
            //routes: [{name: 'CartScreen'}],
          //});

        //navigation.navigate('Home');

        openPaymentSheet();
    }

    const validateAddress = () => {
        if (addRess.length < 3){
            setAddressError("Address is Too short");
            return;
        }
        if (addRess.length > 10){
            setAddressError("Address is too long");
            return;
        }
    }

    return(
        <ScrollView style ={styles.root}>
            <View style = {styles.row}>
            <Picker
            selectedValue={country}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                {countries.map(country  => (
                    <Picker.Item key = {country.code} label = {country.name} value = {country.code}/>
                ))}
            </Picker>
            </View>

            <View style = {styles.row}>
                <Text style = {styles.label}>Full Name</Text>
                <TextInput style = {styles.input} placeholder = 'Full Name' value = {name} onChangeText = {setName}/>
            </View>

            <View style = {styles.row}>
                <Text style = {styles.label}>Phone Number</Text>
                <TextInput keyboardType = 'number-pad' style = {styles.input} placeholder = 'Phone Number' value = {phone} onChangeText = {setphone}/>
            </View>

            <View style = {styles.row}>
                <Text style = {styles.label}>Address</Text>
                <TextInput style = {styles.input} placeholder = 'Address' value = {addRess} 
                onChangeText = {(val) => {
                    setAddress(val);
                    setAddressError('');
                }}
                onEndEditing = {validateAddress}/>
                <TextInput style = {[styles.input, {marginVertical : -6}]} placeholder = 'Street' />
                {!!adressError && <Text style = {styles.error}>{adressError}</Text>}
            </View>

            <View style = {[styles.row,{marginVertical:15}]}>
                <Text style = {styles.label}>City</Text>
                <TextInput style = {styles.input} placeholder = 'City' value = {city} onChangeText = {setCity}/>
            </View>

             <Button text = "Check Out" onPress = {onCheckOut}/>
        </ScrollView>
    )
};

export default AddressScreen;
