import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { H1, H2, H3, Text } from 'native-base';
import MoodIcon from '../MoodIcon';
import baseStyles from '../../styles/base';
import { saveLog } from '../../services/log-service';
import { capitalise } from '../../utils/strings';
import Assets from '../../constants/Assets';
import Colors from '../../constants/Colors';

const MOODS = Object.keys(Colors.MoodColors);


class MoodSelector extends React.Component {
    renderMoods() {
        return MOODS.map(mood => (
            <TouchableOpacity
                onPress={() => this.props.onPress(mood)}
                key={mood}
            >
                <View style={[
                    baseStyles.center,
                ]}>
                    <MoodIcon
                        mood={mood}
                        size="extraLarge"
                    />
                    <Text style={[baseStyles.text, styles.moodName]}>{capitalise(mood)}</Text>
                </View>
            </TouchableOpacity>
        ));
    }

    render() {
        return (
            <View style={[
                baseStyles.horizontalContainer,
                styles.moodSelector,
            ]}>
                {this.renderMoods()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    moodSelector: {
        justifyContent: 'space-around',
    },
    moodName: {
        marginTop: 5,
    },
});

export default MoodSelector;
