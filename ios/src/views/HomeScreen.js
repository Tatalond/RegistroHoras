import React, { useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from "../components/Button";
import Loader from "../components/Loader";
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {

    const [userDetails, setUserDetails] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getUserDetails();
    }, []);
    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    }
    const logout = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: false }),
        );
        navigation.navigate('LoginScreen');
    };

    const consultHours = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: true }),
        );
        navigation.navigate('ConsultHours');
    };
    const NewNess = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: true }),
        );
        navigation.navigate('NewNess');
    };

    const registerScreen = () => {
        AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userDetails, loggedIn: true }),
        );
        navigation.navigate('RecordHours');
    };

    return <SafeAreaView style={style.safeAreaView}>
        <Loader visible={loading} />
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ position: 'relative' }}
                onPress={logout}
            >
                <Ionicons name="exit-outline" style={style.icon} />
            </TouchableOpacity>
        </View>

        <ScrollView style={style.container}>
            <Text style={style.title}>Home</Text>
            <Text style={style.subtitle}>Welcome{userDetails?.fullname} </Text>
            <View style={style.innerContainer}>
                <Button title="Register hours" onPress={registerScreen} />
                <Button title="Consult Hours" onPress={consultHours} />
                <Button title="NewNess" onPress={NewNess} />
            </View>
        </ScrollView>
    </SafeAreaView>;
};
const style = StyleSheet.create({
    safeAreaView: {
        background: '#ffffff',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 30,
    },
    title: {
        color: '#22577A',
        fontSize: 40,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#38A3A5',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    innerContainer: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10
    },
    icon: {
        fontSize: 40,
        color: '#EB636B',
        marginLeft: 10,
        top: 15,
        left: 290,
        zIndex: 10,
    },

});

export default HomeScreen;

