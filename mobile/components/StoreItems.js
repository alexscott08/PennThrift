import React from 'react';
import axios from "axios";
import Header from "./Header";
import ProfileListings from "./ProfileListings";
import { Alert, StyleSheet, Text, View, Image, Pressable, Button, ScrollView, TouchableHighlight } from 'react-native';
import { Linking } from 'react-native';


const StoreItems = (props) => {

    const item1 = {
        id:1,
        image:"https://collection.cdn-pictorem.com/collection/900_Coastal%20California%20travel%20poster.jpg",
        category: "art",
        name:"Vintage California Postcard",
        owner:props.user,
        price:"10.00"
    };

    const hardcoded_items = [item1];

    const items = props.items ? props.items : hardcoded_items


    //const username = props.username;

    /*
    state = {
        items:[],
        favourites:[],
        updatedItems:[]
    }

    constructor(props){
        super(props);
        this.setState({items:[...props.data]}) 
    }
    componentDidMount(){
        const items = this.props.data;
        if(this.state.items != this.props.data ){
            
            this.setState({items: this.props.data})
        }
    }

    componentDidUpdate(){
        const items = this.state.items;
        if(items != this.props.data ){
            this.setState({items: this.props.data})
         }
    }
    */
    
    /*
    render(){
        
        const favourite = (id) =>{
            const favourites = this.state.favourites;
            if(favourites.includes(id)){
                return require('../assets/favourite_red.png')
            }
            return require('../assets/favourite.png')
        }

        const update = (id) =>{
            let favourites = this.state.favourites;
            if(favourites.includes(id)){
               favourites =  favourites.filter( (item) =>{
                       return item !== id;
                });
               return this.setState({favourites:favourites})
            }
           return this.setState({favourites:[...this.state.favourites,id]})
        }
    */

        return(
            <View>
                {
                    items.map((item, index) => {
                        return(
                            <View key={`${item.name} ${index}`} style={styles.box}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                                </View>                                
                                {/*<Link to={`/store/item/${item._id}`}>*/}
                                <Image
                                    style={{height: 140}}
                                    resizeMode='contain'
                                    source={{uri: item.image}}/>
                                {/*</Link>*/}
                                <View>
                                    <View>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.details}> ${(item.price)}</Text>
                                       {/*<View> 
                                           <Image 
                                            onClick={() => update(item._id)}
                                            source={favourite(item._id)}
                                            />
                                        </View>*/}
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    //}
}

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
        marginBottom: 10,
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
        backgroundColor: "#e3e1de"
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

export default StoreItems;