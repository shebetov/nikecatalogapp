import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, Share, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage } from 'react-native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    counter_text: {
        paddingTop: 20,
        flexDirection: 'column'
    },
});


class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            count: 0,
            scoreboard: []
        };
    }

    componentDidMount() {
        this.readData();
        let results = this.state.scoreboard;
        results.splice(results.length - 1, 1, [this.formatDate(new Date()), 20]);
        this.setState({scoreboard: results});
        this.saveData();
    }

    formatDate = (dt) => {
        return dt.getDay().toString() + "." + dt.getMonth().toString() + '.' +  dt.getFullYear().toString() + ' ' + dt.getHours().toString() + ':' + dt.getMinutes().toString() + ':' + dt.getSeconds().toString();
    }

    saveData = async () => {
        try {
            await AsyncStorage.setItem('scoreboard', JSON.stringify(this.state.scoreboard));
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }


    readData = async () => {
        try {
            let val = JSON.parse(await AsyncStorage.getItem('scoreboard'));

            let curr_date_str = this.formatDate(new Date());
            if (val !== null) {
                val.push([curr_date_str, 0]);
            } else {
                val = [[curr_date_str, 0]];
            }
            this.setState({scoreboard: val});
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.counter_text}>
                    <Text key='title'>Результаты:</Text>
                    {this.state.scoreboard.map(item => (
                        <Text key={item[0]}>{item[0].toString()} - {item[1].toString()}</Text>
                    ))}
                </View>
            </View>
        );
    }
}

export default ResultsScreen;
