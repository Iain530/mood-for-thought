import React from 'react';  // eslint-disable-line no-unused-vars
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ActivityScreen from '../screens/ActivityScreen';
import StatsScreen from '../screens/StatsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LogScreen from '../screens/LogScreen';
import EditLogScreen from '../screens/EditLogScreen';

const LogStack = createStackNavigator({
    Log: LogScreen,
    EditLog: EditLogScreen,
});

LogStack.navigationOptions = {
    tabBarLabel: 'Log',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="list-alt"
        />
    ),
};


const ActivityStack = createStackNavigator({
    Activity: ActivityScreen,
});

ActivityStack.navigationOptions = {
    tabBarLabel: 'Activities',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="bolt"
        />
    ),
};


const StatsStack = createStackNavigator({
    Stats: StatsScreen,
});

StatsStack.navigationOptions = {
    tabBarLabel: 'Stats',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="bar-chart"
        />
    ),
};

const CalendarStack = createStackNavigator({
    Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
    tabBarLabel: 'Calendar',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="calendar"
        />
    ),
};

export default createBottomTabNavigator({
    LogStack,
    ActivityStack,
    StatsStack,
    CalendarStack,
});
