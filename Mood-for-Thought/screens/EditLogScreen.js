import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { H1, H2, H3, Text } from 'native-base';
import MoodSelector from '../components/MoodSelector';
import baseStyles from '../styles/base';
import { saveLog } from '../services/log-service';


class EditLogScreen extends React.Component {
    static navigationOptions = {
        title: 'Edit',
    };

    constructor(props) {
        super(props);
        this.state = {
            log: null,
        };
        this.saveLog = this.saveLog.bind(this);
    }

    componentWillMount() {
        const { navigation } = this.props;
        const log = navigation.getParam('log', null);
        this.setState({
            log,
        });
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
                    <MoodSelector
                        selected={mood}
                        onPress={(mood) => this.saveLog({ mood })}
                    />
                    <TouchableOpacity onPress={() => this.saveLog()}>

                    </TouchableOpacity>
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

});

export default withNavigation(EditLogScreen);
