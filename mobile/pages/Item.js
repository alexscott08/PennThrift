import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useParams } from "react-router-dom";
import React from 'react';
import Header from "../components/Header";
import { Alert, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableOpacity } from 'react-native';
import StoreItems from "../components/StoreItems"

const Item = props => {

    const [userInfo, setUserInfo]           = useState('');
    const [item, setItem]                   = useState({});
    const [viewer, setViewer]               = useState();
    const [viewed, setViewed]               = useState(false);
    const [favourites, setFavourites]       = useState([]);
    // const [similarItems, setSimilarItems ]  = useState([]);
    //const { id } = useParams();
    const [stateId, setStateId]             = useState(id);

    const id = 3;

    const item3 = {
        id:3,
        image:'http://4everstatic.com/pictures/850xX/animals/bunnies/spotted-bunny-152895.jpg',
        category:"bunny",
        name:"Spotted Goosh",
        owner: props.user ? props.user : "JubJub",
        price:"70,000"
    };

    const items = [item3];

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

    const similarItems = [item1, item2];

    /*
    const getInfo = async () => {
        if (!item || !viewer) {
            const resU = await axios.get('/api/auth/user');
            setViewer(resU.data);
            const resI = await axios.get(`/api/item/${id}`);
            setItem(resI.data)
        }
        if(viewer && !viewed){
            setViewed(true)
            updateViews(id)
        }
    }

    const updateViews = async(id) => {
        const url = `/api/analytics/item/views/${id}`;
        const res = await axios.get(url)
        let views = res.data.views + 1;
        axios.put(url,{views:views})
    }
    getInfo();

    const favourite = (id) =>{
        if(favourites.includes(id)){
            return require('../assets/favourite_red.png')
        }
        return require('../assets/favourite.png')
    }

    const update = (id) =>{
        if(favourites.includes(id)){
           favourites =  favourites.filter( (item) =>{
                   return item !== id;
            });
           return setFavourites(favourites)
        }
       return setFavourites([...favourites,id]);
    }
    
    const filter = (items) =>{
        let similar = []
        items.map( i => { 
            if(i._id == item._id){
                return
            }
            if(i.owner == item.owner){
                similar.push(i)
                return
            }
            if(i.category == item.category){
                similar.push(i)
                return
            }
        } );
        return similar;
    }

    const fecthSimilar = () =>{
        if(similarItems.length === 0 ){
    
            axios.get(`/api/item/all`)
                    .then( res => {setSimilarItems(filter(res.data))})
                    .catch(e => console.log(e))
        }
    }
   
    useEffect(() => {
        if((stateId != id) && stateId){
            window.location.reload()
        }
        fecthSimilar()
    },[similarItems,id, item, viewer, viewed, favourites, stateId])

    */


    return(
        <ScrollView >
            {
            items.map((item) => {
                return(
                    <View key={item.id} style={styles.box}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                          </View>

                            <View>
                                <Image
                                    style={{height: 250}}
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
                            {/*
                            <Image 
                                onClick={() => update(item._id)}
                                source={favourite(item._id)}/>
                            */}
                        </View>

                        <View>
                            <Text style={styles.similar_items}>
                                Similar Items
                            </Text>
                            <StoreItems items={similarItems}/>
                         </View>

                    </View>
                    )
                })
            }
        <View style={{marginBottom: 20}}></View>
    </ScrollView>
    )
};


/*

    return(
        <View>
            <Header/>
            <View>
                <View>
                    <View key={item.id}>
                        <Image source={item.image}/>
                        <View>
                            <Text> 
                                {item.category}
                            </Text>
                            <View>
                                <Text>{item.name}</Text>
                                <Text> ${parseFloat(item.price)}</Text>
                                <View > 
                                    <Link to={`/user/${item.owner}`}>@{item.owner}</Link>
                                    <Image 
                                        onClick={() => update(item._id)}
                                        source={favourite(item._id)}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>
                            Similar Items
                        </Text>
                        <StoreItems data={similarItems}/>
                    </View>
                </View>
            </View>
        </View>
    )
}
*/


const styles = StyleSheet.create({
    similar_items: {
        marginTop: 16,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: 20,
        fontStyle: "italic",
    },
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
        fontSize: 25,
        alignItems: 'center',
      },
      category: {
        fontSize: 25,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 20,
        marginTop: 10
      },
      owner: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 25,
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
        fontSize: 35,
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

export default Item;