import React, { useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ActionSheet, {
    ActionSheetRef,
    SheetProps,
} from 'react-native-actions-sheet';
import { usePostData } from '../../hook/useCustomData';

function AddCategory({ sheetId, payload }: SheetProps) {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const postData = usePostData('https://artist-api-indol.vercel.app/categories');

    const handleSubmit = () => {
        if (!categoryName.trim()) {
            Alert.alert('Error', 'Please enter a category name');
            return;
        }

        setIsLoading(true);
        console.log('Submitting category:', categoryName);
        postData.mutate(
            { name: categoryName },
            {
                onSuccess: (data) => {
                    console.log('Category added successfully:', data);
                    setCategoryName('');
                    actionSheetRef.current?.hide();
                    Alert.alert('Success', 'Category added successfully');
                },
                onError: (error) => {
                    console.error('Error adding category:', error);
                    Alert.alert(
                        'Error',
                        'Failed to add category. Please check your network connection and try again.'
                    );
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            }
        );
    }

    return (
        <ActionSheet
            id={sheetId}
            ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
            }}
            indicatorStyle={{
                width: 100
            }}
            gestureEnabled={true}>

            <KeyboardAvoidingView style={{ flexGrow: 1, paddingVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center', borderBottomWidth: 1, borderColor: '#f0f0f0', padding: 10, borderRadius: 10 }}>Add Category</Text>
                <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Category Name:</Text>
                <TextInput
                    placeholder="Enter category name"
                    placeholderTextColor={'#000000'}
                    value={categoryName}
                    onChangeText={setCategoryName}
                    style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10, color: '#000000' }}
                />
                <TouchableOpacity
                    style={{ backgroundColor: 'gray', padding: 14, borderRadius: 10, marginHorizontal: 50, marginTop: 20 }}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ActionSheet>
    );
}


export default AddCategory;
