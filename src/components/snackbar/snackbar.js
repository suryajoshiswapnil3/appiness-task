import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar as RNSnackbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { clear } from '../../redux/actions/alert';

import Text from '../text';

const styles = StyleSheet.create({
    warning: {
        backgroundColor: '#FF8800',
    },
    danger: {
        backgroundColor: '#CC0000',
    },
    success: {
        backgroundColor: '#007E33',
    },
    alertText: {
        fontSize: 16,
    },
});

function Snackbar(props) {
    const dispatch = useDispatch();
    const alertInfo = useSelector((state) => state.alert);

    const onDismiss = React.useCallback(() => {
        dispatch(clear());
    }, [dispatch]);

    if (!alertInfo.message) {
        return null;
    }

    return (
        <RNSnackbar
            visible={true}
            duration={3000}
            onDismiss={onDismiss}
            style={[styles.base, styles[alertInfo.type]]}>
            <Text style={styles.alertText}>{alertInfo.message}</Text>
        </RNSnackbar>
    );
}

export default Snackbar;
