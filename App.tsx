/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

import Router from './src/router';
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify from 'aws-amplify'
import config from './src/aws-exports';
Amplify.configure(config)

 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     flex : 1
   };

   return (
     <View style={backgroundStyle}>
       <StatusBar barStyle = {isDarkMode ? 'light-content' : 'dark-content'}/>
       <Router/>
     </View>
   );
 };

 export default withAuthenticator(App);
