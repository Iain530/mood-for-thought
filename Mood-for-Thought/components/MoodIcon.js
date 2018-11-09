import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import baseStyles from '../styles/base';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';


class MoodSelector extends React.Component {
    render() {
        const { mood, size, shadow } = this.props;
        return (
            <View style={[
                styles[size],
                baseStyles[mood],
                shadow ? baseStyles.shadow : null,
            ]}>
                <Image
                    source={Assets.MoodIcons[mood]}
                    style={[
                        styles[size],
                        { tintColor: Colors.largeTextColorDark }
                    ]}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    extraLarge: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    large: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
});

export default MoodSelector;
