import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import format from 'dateformat';
import baseStyles from '../../styles/base';
import Colors from '../../constants/Colors';
import {
    isToday,
    isYesterday,
} from '../../utils/dates';
import LogView from './LogView';


class DayView extends React.Component {
    renderLogs(logs) {
        let i = 0;
        return logs.map(log => (
            <LogView key={i++} log={log} />
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
                    styles.dateContainer,
                    baseStyles.horizontalContainer
                ]}>
                    <Text style={styles.dateHeader}>{this.renderDate(date)}</Text>
                    <View style={baseStyles.horizontalContainer}>
                        <Text style={styles.dateSubHeader}>Steps: {steps} </Text>
                        { sleep ?
                            <Text  style={styles.dateSubHeader}>Sleep: {sleep.quality}</Text> :
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
        marginBottom: 10,
    },
    dateContainer: {
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
    },
    dateHeader: {
        color: Colors.headingTextColor,
        fontSize: 22,
    },
    dateSubHeader: {
        color: Colors.headingTextColor,
        fontSize: 18,
    },
});


export default DayView;
