import React from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';
import baseStyles from '../styles/base';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import { capitalise } from '../utils/strings';


class MoodSelector extends React.Component {
    render() {
        const { mood, size } = this.props;
        return (
            <Image
                source={Assets.MoodIcons[mood]}
                style={[
                    baseStyles[`moodIcon${capitalise(size)}`],
                    baseStyles[mood],
                    styles[size],
                    { tintColor: Colors.largeTextColorDark }
                ]}
            />
        );
    }
}


const styles = StyleSheet.create({
    extraLarge: {
        borderRadius: 25,
    },
    large: {
        borderRadius: 20,
    }
});

export default MoodSelector;
