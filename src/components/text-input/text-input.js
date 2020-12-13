import React from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

import Text from '../text';

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 8,
    },
    input: {
        color: '#050406',
        padding: 8,
        backgroundColor: '#dfdfdf',
        height: 56,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 4,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir Next',
    },
    errorInput: {
        color: '#B00020',
        borderColor: '#B00020',
    },
    helpText: {
        marginTop: 4,
        fontSize: 16,
        color: '#777777',
    },
    errorHelpText: {
        color: '#B00020',
    },
});

function TextInput({ hasError, helpText, ...props }) {
    return (
        <View style={[styles.inputContainer]}>
            <RNTextInput
                autoCapitalize="none"
                placeholderTextColor="#777777"
                style={[styles.input, hasError && styles.errorInput]}
                {...props}
            />
            <Text style={[styles.helpText, hasError && styles.errorHelpText]}>
                {helpText || ' '}
            </Text>
        </View>
    );
}

export default TextInput;
