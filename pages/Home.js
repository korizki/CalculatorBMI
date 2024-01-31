import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import welcome from '../assets/welcome.png'

export default function Home({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.wrap}>
            <Image source={welcome} style={styles.image} contentFit='cover' />
            <Text style={styles.title}>Body Mass Index Calculator</Text>
            <Text style={styles.subtitle}>Temukan Kesehatan Ideal Anda dengan Mudah!</Text>
         </View>
         <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={() => navigation.navigate('Gender')}
         >
            <Text style={styles.buttontext}>Selanjutnya</Text>
         </TouchableOpacity>
         <StatusBar style="auto" />
      </View>
   )
}

const styles = StyleSheet.create({
   wrap: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '80%',
   },
   image: {
      width: 280,
      height: 300,
   },
   button: {
      padding: 16,
      borderRadius: 50,
      position: 'absolute',
      bottom: 40,
      backgroundColor: '#7071E8',
      width: '100%',
   },
   title: {
      marginTop: 42,
      fontWeight: 'bold',
      fontSize: 28,
      color: '#435585',
      textAlign: 'center'
   },
   subtitle: {
      textAlign: 'center',
      fontSize: 16,
      color: '#818FB4',
      marginTop: 12,
      fontStyle: 'italic'
   },
   buttontext: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white'
   },
   container: {
      height: Dimensions.get("screen").height,
      padding: 20,
      backgroundColor: '#EEF5FF',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
});