import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ActivityList from '../components/ActivityList';


export default class ActivityScreen extends React.Component {
    static navigationOptions = {
        title: 'Activities',
    };


    render() {
        return (
            <View>
                <ActivityList />
            </View>
        );
    }
}


