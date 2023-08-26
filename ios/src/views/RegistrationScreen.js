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
import LoginScreen from "./LoginScreen";
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage'


const RegistrationScreen = ({ navigation }) => {
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
        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname')
            valid = false;
        }
        if (!inputs.password) {
            handleError('Please input password', 'password')
            valid = false;
        } else if (inputs.password.length < 8) {
            handleError('Min password lenght of 8jkj', 'password')
            valid = false;
        } else if (!/[A-Z]/.test(inputs.password)) {
            handleError('Password must contain at least one uppercase letter', 'password');
            valid = false;
        } else if (!/[a-z]/.test(inputs.password)) {
            handleError('Password must contain at least one lowercase letter', 'password');
            valid = false;
        } else if (!/\d/.test(inputs.password)) {
            handleError('Password must contain at least one number', 'password');
            valid = false;
        } else if (!/[!@#$%^&*]/.test(inputs.password)) {
            handleError('Password must contain at least one special character (!@#$%^&*)', 'password');
            valid = false;
        }

        if (valid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                AsyncStorage.setItem('user', JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong '+ error );
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
                Register
            </Text>
            <Text style={style.subtitle}>
                Enter your details to Register
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
                    placeholder="Insert your fullname"
                    placeholderTextColor="#38A3A5"
                    iconName="pencil"
                    label="FullName"
                    error={errors.fullname}
                    onFocus={() => {
                        handleError(null, 'fullname');
                    }}
                    onChangeText={(text) => handleOnChange(text, "fullname")}
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
                    title="Register" onPress={validate}
                />
                <Text
                    onPress={() => navigation.navigate(LoginScreen)}
                    style={{ color: '#22577A', fontWeight: 'bold', textAlign: 'center', fontSize: 16, marginTop: 7 }}
                >
                    Already have account? Login
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
export default RegistrationScreen;