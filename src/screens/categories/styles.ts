import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryContainer: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    categoryText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    errorText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
    deleteButton: {
        backgroundColor: '#f0f0f0',
        padding: 7,
        borderRadius: 10,
        marginBottom: 10,
    },
});