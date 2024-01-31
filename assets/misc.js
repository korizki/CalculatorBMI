import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItem = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, value)
   } catch (err) {
      console.log(err)
   }
}

export const getItem = async (value, action) => {
   try {
      const val = await AsyncStorage.getItem(value)
      action(val)
   } catch (err) {
      console.log(err)
   }
}