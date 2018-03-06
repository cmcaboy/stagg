import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {CirclePicture} from './common';

const MatchListItem = ({name,picture,onPress}) => {
    return (
        <View style={styles.itemContainer}>
            <CirclePicture imageURL={picture} picSize="small"/>
            <Text>
                {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'stretch'
    }
});


export default MatchListItem;