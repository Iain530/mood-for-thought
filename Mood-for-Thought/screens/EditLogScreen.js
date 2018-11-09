import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { H1, H2, H3, Text } from 'native-base';
import format from 'dateformat';
import MoodSelector from '../components/MoodSelector';
import baseStyles from '../styles/base';
import { saveLog } from '../services/log-service';
import {
    isToday,
    isYesterday,
} from '../utils/dates';
import Activities from '../constants/Activities';


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

    askMoodString(time) {
        if (isToday(time)) {
            return `How were you feeling on ${format(time, 'dddd, dS mmmm yyyy')} at ${format(time, 'HH:MM')}?`;
        } else if (isYesterday(time)) {
            return format(time, 'How were you feeling on ?');
        }
        return format(time, 'How were you feeling on ?');
    }

    renderLog(log) {
        if (log !== null) {
            const { mood, activities, time } = log;
            return (
                <View
                    style={[
                        baseStyles.card,
                        baseStyles.container,
                        baseStyles[mood],
                        baseStyles.fullMargin,
                    ]}
                >
                    <View style={styles.sectionContainer}>
                        <H2 style={[baseStyles.text, styles.formHeader]}>
                            {this.askMoodString(time)}
                        </H2>
                        <MoodSelector
                            selected={mood}
                            onPress={(mood) => this.saveLog({ mood })}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <H2 style={[baseStyles.text, styles.formHeader]}>
                            What were you up to?
                        </H2>
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
        paddingBottom: 20,
    },
    formHeader: {
        paddingBottom: 10,
    },
});

export default withNavigation(EditLogScreen);
