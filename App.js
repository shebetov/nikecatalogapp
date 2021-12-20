import React, {Component, useState} from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import SearchableFlatList from './src/SearchableList';
import ResultsScreen from './src/Results';


function AboutScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Щебетов 981063</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar width={200} height={200} source={{ uri: 'https://image.pngaaa.com/683/2376683-middle.png' }} />
            <Text>Щебетов Алексей Анатольевич</Text>
            <Text>test@gmail.com</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function r() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Каталог" component={SearchableFlatList} />
                <Tab.Screen name="Результаты" component={ResultsScreen} />
                <Tab.Screen name="Профиль" component={ProfileScreen} />
                <Tab.Screen name="О разработчике" component={AboutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


