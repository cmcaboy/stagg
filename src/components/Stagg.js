import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Stagg = (props) => {
    return (
        <View style={styles.staggContainer}>
            <Text>
                Stagg Page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    staggContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Stagg;
