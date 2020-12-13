import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Image, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { Text } from '../../components';
import { getUsers } from '../../redux/actions/users';
import { danger } from '../../redux/actions/alert';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 24,
    },
    userContainer: {
        padding: 12,
        backgroundColor: '#f1f1f1',
        marginBottom: 12,
        borderRadius: 8,
    },
    userDetailRow: {
        flexDirection: 'row',
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#dfdfdf',
    },
    userTitle: {
        fontSize: 24,
    },
    userFont16: {
        fontSize: 16,
    },
    userDetailSeparator: {
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    userDetailsContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    userTopSection: {
        marginLeft: 16,
    },
    userContactContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    userEmailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userPhoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    userContactItem: {
        fontSize: 16,
        marginLeft: 4,
    },
});

function capitalize(name) {
    return name[0].toUpperCase() + name.slice(1);
}

function Dashboard(props) {
    const [showInTable, setShowInTable] = React.useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.users);

    React.useEffect(() => {
        dispatch(getUsers()).then((action) => {
            if (action.error) {
                dispatch(danger(action.error.message));
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderItem = React.useCallback(({ item }) => {
        return (
            <View style={styles.userContainer}>
                <View style={styles.userDetailRow}>
                    <Image
                        style={styles.userAvatar}
                        source={{
                            uri: 'https://picsum.photos/200',
                        }}
                    />
                    <View style={styles.userTopSection}>
                        <Text style={styles.userTitle}>
                            {capitalize(item.name)}
                        </Text>
                        <View style={styles.userDetailsContainer}>
                            <Text style={styles.userFont16}>{item.age}</Text>
                            <Text
                                style={[
                                    styles.userFont16,
                                    styles.userDetailSeparator,
                                ]}>
                                ·
                            </Text>
                            <Text style={styles.userFont16}>
                                {capitalize(item.gender)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.userContactContainer}>
                    <View style={styles.userEmailContainer}>
                        <Icon name="email" size={16} />
                        <Text style={styles.userContactItem}>{item.email}</Text>
                    </View>
                    <View style={styles.userPhoneContainer}>
                        <Icon name="phone" size={16} />
                        <Text style={styles.userContactItem}>
                            {item.phoneNo}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Employee List</Text>
                <TouchableOpacity onPress={() => setShowInTable(!showInTable)}>
                    {showInTable ? (
                        <Icon name="format-list-text" size={32} />
                    ) : (
                        <Icon name="table" size={32} />
                    )}
                </TouchableOpacity>
            </View>
            {showInTable ? (
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Age</DataTable.Title>
                        <DataTable.Title>Gender</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Phone No</DataTable.Title>
                    </DataTable.Header>
                    {userInfo.users.map((user) => (
                        <DataTable.Row key={'user-' + user.id}>
                            <DataTable.Cell>{user.name}</DataTable.Cell>
                            <DataTable.Cell>{user.age}</DataTable.Cell>
                            <DataTable.Cell>{user.gender}</DataTable.Cell>
                            <DataTable.Cell>{user.email}</DataTable.Cell>
                            <DataTable.Cell>{user.phoneNo}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            ) : (
                <FlatList
                    keyExtractor={(item) => 'user-' + item.id}
                    ListEmptyComponent={() => {
                        if (userInfo.isLoading) {
                            return <Text>Loading users...</Text>;
                        }
                        return <Text>No users available</Text>;
                    }}
                    data={userInfo.users}
                    renderItem={renderItem}
                />
            )}
        </SafeAreaView>
    );
}

export default Dashboard;
