import React from 'react';
import axios from "axios";
import Header from "../components/Header";
import ProfileListings from "../components/ProfileListings";
import { getUserProfile } from "../ProfileAPI.js";
import { Alert, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableHighlight } from 'react-native';
import { Linking } from 'react-native';
import placeholder from '../assets/placeholder_user.png'
import { useState } from 'react';

const Profile = ({ navigation, route }) => {
    
    const { replace, username } = route.params;
    const [state, setState] = useState({});

    const processUserInfo = (info) => {
        const {class_year, bio, interests, venmo, profile_pic } = info;
        setState(state => ({
            ...state,
            bio: bio,
            year: class_year,
            venmo: venmo,
            profile_pic: profile_pic
        }))
        if (interests) {
            setState(state => ({
               ...state,
               interests: interests, 
            }))
        }
    }

    React.useEffect(() => {
        const user = username;
        const items = state.items || [];
        const processed = state.processed || false;
        const userInfo = state.userInfo || '';

        if(items.length === 0 && user){

            axios.get(`http://localhost:4000/api/profile/items/${user}`)
            .then( res => {
                setState(state => ({
                    ...state,
                    items: res.data.items.reverse(),
                }))
            })
            .catch(e => console.log(e))


        }
        
        if (user) {
            getUserProfile(user).then(info => setState(state => ({
                ...state,
                userInfo: info,
            })))
        }
        if(user && userInfo && !processed){
            processUserInfo(userInfo);
            setState(state => ({
                ...state,
                processed: true
            }))
        }
    }, [state]);

    React.useEffect(() => {
        return () => {
          setState({});
        };
      }, []);

    
    const refresh = () =>{
        const user = state.user || '';

        if(user){
            axios.get('http://localhost:4000/api/profile/items/'+ user)
            .then(res => setState(state => ({
                ...state,
                items: res.data.items.reverse(),
            })))
            .catch(e => console.log(e))
        }
    }

    const interests = state.interests || [];

    return(
        <View>
        <Header navigation={navigation}/>
            <ScrollView>
                <View>
                    <View>
                        <View style={styles.bio_box}>
                            <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
                                <Image style={styles.profile_pic} source={state.profile_pic || placeholder}/>
                            </View>

                            <View style={styles.username_view}>
                                <Text style={styles.username}>{username}</Text>
                            </View>

                            <View style={styles.description_view}>
                                <Text style={styles.description_text}>
                                    {state.bio}
                                </Text>
                            </View>

                            <View style={{marginBottom: 10}}></View>
                            
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                        
                                <Image style={{marginLeft: 30, marginRight: 15, width:25, height:30}} source={require('../assets/penn_logo.png')}/>

                                <Text style={styles.title_text}>Class of </Text>
                                <Text style={styles.title_text}>{state.year}</Text>
                            </View>

                            <View style={{marginBottom: 20}}></View>

                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image style={{marginLeft: 25, marginRight: 15, width:30, height:30}} source={require('../assets/heart_icon.png')}/>
                                <Text style={styles.title_text}>Interests: </Text>
                                    <Text>{interests.map((interest) => interest+ ", ")}</Text>
                            </View>

                            <View style={{marginBottom: 20}}></View>

                            <View>
                                <View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Image style={{marginLeft: 30, marginRight: 15, width:25, height:30}} source={require('../assets/vimeo.png')}/>
                                        <Text style={styles.venmo_text}>{state.venmo}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{marginBottom: 10}}></View>
                        </View>

                        <View style={{marginBottom: 10}}></View>

                        <View>

                        <View style={{flexDirection:'row', alignItems:'center'}}>

                            <View style={styles.button}>
                                <Pressable
                                    onPress={() => 
                                        navigation.navigate('Analytics')}
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD">
                                    <View style={styles.analytics_button}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>View Analytics</Text>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.button}>
                                <Pressable
                                    onPress={() => 
                                        navigation.navigate('EditProfile', { replace: true, username: username })}
                                    activeOpacity={0.6}
                                    underlayColor="#DDDDDD">
                                    <View style={styles.analytics_button}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>Edit Profile</Text>
                                    </View>
                                </Pressable>
                            </View>

                            <View style={styles.button}>
                                <Pressable
                                    onPress={() => 
                                        navigation.navigate('NewItem', { username: username })}>
                                    <View style={styles.new_item_button}>
                                        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>Add New Item</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                            
                        <View>
                            <ProfileListings
                                refresh={refresh}
                                data={state.items}
                                user={username}
                                navigation={navigation}
                                />
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={{marginBottom: 150}}></View>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    bio_box: {
        borderWidth:3,
        padding:10,
        margin: 10,
        // backgroundColor:"#ababab"
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title_text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    venmo_text: {
        fontSize: 20,
        color: "#0645AD", // link color
    },
    title_view: {
        paddingLeft: 25,
    },
    description_text: {
        color: "black",
        textShadowRadius: 1,
        fontSize: 20,
        fontStyle: 'italic'
    },
    description_view: {
        color: "black",
        textDecorationColor: "yellow",
        textShadowColor: "red",
        textShadowRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:15,
        marginBottom:20
    },
    profile_pic: {
        resizeMode: 'contain',
        height: 200,
        width: 200,
        marginTop: 15,
        marginBottom: 15
    },
    username: {
        fontSize: 35,
        fontWeight: "bold",
    },
    username_view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 20,
      },
    analytics_button: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#0067b0",
        justifyContent: "center",
        alignItems: "center",
      },
    new_item_button: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#3f9669",
        justifyContent: "center",
        alignItems: "center",
      }
  });

export default Profile;