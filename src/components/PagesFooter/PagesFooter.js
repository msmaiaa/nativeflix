import React, {useEffect, useState} from 'react';
import { View, StyleSheet, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FooterButton from './PagesFooterButton/FooterButton';

export const PagesFooter = (data)=>{
    const [activePage, setActivePage] = useState(null);

    useEffect(()=>{
        setActivePage(data.data.activePage)
    },[])

    let elements = []
    for(let i = 1;i <= data.data.pages; i++){
        elements.push(i);
    }

    const navigatePage = (page)=>{
        data.data.handleNavigation(data.data.genre, page)
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={elements}
            renderItem={({item, index}) => <FooterButton data={{item, navigatePage, activePage}}></FooterButton>}
            horizontal={true}
            keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20
  },
});
