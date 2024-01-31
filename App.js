import Home from "./pages/Home";
import Gender from "./pages/Gender";
import HeightWeight from "./pages/HeightWeight";
import Result from "./pages/Result";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    // <Text>Halo</Text>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gender"
          component={Gender}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
        <Stack.Screen
          name="HeightWeight"
          component={HeightWeight}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={Result}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


