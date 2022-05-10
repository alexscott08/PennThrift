import React from 'react';
import axios from "axios";
import Header from "../components/Header";
import { Alert, Dimensions, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableHighlight } from 'react-native';
import { useState } from "react";
//import { getUserProfile } from "../api/ProfileAPI";
//import { Chart } from 'react-chartjs-2';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


const Analytics = ({ navigation, route }) => {

    /*
    const [userInfo, setUserInfo]           = useState('');
    const [imageDisplay, setImageDisplay]   = useState('');
    const [processed, setProcessed]         = useState(false);
    const [user, setUser]                   = useState('');
    const [items, setItems]                 = useState('');
    const [views, setViews]                 = useState([]);
    
    const getUserInfo = async () => {
        if (!userInfo) {
            const res = await axios.get('/api/auth/user');
            setUser(res.data);
            if(user)setUserInfo(await getUserProfile(user));
        }
        if(userInfo && !processed){
            processUserInfo(userInfo);
            setProcessed(true);
        }
        if(views.length == 0 && user ){
            axios.get(`/api/analytics/profile/views/${user}`)
            .then( res => {
                setViews(res.data.profile_views)
            })
        }
        if(user && !items){
            axios.get(`/api/profile/items/${user}`)
                    .then( res => {setItems(res.data.items.reverse())})
                    .catch(e => console.log(e))
        }
    }

    getUserInfo()

    function processUserInfo(info){
        const {class_year, profile_pic, } = info;
        setImageDisplay(profile_pic);
    }

    useState(()=>{},[views])

    const stat = {
        labels: ['Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
            label: 'Views',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            data: views
            }
        ]
    }

    const options = {
        legend: {
          display: false
        },
        scales: {
        }
      }
    */

      const data = {
        labels: ['Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Views',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: '"#013587"',
                data: [32, 25, 28, 17, 27, 28, 22, 30, 29, 33, 37]
            }
        ],
        legend: ["PROFILE VIEWS"]
      };
    
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => "#013587",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
      
    const screenWidth = Dimensions.get("window").width;

    const user = "girlboss"

    const item1 = {
        id:1,
        image:'https://www.quirkbooks.com/sites/default/files/styles/blog_detail_featured_image/public/editor_uploads/original/baby-bunny.jpg?itok=aS4SUzrj',
        category: "bunny",
        name:"Beige Goosh",
        owner: "girlboss",
        price:"12,000",
        views:40
    };
    const item2 = {
        id:2, image:'https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-9/120563330_3251679801596421_5774388050002439408_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=103&ccb=1-6&_nc_sid=dd9801&efg=eyJpIjoidCJ9&_nc_ohc=Xa5gJQfuKkkAX9LvZS3&_nc_ht=scontent-iad3-1.xx&oh=00_AT9PzXjneY7V8ieyvVvQJBn6SXp5jA-PXhGrFK7MNzgZQQ&oe=62987064',
        category:"bunny",
        name:"Black Goosh",
        owner:"girlboss",
        price:"40,000",
        views:90
    };

    const item3 = {
        id:3,
        image:'http://4everstatic.com/pictures/850xX/animals/bunnies/spotted-bunny-152895.jpg',
        category:"bunny",
        name:"Spotted Goosh",
        owner: "girlboss",
        price:"70,000",
        views:25
    };

    const items = [item1, item2, item3];

    return(
        <ScrollView>
            <Header navigation={navigation}/>
            <View>
                <View>
                    <View>
                        <Image style={styles.profile_pic} source={require('../assets/placeholder_user.png')}/>
                    </View>

                    <View>
                        <View style={styles.username_view}>
                            <Text style={styles.username}>{user}'s analytics</Text>
                        </View>

                        <View style={{marginBottom: 10}}></View>

                        <View style={styles.chart_view}>
                            <LineChart
                                data={data}
                                width={screenWidth}
                                height={220}
                                chartConfig={chartConfig}
                            />
                        </View>

                        <View style={{marginBottom: 20}}></View>

                        <View>
                            {
                                items.length > 0 &&
                                items.sort((a, b) => b.views-a.views).map( item => {
                                    return(
                                        <View key={item.id} style={styles.box}>
                                            <View>
                                                <Image
                                                source={{uri: item.image}}
                                                style={{height: 140, marginTop:5}}
                                                resizeMode='contain'/>
                                                <View style={styles.username_view}>
                                                    <Text style={{fontSize:22.5}}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{fontSize:17}}>{item.views}  {item.views == 1 ? 'view' : 'views' }</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{marginBottom: 20}}></View>
                    </View>
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
      username: {
        fontSize: 30,
        fontWeight: "bold",
    },
    username_view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile_pic: {
        resizeMode: 'contain',
        height: 120,
        marginTop: 15,
        marginBottom: 15
    },
    box: {
        borderWidth:3,
        padding:10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width:"70%",
      },
      chart_view: {
        alignItems: 'center',
        justifyContent: 'center',
      }
  });

export default Analytics;