import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// const placeholder = require('../assets/placeholder_item.png')
import { Alert, StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');


const ProfileListings = (props) => {

    const item1 = {
        id:1,
        image:'https://www.quirkbooks.com/sites/default/files/styles/blog_detail_featured_image/public/editor_uploads/original/baby-bunny.jpg?itok=aS4SUzrj',
        category: "bunny",
        name:"Beige Goosh",
        owner:props.user,
        price:"12,000"
    };
    const item2 = {
        id:2, image:'https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-9/120563330_3251679801596421_5774388050002439408_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=103&ccb=1-6&_nc_sid=dd9801&efg=eyJpIjoidCJ9&_nc_ohc=Xa5gJQfuKkkAX9LvZS3&_nc_ht=scontent-iad3-1.xx&oh=00_AT9PzXjneY7V8ieyvVvQJBn6SXp5jA-PXhGrFK7MNzgZQQ&oe=62987064',
        category:"bunny",
        name:"Black Goosh",
        owner:props.user,
        price:"40,000"
    };

    const item3 = {
        id:3,
        image:'http://4everstatic.com/pictures/850xX/animals/bunnies/spotted-bunny-152895.jpg',
        category:"bunny",
        name:"Spotted Goosh",
        owner:props.user,
        price:"70,000"
    };

    const items = props.data || [];

    const navigation = props.navigation;

    return(
        <View >
            {
            items.map((item, index) => {
                return(
                    <View key={`${item.name} ${index}`} style={styles.box}>
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                            <TouchableOpacity
                              onPress={() => Alert.alert("Are you sure you want to remove this item...?")}>
                                <Image
                                  source={require('../assets/delete.png')}
                                  style={styles.delete_icon} />
                            </TouchableOpacity>
                          </View>

                            <View>
                                <Image
                                    style={{height: 140}}
                                    resizeMode='contain'
                                    source={{uri: item.image}}/>
                            </View>

                        </View>
                        
                        <View>
                            <View>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                                <Text>
                                    <Text style={styles.details}> ${item.price}  •  </Text>
                                    <Text style={styles.owner} >@{item.owner}{"\n"}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    )
                })
            }
        <View style={{marginBottom: 20}}></View>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        marginTop: 16,
        marginBottom: 25,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      delete_icon: {
        padding: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginRight: 0
      },
      add_icon: {
        padding: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 10,
        height: 10,
        resizeMode: 'contain'
      },
      details: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 20,
        alignItems: 'center',
      },
      category: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 5,
      },
      owner: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 20,
        alignItems: 'center',
        color: "#0645AD" // link color
      },
      box: {
        borderWidth:3,
        padding:10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
      },
      name: {
        marginTop: 15,
        marginBottom: 5,
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
      },
      button: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 30,
      },
  });

export default ProfileListings;