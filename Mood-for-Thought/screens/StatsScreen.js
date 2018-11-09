import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Expo from 'expo';
import baseStyles from '../styles/base';
import { atMidnight } from '../utils/dates';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];


export default class StatsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pedometerIsAvailable: false,

        };
    }


    static navigationOptions = {
        title: 'Links',
    };

    async componentDidMount() {
        await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
        Expo.Notifications.addListener(() => alert('Received a notification (sorry)'));
        Expo.Notifications.cancelAllScheduledNotificationsAsync();
        // Expo.Notifications.scheduleLocalNotificationAsync({
        //     title: 'Hello there',
        //     body: 'General kenobi',
        // }, {
        //     time: (new Date()).getTime() + 1000,
        //     repeat: 'minute'
        // });
        this.checkPedometer();
    }

    async checkPedometer() {
        const available = await Expo.Pedometer.isAvailableAsync();
        const now = new Date();
        const steps = await Expo.Pedometer.getStepCountAsync(atMidnight(now), now);

        this.setState({
            pedometerIsAvailable: available,
            steps,
        });
    }

    render() {
        return (
            <ScrollView style={baseStyles.container}>
                <Text>
                    Steps: { this.state.pedometerIsAvailable ?
                        this.state.steps.steps :
                        'Pedometer not available'
                    }
                </Text>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                    <VictoryBar data={data} x="quarter" y="earnings" />
                </VictoryChart>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
