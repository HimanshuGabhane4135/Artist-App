import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Alert } from 'react-native'
import { Slideable } from '../../components/Slidable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SheetManager } from 'react-native-actions-sheet';

function Categories() {
    return (
        <View style={styles.container}>

            <Slideable
                onButtonPress={() => {
                    Alert.alert('Slide Action');
                }}
                buttonElement={<View style={{ backgroundColor: 'white', padding: 7 }}>
                    <MaterialCommunityIcons name="delete" size={30} color="red" />
                </View>}
            >
                <View style={{ backgroundColor: 'red', width: Dimensions.get('window').width, justifyContent: 'center', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                        Slide me to the left
                    </Text>
                </View>
            </Slideable>

            <TouchableOpacity style={styles.addButton} onPress={() => SheetManager.show('addCategory')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'blue',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
    },
});

export default Categories