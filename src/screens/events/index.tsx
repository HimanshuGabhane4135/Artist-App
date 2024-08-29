import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDeleteData, useGetData, usePostData } from '../../hook/useCustomData';
import { SheetManager } from 'react-native-actions-sheet';

function Events() {
    const { data: events, isLoading, isError } = useGetData('https://artist-api-indol.vercel.app/event');
    const addEvent = usePostData('https://artist-api-indol.vercel.app/event');
    const deleteEvent = useDeleteData('https://artist-api-indol.vercel.app/event');
    const [expandedId, setExpandedId] = useState<string | null>(null);

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

    const toggleAccordion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    };

    return (
        <View style={styles.container}>
            {events.map((event: any) => (
                <View key={event._id} style={styles.eventItem}>
                    <TouchableOpacity onPress={() => toggleAccordion(event._id)}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                    </TouchableOpacity>
                    {expandedId === event._id && (
                        <View>
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventDetailsText}>Start: {formatDate(event.fromDate)}</Text>
                                <Text style={styles.eventDetailsText}>End: {formatDate(event.toDate)}</Text>
                                <Text style={styles.eventDetailsText}>Location: {event.location}</Text>
                                <Text style={styles.eventDetailsText}>Description: {event.description}</Text>
                            </View>
                            <View>
                                <Image source={{ uri: event?.image }} style={styles.eventImage} />
                            </View>
                        </View>
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={() => {
                SheetManager.show('addEvent', {
                    payload: {
                        onSubmit: (newEvent: any) => {
                            addEvent.mutate(newEvent, {
                                onSuccess: () => Alert.alert('Event added'),
                                onError: () => Alert.alert('Error adding event'),
                            });
                        },
                    },
                });
            }}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Events

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    eventItem: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        overflow: 'hidden',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 12,
        backgroundColor: '#f0f0f0',
        color: 'black'
    },
    eventDetails: {
        padding: 12,
    },
    eventDetailsText: {
        fontSize: 16,
        color: 'black'
    },
    eventImage: {
        width: '100%',
        height: 200,
        objectFit: 'contain',
        backgroundColor: '#f0f0f0',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
