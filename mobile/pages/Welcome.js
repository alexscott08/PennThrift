import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
  );

const Welcome = ({ navigation }) =>{
    return(
        <View style={styles.container}>
            <View >
                <View><Image style={styles.image} source={require('../assets/logo.png')}/></View>
                <View >
                       <Text style={styles.title}>Welcome to PennThrift!</Text>
                </View>

                <Text style={styles.tagline}>Your one-stop-shop for buying, trading, gifting, and thrifting at Penn.</Text>

                <Separator />

                <View >
                    <View >
                        <View >
                            <Text style={styles.question}>New Here?</Text>
                        </View>

                        <View style={styles.button}>
                            <TouchableHighlight
                                onPress={() => 
                                    navigation.navigate('Register')}>
                                <View style={styles.register}>
                                    <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Register</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{marginBottom: 10}}></View>

                    <View >
                         <View>
                             <Text style={styles.question}>Returning User?</Text> 
                         </View>

                         <View style={styles.button}>
                            <TouchableHighlight
                                onPress={() => 
                                    navigation.navigate('Login')}>
                                <View style={styles.login}>
                                  <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Login</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                     </View>

                     <View style={{marginBottom: 40}}></View>

                     <View style={styles.button}>
                            <TouchableHighlight
                                onPress={() => 
                                    navigation.navigate('User')}>
                                <View style={styles.test_button}>
                                  <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Test User / StoreItems</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={{marginBottom: 40}}></View>

                  <View style={styles.button}>
                        <TouchableHighlight
                            onPress={() => 
                                navigation.navigate('Item')}>
                            <View style={styles.test_button}>
                              <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Test ITEM</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                 </View>
             </View>
         </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#FFFFFF"
      },
      image: {
        marginTop: 40,
        flex: 1,
        padding: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        alignSelf: 'center',
        // width: '20',
        backgroundColor: "#FFFFFF"
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
      tagline: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      question: {
        marginBottom: 10,
        marginTop: 20,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
      },
      register: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#0053bf",
        justifyContent: "center",
        alignItems: "center",
      },
      login: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        height: 40,
        width:160,
        borderRadius:10,
        backgroundColor : "#cc1d1d",
        justifyContent: "center",
        alignItems: "center",
      },
      test_button: {
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
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        marginBottom: 30,
      },
      button: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 30,
      },
  });

export default Welcome;