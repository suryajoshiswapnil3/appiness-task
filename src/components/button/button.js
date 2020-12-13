import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        backgroundColor: '#050406',
        padding: 16,
        borderRadius: 8,
    },
    disabled: {
        backgroundColor: '#777777',
    },
});

function Button({ children, disabled, ...props }) {
    const Touchable =
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Touchable activeOpacity={0.5} disabled={disabled} {...props}>
            <View style={[styles.button, disabled && styles.disabled]}>
                {children}
            </View>
        </Touchable>
    );
}

export default Button;
