
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error
                            ? '#DC2D22'
                            : isFocused
                            ? '#38A3A5'
                            : '#22577A',
                    },
                ]}
            >
                <Ionicons
                    name={iconName}
                    style={styles.icon}
                />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={styles.input}
                    {...props}
                />
                {password && (
                    <Ionicons
                        onPress={() => setHidePassword(!hidePassword)}
                        style={styles.icon}
                        name={hidePassword ? 'eye-sharp' : 'eye-off-sharp'}
                    />
                )}
            </View>
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 3,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: '#38A3A5',
    },
    inputContainer: {
        height: 55,
        backgroundColor: '#DDE6ED',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
    },
    icon: {
        fontSize: 22,
        color: '#38A3A5',
        marginRight: 10,
    },
    input: {
        color: '#22577A',
        flex: 1,
    },
    errorText: {
        color: '#DC2D22',
        fontSize: 12,
        marginTop: 7,
    },
});

export default Input;
