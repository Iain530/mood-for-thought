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
import {
    createFakeData,
    getAllDays,
} from '../services/day-service';
import DayList from '../components/DayList';
import baseStyles from '../styles/base';


export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Mood Log',
    };

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            loading: true,
        };

    }

    componentDidMount() {
        this.fetchDays();
    }

    async fetchDays() {
        await createFakeData(30);
        const days = await getAllDays();
        days.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.setState({
            days,
            loading: false,
        });
    }

    render() {
        return (
            <View style={baseStyles.container}>
                <ScrollView style={baseStyles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        <DayList days={this.state.days} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
