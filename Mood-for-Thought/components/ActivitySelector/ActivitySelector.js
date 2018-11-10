import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { H1, H2, H3, Text } from 'native-base';
import baseStyles from '../../styles/base';
import { capitalise } from '../../utils/strings';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Activities from '../../constants/Activities';
import ActivityIcon from '../ActivityIcon';



class ActivitySelector extends React.Component {
    renderActivities() {

        const { selected } = this.props;

        // const selected = ['Mobile', 'Shopping'];

        return Activities.map(({ name, icon }) => {
            const color = selected.includes(name) ? 'orange' : Colors.basicTextColorDark;
            return (
                <TouchableOpacity
                    onPress={() => this.props.onPress(name)}
                    key={name}
                >
                    <View style={[
                        baseStyles.center,
                        styles.activitySelector,
                    ]}>
                        <ActivityIcon icon={icon} size="small" color={color} />
                        <Text style={[baseStyles.text, styles.activityName]}>{capitalise(name)}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <View style={[
                baseStyles.horizontalContainer,
                {
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }
            ]}>
                {this.renderActivities()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    activitySelector: {
        width: 76,
        padding: 8,
        margin: 5,
        borderColor: Colors.largeTextColorDark,
        borderWidth: 1,
        borderRadius: Layout.borderRadiusSmall,
    },
    activityName: {
        marginTop: 0,
        fontSize: 13,
    },
});

export default ActivitySelector;
