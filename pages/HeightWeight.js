import { Text, View, TouchableOpacity, TextInput, Image, ScrollView, Dimensions } from "react-native";
import { StyleSheet, Modal } from "react-native";
import heightimage from '../assets/height.png'
import calculate from '../assets/Coding.png'
import { StatusBar } from 'expo-status-bar';
import { setItem, getItem } from "../assets/misc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default function HeightWeight({ navigation }) {
   const [height, setHeight] = useState('')
   const [weight, setWeight] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const handleShowResult = () => {
      setIsLoading(true)
      setTimeout(() => {
         setIsLoading(false)
         navigation.navigate('Results')
      }, 3000)
   }
   useEffect(() => {
      weight ? setItem('weight', weight) : false
   }, [weight])
   useEffect(() => {
      height ? setItem('height', height) : false
   }, [height])
   useEffect(() => {
      getItem('height', data => data ? setHeight(data) : false)
      getItem('weight', data => data ? setWeight(data) : false)
   }, [])
   return (
      <SafeAreaView style={styles.container}>
         {/* modal waiting */}
         <Modal
            visible={isLoading}
            transparent={true}
            animationType="slide"
         >
            <View style={styles.modalBg}>
               <View style={styles.modalWrapper}>
                  <Image source={calculate} style={styles.imgLoading} contentFit='cover' />
                  <View style={styles.textLoading}>
                     <Text style={styles.titleLoading}>Proses Menghitung ...</Text>
                     <Text style={styles.subtLoading}>Silahkan tunggu beberapa saat</Text>
                  </View>
               </View>
            </View>
         </Modal>
         <View style={styles.wrap}>
            <Text style={styles.title}>Lengkapi Data </Text>
            <View style={styles.wrapinp}>
               <Text style={styles.subtitle}>Masukkan Tinggi Badanmu ya (cm).  </Text>
               <TextInput value={height} onChangeText={setHeight} inputMode="numeric" placeholder="e.g. 140" style={styles.input} />
            </View>
            <View style={styles.wrapinp}>
               <Text style={styles.subtitle}>Selanjutnya, Berat Badanmu (kg).  </Text>
               <TextInput value={weight} onChangeText={setWeight} inputMode="numeric" placeholder="e.g. 48" style={styles.input} />
            </View>
         </View>

         <Image source={heightimage} style={styles.image} contentFit='cover' />

         <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={handleShowResult}
         >
            <Text style={styles.buttontext}>Selanjutnya</Text>
         </TouchableOpacity>
         <StatusBar style="auto" />
      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   modalBg: {
      justifyContent: "flex-end",
      height: Dimensions.get("window").height,
   },
   textLoading: {
      paddingTop: 48,
   },
   titleLoading: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "500",
   },
   subtLoading: {
      textAlign: "center",
      paddingTop: 12,
      fontSize: 16,
      color: 'rgb(120,120,120)'
   },
   modalWrapper: {
      backgroundColor: 'white',
      height: Dimensions.get('window').height / 2,
      alignItems: 'center',
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      paddingVertical: 48,
   },
   imgLoading: {
      height: Dimensions.get('window').height * 22 / 100,
      width: Dimensions.get('window').height * 22 / 100,
   },
   image: {
      position: 'absolute',
      zIndex: -1,
      width: 320,
      height: 380,
      bottom: 0 - 20,
   },
   wrapinp: {
      alignSelf: 'stretch',
      marginBottom: 24,
      marginTop: 12,
   },
   input: {
      padding: 12,
      fontSize: 18,
      backgroundColor: 'rgb(250,250,250)',
      alignSelf: 'stretch',
      borderColor: 'rgb(230,230,230)',
      color: '#435585',
      borderWidth: 1,
      borderRadius: 8,
   },
   buttontext: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white'
   },
   button: {
      padding: 16,
      borderRadius: 50,
      position: 'absolute',
      bottom: 40,
      backgroundColor: '#7071E8',
      width: '100%',
   },
   container: {
      padding: 20,
      backgroundColor: '#EEF5FF',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: Dimensions.get("screen").height,
   },
   wrap: {
      paddingHorizontal: 24,
      paddingTop: '30%',
      justifyContent: 'flex-start',
      alignSelf: 'stretch',
      height: '80%',
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
      marginTop: 12,
      marginBottom: 12
   },
   boxres: {
      textAlign: 'center',
   },
})