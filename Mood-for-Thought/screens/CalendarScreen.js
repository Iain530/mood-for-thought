import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import baseStyles from '../styles/base';


export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    render() {
        return (
            <ScrollView style={baseStyles.container}>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
