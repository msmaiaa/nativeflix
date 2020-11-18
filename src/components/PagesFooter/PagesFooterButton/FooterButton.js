import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function FooterButton(props){
    const page = props.data;
    const handlePress = ()=>{
        props.onPress(page);
    }
    
    return <TouchableOpacity onPress={handlePress} style={props.activePage == page ? styles.activeButton : styles.button}><Text style={props.activePage == page ? styles.activePage : styles.text}>{page}</Text></TouchableOpacity>
}

const styles = StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        height: 30,
        width: 30,
        marginRight:8
    },
    activeButton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        height: 30,
        width: 30,
        marginRight:8
    },
    text:{
        color: '#fff'
    },
    activePage:{
        color:'#E50914'
    }
})