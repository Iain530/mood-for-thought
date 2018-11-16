import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { H1, H2, H3, Text } from 'native-base';
import format from 'dateformat';
import MoodSelector from '../components/MoodSelector';
import ActivitySelector from '../components/ActivitySelector';
import baseStyles from '../styles/base';
import { saveLog } from '../services/log-service';
import {
    isToday,
    isYesterday,
    withinMinutes,
    formatDateTimeHeader,
} from '../utils/dates';
import Activities from '../constants/Activities';
import Layout from '../constants/Layout';


class EditLogScreen extends React.Component {
    static navigationOptions = {
        title: 'Edit',
    };

    constructor(props) {
        super(props);
        this.state = {
            log: null,
        };
    }

    componentWillMount() {
        const { navigation } = this.props;
        const log = navigation.getParam('log', null);
        this.setState({
            log,
        });
    }

    componentDidMount() {
        const { log } = this.state;
        if (log) {
            saveLog(this.state.log).then(() => {
                const { navigation } = this.props;
                const refresh = navigation.getParam('refresh', () => {});
                refresh();
            });
        }
    }

    saveLog = async ({ mood, activities }) => {
        const { navigation } = this.props;
        const refresh = navigation.getParam('refresh', () => {});
        const { log } = this.state;

        if (mood) log.mood = mood;
        if (activities) log.activities = activities;

        this.setState({ log });
        await saveLog(log);
        refresh();
    }

    toggleActivity = (name) => {
        const { activities } = this.state.log;
        const index = activities.indexOf(name);
        if (index >= 0) {
            activities.splice(index, 1);
        } else {
            activities.push(name);
        }
        this.saveLog({ activities });
    }

    askMoodString(time) {
        if (withinMinutes(time, 10)) {
            return 'How are you feeling right now?';
        } else if (isToday(time)) {
            return 'How were you feeling today at this time?';
        } else if (isYesterday(time)) {
            return 'How were you feeling yesterday at this time?';
        }
        return 'How were you feeling at this time?';
    }

    askActivitiesString(time) {
        return withinMinutes(time, 10) ? 'What are you doing?' : 'What were you doing?';
    }

    renderLog(log) {
        if (log !== null) {
            const { mood, activities, time } = log;
            return (
                <View style={baseStyles.container}>
                    <H3 style={[styles.formHeader, baseStyles.dateHeader]}>
                        {formatDateTimeHeader(time)}
                    </H3>
                    <View style={[
                        styles.logCard,
                        styles.sectionContainer,
                        baseStyles.card,
                        baseStyles[mood],
                        baseStyles.largeSideMargin,
                    ]}>
                        <H3 style={[baseStyles.text, baseStyles.sideMargin, styles.cardHeader]}>
                            {this.askMoodString(time)}
                        </H3>
                        <MoodSelector
                            selected={mood}
                            onPress={(mood) => this.saveLog({ mood })}
                        />
                    </View>
                    <H3 style={[baseStyles.dateHeader, styles.formHeader]}>
                        {this.askActivitiesString(time)}
                    </H3>
                    <View style={[
                        styles.logCard,
                        styles.sectionContainer,
                        baseStyles.card,
                        baseStyles.largeSideMargin,
                    ]}>
                        <ActivitySelector
                            selected={activities}
                            onPress={this.toggleActivity}
                        />
                    </View>
                </View>
            );
        }
        return <Text>Loading</Text>;
    }

    render() {
        return (
            this.renderLog(this.state.log)
        );
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    logCard: {
        marginTop: 5,
    },
    formHeader: {
        marginLeft: Layout.sideMargin * 3 + 10,
        marginRight: Layout.sideMargin * 3 + 10,
        marginBottom: 10,
        marginTop: 10,
    },
    cardHeader: {
        marginBottom: 15,
    },
});

export default withNavigation(EditLogScreen);
