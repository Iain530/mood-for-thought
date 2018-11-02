import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import baseStyles from '../../styles/base';
import { capitalise } from '../../utils/strings'
import format from 'dateformat';
import Assets from '../../constants/Assets';


class LogView extends React.Component {
    render() {
        const { mood, activities, time } = this.props.log;
        return (
            <View style={[
                baseStyles.card,
                baseStyles[mood],
                baseStyles.horizontalContainer,
                styles.row,
            ]}>
                <View style={baseStyles.horizontalContainer}>
                    <Image
                        source={Assets.MoodIcons[mood]}
                        style={[
                            baseStyles.moodIconLarge,
                            {marginRight: 10,}
                        ]}
                    />
                    <Text style={[
                        baseStyles.text,
                        {fontSize: 30}
                    ]}>
                        {capitalise(mood)}
                    </Text>
                </View>
                <Text style={[baseStyles.text, styles.timeStamp]}>{format(time, 'HH:mm')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
    },
    timeStamp: {
        fontSize: 30,
    }
});


export default LogView;
