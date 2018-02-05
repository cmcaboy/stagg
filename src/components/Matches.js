import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Matches = (props) => {
    return (
        <View style={styles.matchesContainer}>
            <Text>
                Stagg Page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    matchesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Matches;