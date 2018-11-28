import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { H1, H2, H3 } from 'native-base';
import Expo from 'expo';
import { getAllDays, subscribe } from '../services/day-service';
import baseStyles from '../styles/base';
import { capitalise } from '../utils/strings';
import Colors from '../constants/Colors';
import { atMidnight } from '../utils/dates';
import { standardDeviation, average, percentile, getBuckets, getCounts, range, sum } from '../utils/stats';
import MoodIcon from '../components/MoodIcon';
import {
    VictoryBar,
    VictoryChart,
    VictoryPolarAxis,
    VictoryTheme,
    VictoryLine,
    VictoryBoxPlot,
    VictoryLabel,
    VictoryAxis,
    VictoryStack,
    VictoryArea,
    VictoryGroup,
} from 'victory-native';


const MOODS = Object.keys(Colors.MoodColors);
const COLORS = Object.values(Colors.MoodColors);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const createMoodObject = (start) => {
    const obj = {};
    MOODS.forEach(mood => obj[mood] = start());
    return obj;
};

const emptyDataArray = (n) => [...Array(n).keys()].map(d => ({ x: d, y: 0}));


export default class StatsScreen extends React.Component {
    static navigationOptions = {
        title: 'Stats',
    };

    constructor(props) {
        super(props);
        this.state = {
            pedometerIsAvailable: false,
            moodCountData: emptyDataArray(5),
            moodStepData: MOODS.map((mood, i) => (
                { y: i+1, x: [0] }
            )),
            averageDailyMood: createMoodObject(() => emptyDataArray(7)),
            sleepQualityData: createMoodObject(() => emptyDataArray(5)),
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

        const dailyData = [[], [], [], [], [], [], []];
        days.forEach(day => dailyData[day.date.getDay()].push(day));
        dailyData.push(dailyData.shift());

        let x = 0;
        const moodCountData = Object.keys(Colors.MoodColors).map((mood) => {
            return {
                x: x++,
                y: counts[mood] || 0,
            };
        });

        const moodSteps = createMoodObject(() => []);
        const moodSleepQuality = createMoodObject(() => []);

        days.forEach(day => {
            const seenToday = createMoodObject(() => false);
            day.logs.forEach(({ mood }) => {
                if (!seenToday[mood]) {
                    if (day.steps > 0) {
                        moodSteps[mood].push(day.steps);
                    }
                    if (day.sleep) {
                        moodSleepQuality[mood].push(day.sleep.quality);
                    }
                    seenToday[mood] = true;
                }
            });
        });

        const moodStepData = [];
        let y = 1;
        Object.entries(moodSteps).map(([mood, allSteps]) => {
            if (allSteps.length > 0) {
                allSteps.sort();
                moodStepData.push({
                    y: y++,
                    x: allSteps,
                });
            }
        });


        const averageDailyMood = createMoodObject(() => emptyDataArray(7));

        dailyData.forEach((dayData, i) => {
            dayData.forEach((day) => {
                day.logs.forEach(log => {
                    averageDailyMood[log.mood][i].y++;
                });
            });
        });

        for (let i = 0; i < 7; i++) {
            const total = MOODS.reduce((sum, mood) => sum + averageDailyMood[mood][i].y, 0);
            MOODS.forEach(mood => {
                averageDailyMood[mood][i].y /= total;
            });
        }

        const moodQualityCounts = createMoodObject(() => ({}));
        MOODS.forEach(mood => moodQualityCounts[mood] = getCounts(moodSleepQuality[mood]));

        const sleepQualityData = createMoodObject(() => emptyDataArray(3));
        for (let i = 0; i < 3; i++) {
            const total = MOODS.reduce((sum, mood) => sum + (moodQualityCounts[mood][i] ? moodQualityCounts[mood][i] : 0), 0);
            MOODS.forEach(mood => {
                const count = moodQualityCounts[mood][i] ? moodQualityCounts[mood][i] : 0;
                if (total > 0) {
                    sleepQualityData[mood][i].y = count / total * 100;
                } else {
                    sleepQualityData[mood][i].y = 20;
                }
            });
        }

        this.setState({
            moodCountData,
            moodStepData,
            averageDailyMood,
            sleepQualityData,
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

                <View style={[
                    baseStyles.horizontalContainer,
                    baseStyles.card,
                    baseStyles.largeSideMargin,
                    baseStyles.center,
                    styles.moods
                ]}>
                    {
                        MOODS.map(mood => (
                            <View
                                style={baseStyles.center}
                                key={mood}
                            >
                                <MoodIcon
                                    mood={mood}
                                    size="large"
                                />
                                <Text style={[baseStyles.text, styles.moodName]}>{capitalise(mood)}</Text>
                            </View>
                        ))
                    }
                </View>


                <View style={[
                    baseStyles.card,
                    baseStyles.largeSideMargin,
                    baseStyles.shadow,
                    styles.stats
                ]}>
                    <H1 style={baseStyles.headerText}>Your Mood Wheel</H1>
                    <Text style={baseStyles.text}>
                        A summary of your total number of mood logs
                    </Text>

                    <VictoryChart
                        polar
                        theme={VictoryTheme.material}
                        animate
                    >
                        <VictoryPolarAxis
                            style={{
                                tickLabels: { fill: 'none' },
                                axis: { stroke: 'none' }
                            }}
                            invertAxis
                            labelPlacement="perpendicular"
                        />
                        <VictoryPolarAxis dependentAxis
                            label="Angry"
                            labelPlacement="perpendicular"
                            style={{
                                tickLabels: { fill: 'none' },
                                axisLabel: { angle: 90 }
                            }}
                            axisValue={0}
                        />
                        {
                            MOODS.map((m, i) => i > 0 ? (
                                <VictoryPolarAxis dependentAxis
                                    key={i}
                                    label={capitalise(m)}
                                    labelPlacement="perpendicular"
                                    style={{
                                        tickLabels: { fill: 'none' },
                                    }}
                                    axisValue={i}
                                />
                            ) : null)
                        }
                        <VictoryBar
                            data={this.state.moodCountData}
                            style={{
                                data: {
                                    fill: data => COLORS[data.x],
                                    stroke: 'black', strokeWidth: 1.5,
                                    width: 10,
                                }
                            }}
                        />
                    </VictoryChart>
                </View>


                <View style={[
                    baseStyles.card,
                    baseStyles.largeSideMargin,
                    styles.stats,
                    baseStyles.shadow,
                ]}>
                    <H1 style={baseStyles.headerText}>Daily Mood</H1>
                    <Text style={baseStyles.text}>
                        Your average mood per day
                    </Text>

                    <VictoryChart
                        polar
                        theme={VictoryTheme.material}
                        animate
                    >
                        <VictoryPolarAxis
                            dependentAxis
                            style={{
                                axis: { stroke: 'none' },
                                tickLabels: { fill: 'none' },
                            }}
                        />
                        <VictoryPolarAxis
                            labelPlacement="vertical"
                            tickValues={[...Array(7).keys()]}
                            tickFormat={(i) => DAYS[i]}
                            invertAxis
                        />
                        {
                            MOODS.map(mood => (
                                <VictoryLine
                                    interpolation="catmullRom"
                                    key={mood}
                                    data={this.state.averageDailyMood[mood]}
                                    style={{
                                        data: {
                                            stroke: Colors.MoodColors[mood],
                                            fill: Colors.MoodColorsTransparent[mood],
                                            strokeWidth: 3,
                                        }
                                    }}
                                />
                            ))
                        }
                    </VictoryChart>
                </View>


                <View style={[
                    baseStyles.card,
                    baseStyles.largeSideMargin,
                    styles.stats,
                    baseStyles.shadow,
                ]}>
                    <H1 style={baseStyles.headerText}>Steps</H1>
                    <Text style={baseStyles.text}>
                        Your mood based on your steps in a day
                    </Text>

                    <VictoryChart
                        domainPadding={30}
                        theme={VictoryTheme.material}
                        animate
                    >
                        <VictoryAxis minDomain={{ x: -1 }} />
                        <VictoryAxis
                            dependentAxis
                            invertAxis
                            style={{
                                axis: { stroke: 'none' },
                                tickLabels: { fill: 'none' },
                                ticks: { stroke: 'none' },
                                grid: { stroke: 'none' },
                            }}
                        />
                        <VictoryBoxPlot
                            data={this.state.moodStepData}
                            horizontal
                            style={{
                                min: { stroke: 'black', strokeWidth: 2 },
                                max: { stroke: 'black', strokeWidth: 2 },
                                median: { stroke: 'black', strokeWidth: 2 },
                                q1: {
                                    fill: data => COLORS[data._y-1],
                                    stroke: 'black', strokeWidth: 2,
                                },
                                q3: {
                                    fill: data => COLORS[data._y-1],
                                    stroke: 'black', strokeWidth: 2,
                                }
                            }}
                            barRatio={1.0}
                        />
                    </VictoryChart>
                </View>

                <View style={[
                    baseStyles.card,
                    baseStyles.largeSideMargin,
                    styles.stats,
                    baseStyles.shadow,
                ]}>
                    <H1 style={baseStyles.headerText}>Sleep</H1>
                    <Text style={baseStyles.text}>
                        Your mood based on your sleep quality
                    </Text>

                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={{ x: [30, 0] }}
                    >
                        {
                            MOODS.map(mood => (
                                <VictoryLine
                                    key={mood}
                                    interpolation="basis"
                                    data={this.state.sleepQualityData[mood]}
                                    style={{
                                        data: {
                                            stroke: Colors.MoodColors[mood],
                                            strokeWidth: 3,
                                        }
                                    }}
                                />
                            ))
                        }

                        <VictoryAxis
                            tickValues={[0, 1, 2]}
                            tickFormat={(i) => ['Bad', 'Average', 'Good'][i]}
                        />
                        <VictoryAxis
                            tickFormat={(i) => `${i}%`}
                            dependentAxis
                        />
                    </VictoryChart>
                </View>


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stats: {
        backgroundColor: '#fefefe',
        marginTop: 0,
        marginBottom: 15,
        alignItems: 'center',
    },
    moods: {
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-around',
    }
});
