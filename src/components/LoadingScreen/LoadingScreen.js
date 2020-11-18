import React from 'react';
import {View, Stylesheet, Text} from 'react-native';
import * as consts from '../../consts/consts';


export default function LoadingScreen(){
    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:consts.netflixColor, fontSize:25}}>Loading...</Text>
        </View>
    );
}