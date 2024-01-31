import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import man from '../assets/man.png'
import { setItem, getItem } from '../assets/misc';
import woman from '../assets/woman.png'
import genderImg from '../assets/gender.png'
import { useState, useEffect } from 'react';

export default function Gender({ navigation }) {
   const [gender, setGender] = useState(null)
   useEffect(() => {
      gender ? setItem('gender', gender) : false
   }, [gender])
   useEffect(() => {
      getItem('gender', data => {
         if (data) {
            setGender(data)
         }
      })
   }, [])
   return (
      <View style={styles.container}>
         <Image source={genderImg} style={styles.imgBg} contentFit="cover" />
         <View style={styles.wrap}>
            <Text style={styles.title}>Pilih Gender</Text>
            <Text style={styles.subtitle}>Silahkan pilih gender terlebih dahulu ya </Text>
            <TouchableOpacity
               activeOpacity={1}
               style={[styles.boxouter, gender == 'Pria' ? styles.activeSel : false]}
               onPress={() => setGender('Pria')}
            >
               <View style={styles.boxopt}>
                  <View>
                     <Text style={styles.gentop}>Pria</Text>
                     <Text style={styles.genbot}>Man</Text>
                  </View>
                  <Image source={man} style={styles.personimage} contentFit='cover' />
               </View>
            </TouchableOpacity>
            <TouchableOpacity
               activeOpacity={1}
               style={[styles.boxouter, gender == 'Wanita' ? styles.activeSel : false]}
               onPress={() => setGender('Wanita')}
            >
               <View style={styles.boxopt}>
                  <View>
                     <Text style={styles.gentop}>Wanita</Text>
                     <Text style={styles.genbot}>Woman</Text>
                  </View>
                  <Image source={woman} style={styles.personimage} contentFit='cover' />
               </View>
            </TouchableOpacity>
            {
               gender ? (
                  <Text style={[styles.textgen, gender == 'Pria' ? styles.pria : styles.wanita]}>Gender yang kamu pilih {gender}</Text>
               ) : false
            }
         </View>
         <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={() => navigation.navigate('HeightWeight')}
         >
            <Text style={styles.buttontext}>Selanjutnya</Text>
         </TouchableOpacity>
         <StatusBar style="auto" />
      </View>
   )
}

const styles = StyleSheet.create({
   pria: {
      backgroundColor: 'rgba(22, 64, 214, 0.15)',
      color: 'rgb(22, 64, 214)',
   },
   wanita: {
      backgroundColor: 'rgba(218, 12, 129, 0.15)',
      color: 'rgb(218, 12, 129)',
   },
   imgBg: {
      width: 270,
      height: 350,
      position: 'absolute',
      bottom: 0,
      right: 0,
   },
   textgen: {
      fontSize: 16,
      padding: 16,
      marginBottom: 100,
      paddingHorizontal: 24,
      width: '100%',
      textAlign: 'center',
      borderRadius: 50,
      color: 'white'
   },
   activeSel: {
      borderWidth: 4,
      borderColor: '#7071E8'
   },
   genbot: {
      fontSize: 16,
      color: '#818FB4',
      fontStyle: 'italic',
   },
   gentop: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#435585'
   },
   boxouter: {
      width: 'auto',
      borderWidth: 4,
      borderColor: 'rgba(255,255,255,0)',
      borderRadius: 12,
      marginBottom: 32,
   },
   boxopt: {
      borderRadius: 12,
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      paddingHorizontal: 24,
   },
   personimage: {
      width: 70,
      height: 70
   },
   wrap: {
      paddingHorizontal: 24,
      paddingTop: '20%',
      justifyContent: 'center',
      alignSelf: 'stretch',
   },
   image: {
      width: 280,
      height: 300,
   },
   button: {
      padding: 16,
      position: 'absolute',
      bottom: 40,
      borderRadius: 50,
      backgroundColor: '#7071E8',
      width: '100%',
   },
   title: {
      marginTop: 0,
      fontWeight: 'bold',
      fontSize: 28,
      color: '#435585',
      textAlign: 'center'
   },
   subtitle: {
      textAlign: 'center',
      fontSize: 16,
      color: '#818FB4',
      marginTop: 4,
      marginBottom: 60
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