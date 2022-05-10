import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, Button } from 'react-native';
import Form from '../components/Form';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [error, setError] = React.useState();
    const address = 'https://localhost:4000/api/auth/register'; 

    function userDetails(username,password){

        const data = {
            'username':username,
            'password':password,
        };

        
        axios.post(address, data).then(res =>{
            if(res.data === "error"){
                setError('Username has already been taken');
            }else{
                global.LOGGED_IN = true;
                navigation.navigate('Profile', { replace: true, username: data.username })
            }
        })
        
    
    }

    function reset(){
        setError(null)
    }

    return(
        <View >
            <View >
                <Text style={styles.title}>Welcome!</Text>
                    <Form
                        userDetails={userDetails}
                        reset={reset}
                        error={error}
                        name='Register'/>
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

export default Register;