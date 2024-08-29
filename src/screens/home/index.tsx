import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

function Home({ navigation }: any) {
    return (
        <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.container}
        >
            <View style={styles.headingTextWrapper}>
                <Text style={styles.headingText}>
                    Welcome to the Home Screen
                </Text>
                <Text style={styles.subHeadingText}>
                    Please select a option to get started
                </Text>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Albums')} style={styles.button}>
                    <ImageBackground
                        source={require('../../../assets/images/Album.png')}
                        style={styles.buttonImage}
                        resizeMode='cover'
                    >
                        <MaterialCommunityIcons name="image-album" size={50} color="black" />
                        <Text style={styles.buttonBlackText}>
                            Albums
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.button}>
                    <ImageBackground
                        source={require('../../../assets/images/Event.png')}
                        style={styles.buttonImage}
                        resizeMode='cover'
                    >
                        <MaterialCommunityIcons name="calendar-blank" size={50} color="black" />
                        <Text style={styles.buttonBlackText}>
                            Events
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')} style={styles.button}>
                    <ImageBackground
                        source={require('../../../assets/images/Category.png')}
                        style={styles.buttonImage}
                        resizeMode='cover'
                    >
                        <MaterialIcons name="category" size={50} color="black" />
                        <Text style={styles.buttonWhiteText}>
                            Categories
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.button}>
                    <ImageBackground
                        source={require('../../../assets/images/Setting.png')}
                        style={styles.buttonImage}
                        resizeMode='cover'
                    >
                        <MaterialCommunityIcons name="cookie-settings-outline" size={50} color="black" />
                        <Text style={styles.buttonWhiteText}>
                            Settings
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Home