import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Settings = (props) => {
    return (
        <View style={styles.settingsContainer}>
            <Text>
            Settings Page
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Settings;
