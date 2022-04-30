import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';


function Temp() {
  return (
    <View style={styles.container}>
      <Text>Hello Julia</Text>
      <StatusBar  style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Welcome" component={Welcome} />
        <Stack.Screen name = "Register" component={Register} />
        <Stack.Screen name = "Login" component={Login}/>
        <Stack.Screen name = "Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
