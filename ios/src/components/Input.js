
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={style.label}>
                {label}
            </Text>

            <View
                style={[style.inputContainer,
                {
                    borderColor: error
                        ? '#DC2D22'
                        : isFocused
                            ? '#38A3A5'
                            : '#22577A',
                },
                ]}>
                <Ionicons
                    name={iconName}
                    style={{ fontSize: 22, color: '#38A3A5', marginRight: 10 }}
                />
                <TextInput
                    secureTextEntry ={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{ color: '#22577A', flex: 1 }}
                    {...props}
                />
                {password &&(         
                    <Ionicons
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{fontSize:22, color:'#38A3A5'}}
                        name ={hidePassword ?'eye-sharp' :'eye-off-sharp'}
                    />
                )}
       
            </View>
            {error && ( 
                <Text Text style={{ color: '#DC2D22', fontSize: 12, marginTop: 7 }}>
                    {error}
                </Text> 
            )}
  
        </View >
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: '#38A3A5'
    },
    inputContainer: {
        height: 55,
        backgroundColor: '#DDE6ED',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center'

    },
    placeholder: {
        marginVertical: 5,
        fontSize: 14,
        color: '#38A3A5'
    },
})
export default Input;