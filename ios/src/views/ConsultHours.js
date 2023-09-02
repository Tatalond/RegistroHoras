import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Alert,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from "../components/Button";
import Loader from "../components/Loader";
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ConsultHours = ({ navigation }) => {

    const [userDetails, setUserDetails] = React.useState();
    const [showPicker, setShowPicker] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [focusedInput, setFocusedInput] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleDateInputFocus = (inputName) => {
        setShowPicker(true);
        setFocusedInput(inputName);
    };

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            setShowPicker(false);
            const formattedDate = formatDate(date);
            if (focusedInput === 'initialDate') {
                handleOnChange(formattedDate, "initialDate");

            } else if (focusedInput === 'endDate') {
                handleOnChange(formattedDate, "endDate");
            }

        }
    };
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
        initialDate: '',
        endDate: '',
    });

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.initialDate) {
            handleError('Please input initialDate', 'initialDate')
            valid = false;
        }
        if (!inputs.endDate) {
            handleError('Please input endDate', 'endDate')
            valid = false;
        }
        if (valid) {
            save();
        }
    };

    const save = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                //AsyncStorage.setItem('user', JSON.stringify(inputs));
                // navigation.navigate('LoginScreen');
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
    //console.log('consulthours' +inputs)
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
                Consult Hours
            </Text>
            <View style={style.innerContainer}>
                <Input
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#38A3A5"
                    iconName="calendar"
                    label="Initial Date"
                    error={errors.initialDate}
                    value={inputs.initialDate}
                    onFocus={() => {handleDateInputFocus('initialDate');
                                    handleError(null, 'initialDate');

                    }}
                   onChangeText={(text) => handleOnChange(text, "initialDate")}

                />
                <Input
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#38A3A5"
                    iconName="calendar"
                    label="End Date"
                    error={errors.endDate}
                    value={inputs.endDate}
                    onFocus={() => {handleDateInputFocus('endDate');
                                    handleError(null, 'endDate');
                    }}
                    onChangeText={(text) => handleOnChange(text, "endDate")}

                />
                {showPicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                )}
                <Button title="Consult" onPress={validate} />
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

export default ConsultHours;

