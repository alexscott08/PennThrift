import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewItem from './pages/NewItem';
import Store from './pages/Store';
import Chat from './pages/Chat';
import Favorite from './pages/Favorite';
import Analytics from './pages/Analytics';
import User from './pages/User';
import StoreItems from './components/StoreItems';
import Item from './pages/Item';
import EditProfile from './pages/EditProfile';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Stack = createNativeStackNavigator();
export default function App() {
  const [loggedin, setLoggedin] = useState(null)

  axios.post('https://localhost:4000/api/auth/').then(res => {
    global.LOGGED_IN = res.data[0];
    setLoggedin(res.data[0])
});
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Welcome" component={Welcome} />
        <Stack.Screen name = "Register" component={Register} />
        <Stack.Screen name = "Login" component={Login}/>
        <Stack.Screen name = "Profile" component={Profile}/>
        <Stack.Screen name = "NewItem" component={NewItem}/>
        <Stack.Screen name = "Store" component={Store}/>
        <Stack.Screen name = "Chat" component={Chat}/>
        <Stack.Screen name = "Favorite" component={Favorite}/>
        <Stack.Screen name = "Analytics" component={Analytics}/>
        <Stack.Screen name = "User" component={User}/>
        <Stack.Screen name = "StoreItems" component={StoreItems}/>
        <Stack.Screen name = "Item" component={Item}/>
        <Stack.Screen name = "EditProfile" component={EditProfile}/>
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
