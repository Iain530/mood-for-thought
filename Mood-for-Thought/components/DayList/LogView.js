import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { H3, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import MoodIcon from '../MoodIcon';
import ActivityIcon from '../ActivityIcon';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { getActivityByName } from '../../constants/Activities';
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
            log: this.state.log,
            refresh: this.refresh,
        });
    }

    refresh = async () => {
        const id = this.state.log.id;
        const log = await getLog(id);
        this.setState({ log });
    }

    renderActivities(activities) {
        if (activities.length > 0) {
            return activities.map((name) => {
                const { icon, displayName } = getActivityByName(name);
                return (
                    <View key={name} style={[
                        styles.activityListItem,
                        baseStyles.horizontalContainer
                    ]}>
                        <ActivityIcon
                            icon={icon}
                            size="extraSmall"
                            color={Colors.basicTextColorDark}
                        />
                        <Text style={[styles.activityListItemName, baseStyles.text]}>
                            {capitalise(displayName ? displayName : name)}
                        </Text>
                    </View>
                );
            });
        }
        return (
            <Text style={[
                baseStyles.lightText,
                baseStyles.italic,
            ]}>
                No activity data
            </Text>
        );
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
                    <View style={[baseStyles.horizontalContainer]}>
                        <View style={{ marginRight: 10 }}>
                            <MoodIcon
                                mood={mood}
                                size="large"
                            />
                        </View>
                        <View style={{alignItems: 'stretch', flex: 1}}>
                            <View style={[styles.logSummary, {}]}>
                                <H3 style={[
                                    baseStyles.largeText,
                                ]}>
                                    {capitalise(mood)}
                                </H3>
                                <View style={[
                                    baseStyles.horizontalContainer,
                                    styles.activityList,
                                    {flexWrap: 'wrap'}
                                ]}>
                                    {this.renderActivities(activities)}
                                </View>
                            </View>
                        </View>
                        <Text style={[baseStyles.largeText, styles.timeStamp]}>
                            {format(time, 'HH:MM')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    logView: {
        justifyContent: 'space-between',
        marginTop: 3,
        marginBottom: 3,
        marginRight: - Layout.sideMargin,
    },
    timeStamp: {
        alignSelf: 'flex-start',
    },
    logSummary: {
        justifyContent: 'space-between',
    },
    cardIcon: {
        marginRight: 10,
    },
    activityList: {
        marginTop: 2,
    },
    activityListItem: {
        paddingLeft: 3,
        paddingRight: 3,
        marginRight: 5,
        marginTop: 5,
        borderRadius: Layout.borderRadiusSmall,
        borderWidth: 1,
        borderColor: Colors.basicTextColorDark,
    },
    activityListItemName: {
        fontSize: 13,
    },
});


export default withNavigation(LogView);
