import React from 'react'
import { Text, TouchableOpacity, View, Alert } from 'react-native'

import { SheetManager } from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Slideable } from '../../components/Slidable';
import { useGetData, useDeleteData, usePostData } from '../../hook/useCustomData';
import { styles } from './styles';

function Categories() {
    const { data: categories, isLoading, isError } = useGetData('https://artist-api-indol.vercel.app/categories');
    const addCategory = usePostData('https://artist-api-indol.vercel.app/categories');
    const deleteCategory = useDeleteData('https://artist-api-indol.vercel.app/categories');

    if (isLoading) return (
        <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>
                Loading...
            </Text>
        </View>
    );
    if (isError) return (
        <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>
                Error loading categories
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {categories.map((category: any) => (
                <Slideable
                    key={category._id}
                    onButtonPress={() => {
                        deleteCategory.mutate(category._id, {
                            onSuccess: () => Alert.alert('Category deleted'),
                            onError: () => Alert.alert('Error deleting category'),
                        });
                    }}
                    buttonElement={<View style={styles.deleteButton}>
                        <MaterialCommunityIcons name="delete" size={30} color="red" />
                    </View>}
                >
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>
                            {category.name}
                        </Text>
                    </View>
                </Slideable>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={() => {
                SheetManager.show('addCategory', {
                    payload: {
                        onSubmit: (newCategory: any) => {
                            addCategory.mutate(newCategory, {
                                onSuccess: () => Alert.alert('Category added'),
                                onError: () => Alert.alert('Error adding category'),
                            });
                        },
                    },
                });
            }}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Categories
