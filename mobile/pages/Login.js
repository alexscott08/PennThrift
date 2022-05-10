import React from 'react';
import { Alert, StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Form from '../components/Form';
import axios from 'axios';
import { getUserProfile, editUserProfile } from "../../client/src/api/ProfileAPI";
const moment = require('moment');


//import { useNavigate } from 'react-router';

function Login({ navigation }) {
    const [error, setError] = React.useState();
    const address = 'http://localhost:4000/api/auth/login'; 


    function userDetails(username,password){
        const data = {
            'username':username,
            'password':password,
            'email':username,
        };

        axios.post(address, data).then(res =>{
            if (res.status === 200) {
                editUserProfile(username, { last_login: res.time }).then(res => {
                    if (res === 'Success! User updated.') {
                        global.LOGGED_IN = true;
                        navigate('/profile', { replace: true })
                    }
                });
            } else if (res.status === 202) {
                const currentTimestamp = moment().unix(); // in seconds
                const currentDatetime = moment(currentTimestamp * 1000).format(
                        'YYYY-MM-DD HH:mm:ss'
                );
                if (Math.abs(new Date(currentDatetime) - new Date(res.data.user.last_login)) > 120000) { //2 minutes
                    editUserProfile(username, { locked_out: false }).then(res => {
                        if (res === 'Success! User updated.') {
                            return setError('You have now regained login access. Please try again to login to your account.');
                        }
                    });
                } else {
                    editUserProfile(username, { locked_out: true }).then(res => {
                        if (res === 'Success! User updated.') {
                            return setError('You have been locked out for too many failed attempts. Please try again later.')
                        }
                    });
                }
            }
        }).catch(err => {
            if (err.message.split(" ").pop() == '401' || err.message.split(" ").pop() == '429') {
                getUserProfile(username).then(res => {
                    if (res != null) {
                        editUserProfile(username, { locked_out: true }).then(res => {
                            console.log(res)
                            if (res === 'Success! User updated.') {
                                return setError('You have been locked out for too many failed attempts. Please try again later.')
                            } else {
                                return null;
                            }
                        });
                    } else {
                        return setError('We don’t recognize that username and password. Please try again.')
                    }
                });   
            }
        });
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