import React from 'react';
import axios from "axios";
import Header from "../components/Header";
import { Alert, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableHighlight } from 'react-native';


const Chat = ({ navigation, route }) => {

    const greeting = "Hey welcome to the chat"

    return(
        <ScrollView>
            <Header navigation={navigation}/>
                <View>
                    <View>
                        <Text style={styles.title}>{greeting}</Text>
                    </View>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 25,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
      },
  });

export default Chat;