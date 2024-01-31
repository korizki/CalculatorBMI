import { BackHandler, Image } from "react-native";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import result from '../assets/result.png'
import { getItem, setItem } from "../assets/misc";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Result({ navigation }) {
   const motivate = {
      Kurus: "Berat badanmu belum mencapai angka Ideal, tapi jangan khawatir. Usahakan untuk memperhatikan Nutrisi dari makanan yang kamu konsumsi dan jika diperlukan silahkan konsultasikan dengan ahli gizi mu.",
      Gemuk: "Yah, sepertinya kamu mulai gemuk ya. Ayo mulai atur pola makan, dan jangan sampai beratmu terus bertambah. Kamu juga bisa menyisihkan waktu untuk rutin berolahraga agar bisa terus fit dan sehat.",
      "Kegemukan (Obesitas)": "Waduh, sepertinya sudah saatnya untuk mengecangkan ikat pinggang nih. Ayo lakukan pola hidup sehat dengan mulai mengatur pola makan dan latihan fisik seperti berolahraga. Jika perlu, konsultasikan dengan Profesional Kesehatan ya.",
      "Normal (Ideal)": "Yeay, Kamu berhasil. Saat ini berat badanmu sudah ideal, pertahankan konsumsi makanan bernutrisi dan tetap atur pola makanmu. Jika kamu punya waktu luang, kamu juga bisa berolahraga agar tetap Fit dan Bugar. "
   }
   const [gender, setGender] = useState(null)
   const [height, setHeight] = useState(0)
   const [weight, setWeight] = useState(0)
   const [calcResult, setCalcResult] = useState(null)
   const hitungBMI = () => {
      let bbIdeal = 0
      let indexBMI = 0
      bbIdeal = (height - 100) - ((height - 100) * gender == 'Pria' ? 0.1 : 0.15)
      indexBMI = weight / (height / 100 * height / 100)
      setCalcResult({
         bbIdeal,
         indexBMI
      })
      removeStorage()
   }
   const removeStorage = async () => {
      await AsyncStorage.removeItem('gender')
      await AsyncStorage.removeItem('height')
      await AsyncStorage.removeItem('weight')
   }
   useEffect(() => {
      if (gender && height && weight) {
         hitungBMI()
      }
   }, [gender, height, weight])
   const jenisBadan = useMemo(() => {
      if (calcResult) {
         return calcResult.indexBMI < 18.5 ? 'Kurus' : calcResult.indexBMI <= 24.9 ? 'Normal (Ideal)' : calcResult.indexBMI <= 27 ? 'Gemuk' : 'Kegemukan (Obesitas)'
      }
   }, [calcResult])
   const cekColor = useCallback(param => {
      return param == 'Kegemukan (Obesitas)' ? styles.red : param == 'Gemuk' ? styles.yellow : param == 'Kurus' ? styles.kurus : styles.hijau
   }, [])
   useEffect(() => {
      getItem('gender', data => setGender(data))
      getItem('height', data => setHeight(data))
      getItem('weight', data => setWeight(data))
      // prevent back
      const backhandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backhandler.remove()
   }, [])
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.boxres}>
            <Text style={styles.subtitle}>Index BMI</Text>
            <Text style={styles.bmires}>{calcResult ? (calcResult.indexBMI).toFixed(2) : 0}</Text>
            <Text style={[styles.jenisres, cekColor(jenisBadan)]}>{jenisBadan}</Text>
            <Text style={styles.bb}>Kisaran Berat Badan Ideal <Text style={styles.hijau}>{calcResult ? calcResult.bbIdeal : 0} kg</Text></Text>
            <View style={styles.nasihat}>
               <Text style={styles.tips}>Tips :</Text>
               <Text style={styles.nasihatkata}>"{motivate[jenisBadan]}"</Text>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Home")}>
               <Text style={styles.selesai}>Periksa Kembali</Text>
            </TouchableOpacity>
         </View>
         <Image source={result} style={styles.image} />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   wrap: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '80%',
   },
   image: {
      width: 300,
      height: 320,
   },
   button: {
      padding: 16,
      borderRadius: 50,
      position: 'absolute',
      bottom: 0,
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
   boxres: {
      marginVertical: 24
   },
   bmires: {
      textAlign: "center",
      fontSize: 44,
      color: '#435585'
   },
   jenisres: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 16,
      textAlign: 'center'
   },
   red: {
      color: '#DA0C81'
   },
   yellow: {
      color: '#FF5B22'
   },
   kurus: {
      color: '#FFC436'
   },
   hijau: {
      color: '#1B9C85',
      fontWeight: 'bold'
   },
   nasihatkata: {
      textAlign: "center",
      fontStyle: "italic",
      color: '#537188',
      fontSize: 16,
      lineHeight: 24
   },
   tips: {
      color: '#0079FF',
      marginBottom: 8,
      fontSize: 20,
      fontWeight: "bold",
   },
   nasihat: {
      padding: 24,
      width: Dimensions.get("screen").width - 40,
      marginTop: 40,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'rgb(240,240,240)',
      borderRadius: 16,

   },
   bb: {
      fontSize: 16,
      marginTop: 4,
      color: '#818FB4',
      textAlign: 'center'
   },
   selesai: {
      textAlign: 'right',
      marginTop: 32,
      fontSize: 16,
      color: '#537188'
   }
});