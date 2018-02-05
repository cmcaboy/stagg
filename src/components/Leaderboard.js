import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Leaderboard = (props) => {
    return (
        <View style={styles.leaderboardContainer}>
            <Text>
            Leaderboard Page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    leaderboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Leaderboard;