import React, { useRef, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef, SheetProps } from 'react-native-actions-sheet';
import { usePostData } from '../../hook/useCustomData';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

function AddEvent({ sheetId, payload }: SheetProps) {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [eventToDate, setEventToDate] = useState(new Date());
    const [openToDate, setOpenToDate] = useState(false);
    const [eventFromDate, setEventFromDate] = useState(new Date());
    const [openFromDate, setOpenFromDate] = useState(false);
    const [image, setImage] = useState<{ uri: string; type?: string; name?: string; data?: string } | null>(null);

    const postData = usePostData('https://artist-api-indol.vercel.app/event');

    const pickImage = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            const imageData = await RNFS.readFile(result[0].uri, 'base64');
            setImage({
                uri: result[0].uri,
                type: result[0].type ?? 'image/jpeg',
                name: result[0].name ?? 'image.jpg',
                data: imageData
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                console.error(err);
            }
        }
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleSubmit = async () => {
        if (!eventName.trim()) {
            Alert.alert('Error', 'Please enter an event name');
            return;
        }

        setIsLoading(true);
        console.log('Submitting event:', eventName);

        const formData = new FormData();
        formData.append('title', eventName);
        formData.append('description', eventDescription);
        formData.append('location', eventLocation);
        formData.append('fromDate', eventFromDate.toISOString());
        formData.append('toDate', eventToDate.toISOString());

        if (image) {
            console.log('Image:', image);
            formData.append('image', image.data || '');
        }

        console.log('Sending form data:', formData);

        try {
            const response = await postData.mutateAsync(formData);
            console.log('Event added successfully:', response);
            setEventName('');
            setEventDescription('');
            setEventLocation('');
            setImage(null);
            actionSheetRef.current?.hide();
            Alert.alert('Success', 'Event added successfully');
        } catch (error: any) {
            console.error('Error adding event:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            Alert.alert(
                'Error',
                'Failed to add event. Please check your network connection and try again.'
            );
        } finally {
            setIsLoading(false);
        }
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
                <ScrollView>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center', borderBottomWidth: 1, borderColor: '#f0f0f0', padding: 10, borderRadius: 10 }}>Add Event</Text>
                    {/* Image */}
                    {image && (
                        <Image
                            source={{ uri: image.uri }}
                            style={{ width: 200, height: 200, alignSelf: 'center', marginVertical: 10 }}
                        />
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 }}>
                        <Text style={{ color: 'black', flex: 1 }}>Select an Event image:</Text>
                        <TouchableOpacity onPress={pickImage} style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: '#000000' }}>Select Image</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Event Title:</Text>
                    <TextInput
                        placeholder="Enter event title"
                        placeholderTextColor={'#000000'}
                        value={eventName}
                        onChangeText={setEventName}
                        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10, color: '#000000' }}
                    />

                    {/* Description */}
                    <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Event Description:</Text>
                    <TextInput
                        placeholder="Enter event description"
                        placeholderTextColor={'#000000'}
                        value={eventDescription}
                        onChangeText={setEventDescription}
                        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10, color: '#000000' }}
                    />

                    {/* Location */}
                    <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Event Location:</Text>
                    <TextInput
                        placeholder="Enter event location"
                        placeholderTextColor={'#000000'}
                        value={eventLocation}
                        onChangeText={setEventLocation}
                        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10, color: '#000000' }}
                    />

                    {/* From Date */}
                    <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Event Start Date and Time:</Text>
                    <TouchableOpacity
                        onPress={() => setOpenFromDate(true)}
                        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}
                    >
                        <Text style={{ color: '#000000' }}>
                            {formatDateTime(eventFromDate)}
                        </Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={openFromDate}
                        date={eventFromDate}
                        onConfirm={(date) => {
                            setOpenFromDate(false)
                            setEventFromDate(date)
                        }}
                        onCancel={() => {
                            setOpenFromDate(false)
                        }}
                        mode="datetime"
                    />

                    {/* To Date */}
                    <Text style={{ color: 'black', marginHorizontal: 20, marginTop: 20 }}>Enter Event End Date and Time:</Text>
                    <TouchableOpacity
                        onPress={() => setOpenToDate(true)}
                        style={{ borderWidth: 1, borderColor: '#000000', padding: 10, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}
                    >
                        <Text style={{ color: '#000000' }}>
                            {formatDateTime(eventToDate)}
                        </Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={openToDate}
                        date={eventToDate}
                        onConfirm={(date) => {
                            setOpenToDate(false)
                            setEventToDate(date)
                        }}
                        onCancel={() => {
                            setOpenToDate(false)
                        }}
                        mode="datetime"
                    />

                    <TouchableOpacity
                        style={{ backgroundColor: 'gray', padding: 14, borderRadius: 10, marginHorizontal: 50, marginTop: 20 }}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ActionSheet>
    );
}

export default AddEvent;
