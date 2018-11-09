import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import format from 'dateformat';
import { H2, Text } from 'native-base';
import baseStyles from '../../styles/base';
import Colors from '../../constants/Colors';
import {
    isToday,
    isYesterday,
} from '../../utils/dates';
import LogView from './LogView';


class DayView extends React.Component {
    renderLogs(logs) {
        return logs.map(log => (
            <LogView key={log.id} log={log} />
        ));
    }

    renderDate(date) {
        if (isToday(date)) {
            return 'Today';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        }
        return format(date, 'dddd, dS mmmm yyyy');
    }

    render() {
        const { logs, steps, sleep, date } = this.props.day;
        const logList = this.renderLogs(logs);
        return (
            <View style={styles.dayViewContainer}>
                <View style={[
                    baseStyles.horizontalContainer,
                    baseStyles.sideMargin,
                    styles.dateContainer,
                ]}>
                    <H2 style={styles.dateHeader}>{this.renderDate(date)}</H2>
                    <View>
                        <Text style={styles.dateSubHeader}>Steps: {steps} </Text>
                        { sleep ?
                            <Text style={styles.dateSubHeader}>Sleep: {sleep.quality}</Text> :
                            null
                        }
                    </View>
                </View>
                {logList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dayViewContainer: {
        marginBottom: 20,
    },
    dateContainer: {
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
    },
    dateHeader: {
        color: Colors.headingTextColor,
    },
    dateSubHeader: {
        color: Colors.headingTextColor,
    },
});


export default DayView;
