import React from 'react';
import {
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import { H3, Text, SwipeRow, Button, Icon } from 'native-base';
import baseStyles from '../../styles/base';
import Colors from '../../constants/Colors';
import {
    formatDateTimeHeader,
    formatDateHeader,
} from '../../utils/dates';
import {
    unCapitalise
} from '../../utils/strings';
import { deleteLog } from '../../services/log-service';
import LogView from './LogView';


class DayView extends React.Component {

    sleepEqual(s1, s2) {
        if (s1 !== null && s2 !== null) {
            return s1.quality === s2.quality;
        }
        return s1 === s2;
    }

    shouldComponentUpdate(nextProps) {
        const { logs, steps, sleep, date } = this.props.day;
        const nextDay = nextProps.day;
        return logs.length !== nextDay.logs.length ||
               steps !== nextDay.steps ||
               date.getTime() !== nextDay.date.getTime() ||
               !this.sleepEqual(sleep, nextDay.sleep);
    }

    async deleteLog(log) {
        Alert.alert(
            'Delete Log',
            `Are you sure you want to delete this ${log.mood} log from ${unCapitalise(formatDateTimeHeader(log.time))}?`,
            [
                {text: 'Delete', onPress: async () => {
                    await deleteLog(log);
                    await this.props.fetchDay(log.time);
                }},
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            ],
            { cancelable: false }
        );
    }


    renderLogs(logs) {
        return logs.map(log => (
            <SwipeRow
                key={log.id}
                disableRightSwipe
                rightOpenValue={-75}
                right={
                    <Button danger onPress={() => this.deleteLog(log)}>
                        <Icon active name="trash" />
                    </Button>
                }
                body={
                    <View style={baseStyles.container}>
                        <LogView log={log}/>
                    </View>
                }
                style={{
                    backgroundColor: Colors.backgroundColor,
                    paddingBottom: 0,
                    paddingTop: 0,
                    marginBottom: 0,
                    marginTop: 0,
                    borderBottomWidth: 0,
                }}
            />
        ));
    }

    render() {
        const { logs, steps, sleep, date } = this.props.day;
        const logList = this.renderLogs(logs);
        return (
            <View style={styles.dayViewContainer}>
                <View style={[
                    baseStyles.horizontalContainer,
                    baseStyles.sideMargin,
                    baseStyles.largeSideMargin,
                    baseStyles.dateContainer,
                ]}>
                    <H3 style={baseStyles.dateHeader}>{formatDateHeader(date)}</H3>
                    <View>
                        <Text style={baseStyles.dateSubHeader}>Steps: {steps} </Text>
                        { sleep && sleep.quality ?
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
