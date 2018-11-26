import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { H1, H2, H3 } from 'native-base';
import Expo from 'expo';
import { getAllDays, subscribe } from '../services/day-service';
import baseStyles from '../styles/base';
import { capitalise } from '../utils/strings';
import Colors from '../constants/Colors';
import { atMidnight } from '../utils/dates';
import { VictoryBar, VictoryChart,VictoryPolarAxis, VictoryTheme } from 'victory-native';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

let x = 0;
let colors = [];


const MOODS = Object.keys(Colors.MoodColors);
const COLORS = Object.values(Colors.MoodColors);


export default class StatsScreen extends React.Component {
    static navigationOptions = {
        title: 'Stats',
    };

    constructor(props) {
        super(props);

        this.state = {
            pedometerIsAvailable: false,
            moodData: Object.entries(Colors.MoodColors).map(([mood, color]) => {
                colors.push(color);
                return {
                    x: x++,
                    y: 0,
                };
            }),
        };
    }




    async componentDidMount() {
        // await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
        Expo.Notifications.addListener(() => alert('Received a notification (sorry)'));
        Expo.Notifications.cancelAllScheduledNotificationsAsync();
        // Expo.Notifications.scheduleLocalNotificationAsync({
        //     title: 'Hello there',
        //     body: 'General kenobi',
        // }, {
        //     time: (new Date()).getTime() + 1000,
        //     repeat: 'minute'
        // });
        // this.checkPedometer();
        this.listener = subscribe(() => this.loadData());
        this.loadData();
    }

    loadData = async () => {
        const days = await getAllDays();
        const counts = {};
        days.forEach(day => {
            day.logs.forEach(log => {
                counts[log.mood] ? counts[log.mood]++ : counts[log.mood] = 1;
            });
        });

        let x = 0;
        const moodData = Object.keys(Colors.MoodColors).map((mood) => {
            return {
                x: x++,
                y: counts[mood] || 0,
            };
        });

        this.setState({
            moodData,
        });
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
                <VictoryChart
                    polar
                    theme={VictoryTheme.material}
                >
                    {
                        MOODS.map((m, i) => (
                            <VictoryPolarAxis dependentAxis
                                key={i}
                                label={capitalise(m)}
                                labelPlacement="perpendicular"
                                style={{ tickLabels: { fill: 'none' } }}
                                axisValue={i}
                            />
                        ))
                    }
                    <VictoryBar
                        data={this.state.moodData}
                        style={{
                            data: {
                                fill: data => colors[data.x],
                                stroke: 'black', strokeWidth: 2,
                                width: 25,
                            }
                        }}
                    />
                </VictoryChart>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
