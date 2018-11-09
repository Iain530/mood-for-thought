import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { H1, H3 } from 'native-base';
import { withNavigation } from 'react-navigation';
import MoodIcon from '../MoodIcon';
import baseStyles from '../../styles/base';
import { capitalise } from '../../utils/strings';
import format from 'dateformat';
import { getLog } from '../../services/log-service';


class LogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: this.props.log,
        };
    }

    openLog() {
        const { navigate } = this.props.navigation;
        return navigate('EditLog', {
            log: this.props.log,
            refresh: this.refresh,
        });
    }

    refresh = async () => {
        const id = this.state.log.id;
        const log = await getLog(id);
        this.setState({ log });
    }

    render() {
        const { mood, activities, time } = this.state.log;
        return (
            <TouchableOpacity onPress={() => this.openLog()}>
                <View style={[
                    baseStyles.card,
                    baseStyles.sideMargin,
                    baseStyles[mood],
                    baseStyles.horizontalContainer,
                    styles.logView,
                ]}>
                    <View style={baseStyles.horizontalContainer}>
                        <View style={{ marginRight: 10 }}>
                            <MoodIcon
                                mood={mood}
                                size="large"
                            />
                        </View>
                        <H1 style={[
                            baseStyles.largeText,
                        ]}>
                            {capitalise(mood)}
                        </H1>
                    </View>
                    <H3 style={[baseStyles.largeText, styles.timeStamp]}>
                        {format(time, 'HH:MM')}
                    </H3>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    logView: {
        justifyContent: 'space-between',
        marginTop: 5,
    },
    timeStamp: {

    },
    cardIcon: {
        marginRight: 10,
    }
});


export default withNavigation(LogView);
