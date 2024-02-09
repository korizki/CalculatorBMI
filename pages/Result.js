import { BackHandler, Image, Modal, ScrollView } from "react-native";
import { TouchableOpacity, Text, Linking, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import result from '../assets/result.png'
import doc from '../assets/doc.png'
import { getItem, setItem } from "../assets/misc";
import { listArticle } from "./listArticle";
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
   const [showModal, setShowModal] = useState(false)
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
         <Modal
            visible={showModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
         >
            <ScrollView style={styles.modalWrapper}>
               <View>
                  <Text style={styles.modalTitle}>Rekomendasi untuk Anda</Text>
                  <View style={styles.artWrapper}>
                     {
                        listArticle.filter(it => it.category == jenisBadan).map(it => (
                           <View key={it.id}>
                              <CardArticle data={it} />
                           </View>
                        ))
                     }
                  </View>
               </View>
               <View >
                  <Text style={styles.modalTitle}>Tips lainnya</Text>
                  <View style={styles.artWrapper}>
                     {
                        listArticle.filter(it => it.category == 'all').map(it => (
                           <View key={it.id}>
                              <CardArticle data={it} />
                           </View>
                        ))
                     }
                  </View>
               </View>
            </ScrollView>
         </Modal>
         <View style={styles.boxres}>
            <Text style={styles.subtitle}>Index BMI</Text>
            <Text style={styles.bmires}>{calcResult ? (calcResult.indexBMI).toFixed(2) : 0}</Text>
            <Text style={[styles.jenisres, cekColor(jenisBadan)]}>{jenisBadan}</Text>
            <Text style={styles.bb}>Kisaran Berat Badan Ideal <Text style={styles.hijau}>{calcResult ? calcResult.bbIdeal : 0} kg</Text></Text>
            <Text style={styles.bb}>Nilai Index Ideal <Text style={styles.hijau}> 18.5 - 24.9 </Text></Text>
            <View style={styles.nasihat}>
               <Text style={styles.tips}>Informasi :</Text>
               <Text style={styles.nasihatkata}>"{motivate[jenisBadan]}"</Text>
               <View style={styles.btnBotHealth}>
                  <TouchableOpacity
                     activeOpacity={0.8}
                     onPress={() => setShowModal(true)}
                     style={styles.btnHealth}
                  >
                     <Text style={styles.healthText}>Tips Sehat</Text>
                  </TouchableOpacity>
               </View>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Home")}>
               <Text style={styles.selesai}>Periksa Kembali</Text>
            </TouchableOpacity>
         </View>
         <Image source={result} style={styles.image} />
      </SafeAreaView>
   )
}

const CardArticle = ({ data }) => {
   const { id, title, link, category } = data
   const handleOpenUrl = useCallback(async () => {
      const isSupport = await Linking.canOpenURL(link)
      if (isSupport) {
         await Linking.openURL(link)
      } else {
         Alert.alert("Sorry, Can't open URL, please choose other.")
      }
   }, [link])
   return (
      <TouchableOpacity
         activeOpacity={0.9}
         onPress={handleOpenUrl}
         style={styles.cardtips}
      >
         {
            category != 'all' ? (
               <Text style={styles.rekomenBadge}>Rekomendasi</Text>
            ) : false
         }
         <Image source={doc} style={styles.cardImg} resizeMode="contain" />
         <View style={styles.cardContent}>
            <Text style={styles.artTitle}>{title}</Text>
            <Text style={styles.artSource}>Source: detik.com</Text>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   artTitle: {
      fontWeight: '500',
      lineHeight: 20,
      color: '#435585',
      marginBottom: 4
   },
   rekomenBadge: {
      position: 'absolute',
      backgroundColor: '#F99417',
      color: 'white',
      top: 4,
      left: 4,
      padding: 4,
      borderRadius: 4,
      zIndex: 2,
      fontSize: 8,
   },
   cardContent: {
      width: '80%',
   },
   artSource: {
      color: 'rgb(150,150,150)'
   },
   cardtips: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: 'center',
      gap: 12,
      borderColor: 'rgb(220,220,220)',
      borderWidth: 0.5,
      padding: 12,
      paddingHorizontal: 8,
      backgroundColor: 'white',
      borderRadius: 8,
   },
   cardImg: {
      width: '15%',
      height: '100%',
   },
   artWrapper: {
      paddingVertical: 8,
      paddingBottom: 32,
      gap: 8,
   },
   modalWrapper: {
      backgroundColor: '#fcfcfc',
      padding: 24,
      paddingTop: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
   },
   modalTitle: {
      fontSize: 20,
      marginBottom: 12,
      fontWeight: '500',
      color: '#435585',
   },
   btnBotHealth: {
      paddingTop: 24,
      alignItems: "flex-end"
   },
   btnHealth: {
      padding: 8,
      paddingHorizontal: 12,
      backgroundColor: '#068FFF',
      borderRadius: 6,
   },
   healthText: {
      color: 'white'
   },
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
      marginBottom: 24
   },
   bmires: {
      textAlign: "center",
      fontSize: 44,
      color: '#435585'
   },
   jenisres: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 16,
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
      textAlign: 'center',
      marginTop: 32,
      fontSize: 16,
      color: '#537188'
   }
});