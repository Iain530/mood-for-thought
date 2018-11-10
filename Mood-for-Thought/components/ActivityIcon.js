import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import baseStyles from '../styles/base';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const SIZES = {
    extraLarge: 40,
    large: 30,
    small: 25,
};

class MoodSelector extends React.Component {
    render() {
        const { size, shadow } = this.props;
        return (
            <View style={[
                styles[size],
                baseStyles.center,
                shadow ? baseStyles.shadow : null,
            ]}>
                <FontAwesome name={this.props.icon} size={SIZES[size]} color={this.props.color} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    extraLarge: {
        height: 50,
        width: 50,
    },
    large: {
        height: 40,
        width: 40,
    },
    small: {
        height: 32,
        width: 32,
    },
});

export default MoodSelector;
