import React from 'react';
import { Component, useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import ProfileListings from "../components/ProfileListings";
import { Alert, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableHighlight, TextInput } from 'react-native';
import { Linking } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';
// import BouncyCheckboxGroup, {
//     ICheckboxButton,
//   } from "react-native-bouncy-checkbox-group";
// import CheckboxGroup from 'react-native-checkbox-group'
import RadioGroup from 'react-native-radio-buttons-group';
const NewItem = ({ navigation, route }) => {
    const { username } = route.params
    const [itemName, setItemName]           = useState(''); ///
    const [description, setDescription]     = useState(''); ///
    
    const [price, setPrice]                 = useState(0);  ///
    const [image, setImage]                 = useState( );
    const [imageDisplay, setImageDisplay]   = useState('');
    const [userID, setUserID]               = useState('');
    const [user, setUser]                   = useState(username);
    const [error, setError]                 = useState('');
    const [clickable, setClickable]         = useState(true)
    // const conditions = ['New', 'Like new', 'Lightly used', 'Used'];
    // const categories  = ['For Fun', 'Vehicle', 'Apparel', 'Tickets', 
    //                         'Furniture', 'Electronics', 'Books/ notes', 'Miscellaneous']
    //const navigate = useNavigate();
    //const inputRef = useRef()
    const conditionsRadioButtonsData  = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'New',
        value: 'New'
    }, {
        id: '2',
        label: 'Like new',
        value: 'Like new'
    }, {
        id: '3',
        label: 'Lightly used',
        value: 'Lightly used'
    }, {
        id: '4',
        label: 'Used',
        value: 'Used'
    }];
    const categoriesRadioButtonsData  = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'For Fun',
        value: 'For Fun'
    }, {
        id: '2',
        label: 'Vehicle',
        value: 'Vehicle'
    }, {
        id: '3',
        label: 'Apparel',
        value: 'Apparel'
    }, {
        id: '4',
        label: 'Tickets',
        value: 'Tickets'
    },{
        id: '5', // acts as primary key, should be unique and non-empty string
        label: 'Furniture',
        value: 'Furniture'
    }, {
        id: '6',
        label: 'Electronics',
        value: 'Electronics'
    }, {
        id: '7',
        label: 'Books/ notes',
        value: 'Books/ notes'
    }, {
        id: '8',
        label: 'Miscellaneous',
        value: 'Miscellaneous'
    }];
    const [condition, setCondition] = useState(conditionsRadioButtonsData);
    const [category, setCategory] = useState(categoriesRadioButtonsData);

    function onPressConditionsRadioButton(radioButtonsArray) {
        setCondition(radioButtonsArray);
    }
    function onPressCategoriesRadioButton(radioButtonsArray) {
        setCategory(radioButtonsArray);
    }

    useEffect(() =>{
        if(!!userID){
            axios.get('/api/profile/' + user).then(res => {
                setUserID(res.data._id)
            });
        }
    });

    function submit(){
        console.log("her")
        if(itemName && description && category && price && user && userID && image){
            setClickable(false)
            var formData = new FormData();
            formData.append("file", image);
            axios.post('/api/file/upload', formData,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then( res => {
                let imageUrl = res.data; 
                console.log("asd")
                const data = {
                    name:itemName,
                    description:description,
                    category:category,
                    username:user,
                    price:price,
                    owner:user,
                    to_sell:false,
                    to_trade:false,
                    image:imageUrl,
                }
    
                axios.post('/api/profile/item/new', data).then(res => {
                    if(res.data == 'Item added succesfully'){
                        navigate('/profile', { replace:true, username: username })
                    }
                })
            })
        } else {
            setError('Please fill out all items')
        }
    };

    function handleClick(){
        document.getElementById('selectImage').click()
    }
    
    function processImage(image){
        setImage(image);
        setImageDisplay(URL.createObjectURL(image));
    }
    
    // add header
    return(
        <ScrollView style={styles.container}>
            <Header navigation={navigation}/>
            <View>
                <View>
                    <View>
                        <View>
                        <View style={{marginTop: 15}}></View>

                            <Text style={styles.subheading}>
                                Item Name:
                            </Text>
                            <View style={{backgroundColor:"#fff", paddingTop:5, paddingBottom:5, borderWidth:1, borderColor:"#0053bf"}}>
                                <TextInput
                                    style={styles.text_box}
                                    placeholder='Item name'
                                    value={itemName}
                                    onChange={(event) => setItemName(event.target.value)}/>
                            </View>
                        </View>
                        <Image source={imageDisplay}/>

                        <Divider />

                        <View>
                            <Text style={styles.subheading}>Upload an image</Text>
                        </View>

                        <View style={{justifyContent: "center",}}>
                            <Text>[Upload image goes here]</Text>
                        </View>
                        
                        <Divider />
                    </View>


                    <View>
                        <View>
                            <Text style={styles.subheading}>
                                Item Description:
                            </Text>
                            <View style={{backgroundColor:"#fff", paddingTop:5, paddingBottom:5, borderWidth:1, borderColor:"#0053bf"}}>
                                <TextInput
                                    style={styles.text_box}
                                    placeholder='Item description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}/>
                            </View>
                        </View>

                        <View style={{marginTop: 15}}></View>

                        <View>
                            <Text style={styles.subheading}>
                                Price:
                            </Text>
                            <View style={{backgroundColor:"#fff", paddingTop:5, paddingBottom:5,borderWidth:1, borderColor:"#0053bf"}}>
                                <TextInput
                                    style={styles.text_box}
                                    placeholder='Item price'
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}/>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.subheading}>
                                Condition:
                            </Text>
                            <View style={styles.radio_buttons_view}>
                                <RadioGroup 
                                    radioButtons={condition} 
                                    onPress={onPressConditionsRadioButton} 
                                />
                            </View>
                            
                        </View>

                        <View style={{marginBottom: 10}}></View>

                        <View>
                            <Text style={styles.subheading}>
                                Category:
                            </Text>
                            <View style={styles.radio_buttons_view}>
                                <RadioGroup 
                                    radioButtons={category} 
                                    onPress={onPressCategoriesRadioButton} 
                                />
                            </View>
                        </View>


                        <View >
                        {/* <Button
                            title="Press me"
                            onPress={() => alert('Simple Button pressed')}
                        /> */}
                            <Button
                                title= {"Submit"}
                                onPress={() => alert(
                                 'You just posted an item to the marketplace',
                                 'Check out your new listing.',
                                 [
                                     {text: 'OK', onPress: () => submit()}
                                 ],
                                 { cancelable: false }
                                 )}
                                ></Button>
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 15,
    },
    title_text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text_box: {
        margin: 5,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_box_view: {
        backgroundColor:"#fff",
        borderWidth:1,
        borderColor:"#0053bf",
    },
    subheading: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 15,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
    },
    radio_buttons_view: {
        marginLeft: 30,
    },
    radio_buttons_text: {
        marginLeft: 20,
    },
    divider: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        margin: 30,
      },
      submit_button: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#3f9669",
        justifyContent: "center",
        alignItems: "center",
      },
      submit_view: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#3f9669",
        justifyContent: "center",
        alignItems: "center",
      },
      test: {
        backgroundColor: "#3672d1",
      }
  });

export default NewItem;

/*
    

    const [chosenOption, setChosenOption] = useState('');

    const condition_options = [
        { label: 'New', value: 'new' },
        { label: 'Like new', value: 'like new' },
        { label: 'Lightly used', value: 'lightly used' },
        { label: 'Used', value: 'used' }
    ];

    const category_options = [
        { label: 'For Fun', value: 'for fun' },
        { label: 'Vehicle', value: 'vehicle' },
        { label: 'Apparel', value: 'apparel' },
        { label: 'Tickets', value: 'tickets' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Books/ notes', value: 'books/ notes' },
        { label: 'Miscellaneous', value: 'miscellaneous' },
    ];

    const handlePress = () => {
        navigation.navigate('Profile', { username: "girlboss" })
        // Add the new item to the user's collection of listings
    }

    const Separator = () => (
        <View style={styles.separator} />
    );
*/