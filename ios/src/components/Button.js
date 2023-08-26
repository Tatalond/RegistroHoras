

import React from 'react';
import { Text,TouchableOpacity } from 'react-native'


const Button = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: '#22577A',
                justifyContent: 'center',
                alignItems:'center',
                marginTop: 20 
            }}
        >
            <Text style={{color:'#FFF',fontWeight:'bold', fontSize:18 }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;