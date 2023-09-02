import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Alert,
    P,
    TouchableOpacity

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from "../components/Button";
import Loader from "../components/Loader";
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {

    const [userDetails, setUserDetails] = React.useState();
    const [showPicker, setShowPicker] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const [focusedInput, setFocusedInput] = React.useState(null);
    const [initialTime, setInitialTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [totalTime, setTotalTime] = useState(null);
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleDateInputFocus = () => {
        setShowPicker(true);
    };

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            setShowPicker(false);
            const formattedDate = formatDate(date);
            handleOnChange(formattedDate, "date");
        }
    };
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleTimeInputFocus = (inputName) => {
        setShowTimePicker(true);
        setFocusedInput(inputName);
    };
    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            setShowTimePicker(false);
            const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (focusedInput === 'initialTime') {
                handleOnChange(formattedTime, "initialTime");

            } else if (focusedInput === 'endTime') {
                handleOnChange(formattedTime, "endTime");
            }
        };
    };

    const handleInitialTimeChange = event => {
        console.log('Llega1')
        setInitialTime(moment(Text, 'HH:mm'));

    }
    const handleEndTimeChange = event => {
        console.log('Llega')
        setEndTime(moment(Text, 'HH:mm'));

    }
    useEffect(() => {
        if (initialTime && endTime) {
            console.log('Se ejecuta')
            const duration = moment.duration(endTime.diff(initialTime));
            const hours = duration.asHours();
            setTotalTime(hours);
        }

    }, [initialTime, endTime]);

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

    const [inputs, setInputs] = React.useState({
        user: userDetails?.fullname || '',
        date: '',
        initialTime: '',
        endTime: '',
        totalHours: '',

    });

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.date) {
            handleError('Please input date', 'date')
            valid = false;
        }
        if (!inputs.initialTime) {
            handleError('Please input initialTime', 'initialTime')
            valid = false;
        }
        if (!inputs.endTime) {
            handleError('Please input endTime', 'endTime')
            valid = false;
        }
        if (!inputs.totalHours) {
            handleError('Please input totalHours', 'totalHours')
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
            } catch (error) {
                Alert.alert('Error', 'Something went wrong ' + error);
            }

        }, 3000);

    }

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    return <SafeAreaView style={style.safeAreaView}>
        <Loader visible={loading} />
        <TouchableOpacity
            activeOpacity={0.7}
            style={{ position: 'relative' }}
            onPress={logout}
        >
            <Ionicons name="exit-outline" style={style.icon} />
        </TouchableOpacity>
        <ScrollView style={style.container}>
            <Text style={style.title}>
                Time Record
            </Text>
            <Text style={style.subtitle}>
                Enter your details to time record
            </Text>
            <View style={style.innerContainer}>

                <Input
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#38A3A5"
                    iconName="calendar"
                    label="Date"
                    error={errors.date}
                    value={inputs.date}
                    onFocus={() => {
                        handleDateInputFocus('date');
                        handleError(null, 'date');
                    }}
                    onChangeText={(text) => handleOnChange(text, "date")}

                />
                {showPicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                )}

                <Input
                    placeholder="00:00"
                    placeholderTextColor="#38A3A5"
                    iconName="time"
                    label="Initial Time"
                    error={errors.initialTime}
                    value={inputs.initialTime}
                    onFocus={() => {
                        handleTimeInputFocus('initialTime');
                        handleError(null, 'initialTime');
                    }}
                    onChangeText={(text) => handleInitialTimeChange(text, "initialTime")}

                />
                <Input
                    placeholder="00:00"
                    placeholderTextColor="#38A3A5"
                    iconName="time"
                    label="End Time"
                    error={errors.endTime}
                    value={inputs.endTime}
                    onFocus={() => {
                        handleTimeInputFocus('endTime');
                        handleError(null, 'endTime');
                    }}
                    onChangeText={(text) => handleEndTimeChange(text, "endTime")}
                />
                {showTimePicker && (
                    <DateTimePicker
                        mode="time"
                        is24Hour={true}
                        value={selectedDate}
                        onChange={handleTimeChange}
                    />
                )}
                {totalTime !== null && <P style={{ color: '#000' }}>Total Time: {totalTime.toFixed(2)} hours</P>}
                <Button title="Save" onPress={validate} />

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
        paddingTop: 1,
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

