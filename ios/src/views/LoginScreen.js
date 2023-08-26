import React from "react";

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

import Input from '../components/Input';
import Button from "../components/Button";
import RegistrationScreen from '../views/RegistrationScreen';
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeScreen from './HomeScreen';

const LoginScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        login: '',
        fullname: '',
        password: '',

    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.login) {
            handleError('Please input login', 'login')
            valid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password')
            valid = false;
        }

        if (valid) {
            login();
        }
    };

    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem('user');
            if (userData) {
                userData = JSON.parse(userData);
                if (inputs.login == userData.login &&
                    inputs.password == userData.password) {
                    AsyncStorage.setItem(
                        'user',
                        JSON.stringify({ ...userData, loggedIn: true }),
                    );
                    navigation.navigate('HomeScreen');

                } else {
                    Alert.alert('Error', 'Invalid Details');
                }

            } else {
                Alert.alert('Error', 'User does not exits');
            }

        }, 3000);

    }

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    console.log(inputs)
    return <SafeAreaView style={style.safeAreaView}>
        <Loader visible={loading} />
        <ScrollView style={style.container}>

            <Text style={style.title}>
                Login In
            </Text>
            <Text style={style.subtitle}>
                Enter your details to login
            </Text>
            <View style={style.containerLogin}>
                <Input
                    placeholder="Insert your login"
                    placeholderTextColor="#38A3A5"
                    iconName="person"
                    label="Login"
                    error={errors.login}
                    onFocus={() => {
                        handleError(null, 'login');
                    }}
                    onChangeText={(text) => handleOnChange(text, "login")}
                />
                <Input
                    placeholder="Insert your password"
                    placeholderTextColor="#38A3A5"
                    iconName="lock-closed"
                    label="Password"
                    password
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password');
                    }}
                    onChangeText={(text) => handleOnChange(text, "password")}
                />
                <Button
                    title="Log in"
                    onPress={validate}
                />
                <Text
                    onPress={() => navigation.navigate(RegistrationScreen)}
                    style={{ color: '#22577A', fontWeight: 'bold', textAlign: 'center', fontSize: 16, marginTop: 7 }}
                >
                    Don't have account? Register
                </Text>
            </View>

        </ScrollView>
    </SafeAreaView>;


};

const style = StyleSheet.create({
    safeAreaView: {
        background: '#ffffff',
        flex: 1

    },
    container: {
        paddingTop: 80,
        paddingHorizontal: 30
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
    containerLogin: {
        marginVertical: 20,
        padding: 15,
        borderRadius: 10
    }
});
export default LoginScreen;