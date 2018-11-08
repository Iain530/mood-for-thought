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

                    styles.moodOption,
                ]}>
                    <Image
                        source={Assets.MoodIcons[mood]}
                        style={[
                            baseStyles.moodIconExtraLarge,
                            baseStyles[mood],
                            styles.moodIcon,
                        ]}
                    />
                    <H3 style={baseStyles.text}>{capitalise(mood)}</H3>
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
    moodOption: {
        width: 72,
        paddingTop: 3,
        borderRadius: 20,
        paddingBottom: 2,
    },
    moodIcon: {
        borderRadius: 25,
        marginBottom: 4,
    },
});

export default MoodSelector;
