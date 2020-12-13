import React from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir Next',
    },
});

function Text({ children, style, fullWidth, ...props }) {
    return (
        <RNText style={[styles.text, style]} {...props}>
            {children}
        </RNText>
    );
}

export default Text;
