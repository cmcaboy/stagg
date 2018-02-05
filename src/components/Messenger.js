import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Messenger = (props) => {
    return (
        <View style={styles.messengerContainer}>
            <Text>
                Messenger Page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messengerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Messenger;