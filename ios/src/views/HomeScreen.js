import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    Pressable,
    Modal,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from "../components/Button";
import LoginScreen from "./LoginScreen";

const HomeScreen= ({navigation}) =>{
    const [userDetails, setUserDetails] = React.useState();
    React.useEffect(() =>{
        getUserDetails();
    },[]);
    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData){
            setUserDetails(JSON.parse(userData));
        }
    }
    const logout =() =>{
        AsyncStorage.setItem(
            'user',
            JSON.stringify({...userDetails, loggedIn: false}),
        );
        navigation.navigate('LoginScreen');
    };

    return (<View 
        style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            paddingHorizontal:40
        }}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#22577A'}}>Welcome{userDetails?.fullname} </Text>
            <Button title="Logout" onPress={logout}/>
        </View>
    );
};
export default HomeScreen;

