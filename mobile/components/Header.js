import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import { Alert, Linking, StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

const Header = (props) =>{

    const navigation = props.navigation;
   
    return(
        <View style={styles.container}>
            {
                //global.LOGGED_IN &&
                //<Text style={{color: 'blue'}} onPress={() => logOut()}>Logout</Text>
            }
            {
                //!global.LOGGED_IN &&
                //<Text style={{color: 'blue'}} onPress={() => navigation.navigate('Register')}>Login</Text>
            }
            <View style={{flexDirection:'row', alignItems:'center'}}>

                <View style={styles.icon_view}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Store')}>
                            <Image
                                source={require('../assets/white_shopping_cart.jpeg')}
                                style={styles.icon_image}/>
                        </TouchableOpacity>
                </View>

                <View style={styles.icon_view}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat')}>
                            <Image
                                source={require('../assets/messages.png')}
                                style={styles.icon_image}/>
                        </TouchableOpacity>
                </View>

                <View style={styles.icon_view}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Favorite')}>
                            <Image
                                source={require('../assets/white_heart.png')}
                                style={styles.icon_image}/>
                        </TouchableOpacity>
                </View>
                
                <View style={styles.icon_view}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Welcome')}>
                            <Image
                                source={require('../assets/placeholder_user_sm.png')}
                                style={styles.icon_image}/>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : "#013587",
      },
      title: {
        marginTop: 16,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon_view: {
        paddingHorizontal: "7.5%",
        paddingVertical: "4%",
      },
      icon_image: {
        height: 30,
        width: 30
      }
  });

export default Header;