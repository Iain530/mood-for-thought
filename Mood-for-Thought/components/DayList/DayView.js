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
    formatDateHeader,
} from '../../utils/dates';
import LogView from './LogView';


class DayView extends React.Component {
    renderLogs(logs) {
        return logs.map(log => (
            <LogView key={log.id} log={log} />
        ));
    }

    render() {
        const { logs, steps, sleep, date } = this.props.day;
        const logList = this.renderLogs(logs);
        return (
            <View style={styles.dayViewContainer}>
                <View style={[
                    baseStyles.horizontalContainer,
                    baseStyles.largeSideMargin,
                    baseStyles.dateContainer,
                ]}>
                    <H2 style={baseStyles.dateHeader}>{formatDateHeader(date)}</H2>
                    <View>
                        <Text style={baseStyles.dateSubHeader}>Steps: {steps} </Text>
                        { sleep ?
                            <Text style={baseStyles.dateSubHeader}>Sleep: {sleep.quality}</Text> :
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
});


export default DayView;
