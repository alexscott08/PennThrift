import React from 'react';
import { Alert, StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Form from '../components/Form';
import axios from 'axios';
//import { useNavigate } from 'react-router';

function Login({ navigation }) {
    const [error, setError] = React.useState();
    const address = 'http://localhost:4000/api/auth/login'; 

    // function that sets user details
    function userDetails(username,password) {
        const data = {
            'username':username,
            'password':password,
            'email':username,
        };

        
        axios.post(address, data).then(res =>{
            if(res.data === 'success'){
                global.LOGGED_IN = true;
                navigation.navigate('Profile', { replace: true, username: data.username })
            }
        }).catch(err =>{
            return err.message.split(" ").pop() == '401' ? 
            setError('We don’t recognize that username and password. Please try again.') : null
        })
        

        // navigation.navigate('Profile', { replace: true, username: data.username })
    }

    function reset() {
        setError(null)
    }

    return(
        <View>
            <View>
                <Text style={styles.title}>Welcome back!</Text>
                    <Form
                        userDetails={userDetails}
                        reset={reset}
                        error={error}
                        name='Login'/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        marginTop: 80,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

  });
export default Login;