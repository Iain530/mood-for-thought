import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    AsyncStorage,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { H3, Text } from 'native-base';
import {
    createFakeData,
    getAllDays,
    getDay,
} from '../services/day-service';
import {
    newLog,
    saveLog,
} from '../services/log-service';
import {
    now,
    sortByDate,
} from '../utils/dates';
import format from 'dateformat';
import DayList from '../components/DayList';
import MoodIcon from '../components/MoodIcon';
import baseStyles from '../styles/base';
import Colors from '../constants/Colors';
import { capitalise } from '../utils/strings';


const DAY_KEY_FORMAT = 'dd/mm/yy';


export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Mood Log',
    };

    constructor(props) {
        super(props);
        this.state = {
            days: {},
            loading: true,
        };

    }

    componentDidMount() {
        this.fetchAllDays();
    }

    fetchAllDays = async () => {
        // AsyncStorage.clear();
        // await createFakeData(3);


        const days = await getAllDays();

        const dayKeys = {};
        days.forEach(day => (dayKeys[format(day.date, DAY_KEY_FORMAT)] = day));
        this.setState({
            days: dayKeys,
            loading: false,
        });
    }

    fetchDay = async (date) => {
        const { days } = this.state;
        const day = await getDay(date);
        days[format(date, DAY_KEY_FORMAT)] = day;
        this.setState({ days });
    }

    createLog = async (mood) => {
        const time = now();
        const log = await newLog(time, mood);
        await saveLog(log);
        this.fetchDay(time);
    }

    renderActionButton(mood) {
        return (
            <View style={baseStyles.horizontalContainer} key={mood}>
                <View style={[
                    baseStyles.card,
                    baseStyles.shadow,
                    baseStyles[mood],
                    baseStyles.sideMargin,
                ]}>
                    <Text style={baseStyles.largeText}>{capitalise(mood)}</Text>
                </View>
                <View>
                    <MoodIcon
                        mood={mood}
                        size="extraLarge"
                        shadow
                    />
                </View>
            </View>
        );
    }

    render() {
        let i = 1;
        const actions = Object.keys(Colors.MoodColors).map((mood) => ({
            render: () => this.renderActionButton(mood),
            name: mood,
            position: i++,
        }));

        const days = Object.values(this.state.days);
        days.sort(sortByDate('date'));

        return (
            <View style={baseStyles.container}>
                <ScrollView style={baseStyles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        <DayList days={days} fetchDay={this.fetchDay}/>
                    </View>
                </ScrollView>
                <FloatingAction
                    actions={actions}
                    color={Colors.floatingButtonColor}
                    onPressItem={(name) => this.createLog(name)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
