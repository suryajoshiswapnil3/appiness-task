import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { TextInput, Text, Button } from '../../components';
import { danger } from '../../redux/actions/alert';
import { login } from '../../redux/actions/auth';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingHorizontal: 24,
    },
    topSection: {
        flex: 3,
        justifyContent: 'center',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 24,
    },
    titleSection: {
        marginBottom: 32,
    },
    loginTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    loginSubTitle: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '600',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    signUpHelperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    signUpHelperText: {
        fontSize: 16,
    },
    signUpHelperTextBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
function validateEmail(email) {
    return emailRegex.test(email);
}

function Login({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(null);

    const { isLoading, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onChangeUsername = React.useCallback((value) => {
        setUsername(value);
        setUsernameError(null);
    }, []);

    const onChangePassword = React.useCallback((value) => {
        setPassword(value);
        setPasswordError(null);
    }, []);

    const onSignIn = React.useCallback(() => {
        let hasError = false;
        if (!username) {
            setUsernameError('The username is required');
            hasError = true;
        } else if (!validateEmail(username)) {
            setUsernameError('The username is invalid');
            hasError = true;
        }

        if (!password) {
            setPasswordError('The password is required');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('The password should have at least 6 characters');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        dispatch(login({ username, password })).then((action) => {
            if (action.error) {
                dispatch(danger(action.error.message));
                return;
            }
            navigation.replace('dashboard');
        });
    }, [username, password, navigation, dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.titleSection}>
                    <Text style={styles.loginTitle}>Let's sign you in.</Text>
                    <Text style={styles.loginSubTitle}>Welcome back.</Text>
                    <Text style={styles.loginSubTitle}>
                        You've been missed!
                    </Text>
                </View>
                <TextInput
                    hasError={!!usernameError}
                    placeholder="Username"
                    helpText={usernameError}
                    value={username}
                    onChangeText={onChangeUsername}
                />
                <TextInput
                    hasError={!!passwordError}
                    placeholder="Password"
                    helpText={passwordError}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={onChangePassword}
                />
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.signUpHelperContainer}>
                    <Text style={styles.signUpHelperText}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpHelperTextBold}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button disabled={isLoading} onPress={onSignIn}>
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default Login;
