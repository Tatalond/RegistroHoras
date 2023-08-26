import React from 'react';
import {
    View,
    useWindowDimensions,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native'

const Loader = ({visible = false}) => {
    const { height, width } = useWindowDimensions();
    
    return (
        
        visible && (
        <View style={[style.container, { height, width }]}>
            <View style={style.loader}>
                <ActivityIndicator size="large" color='#38A3A5' />
                <Text style={{marginLeft:15, fontSize:16, color: '#22577A'}}>Loading...</Text>
            </View>
        </View>
        )
    );

};

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    loader: {
        height:70,
        backgroundColor:'#FFF',
        marginHorizontal:50,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20

        

    }


});

export default Loader;