import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import baseStyles from '../styles/base';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const SIZES = {
    extraLarge: 40,
    large: 30,
    small: 25,
    extraSmall: 15,
};

class ActivityIcon extends React.Component {
    render() {
        const { size, shadow, icon, color } = this.props;
        return (
            <View key={icon} style={[
                styles[size],
                baseStyles.center,
                styles.center,
                shadow ? baseStyles.shadow : null,
            ]}>
                <FontAwesome key={icon} name={icon} size={SIZES[size]} color={color ? color : Colors.basicTextColorDark} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    extraLarge: {
        height: 50,
        width: 50,
    },
    center: {
        justifyContent: 'center',
    },
    large: {
        height: 40,
        width: 40,
    },
    small: {
        height: 32,
        width: 32,
    },
    extraSmall: {
        height: 20,
        width: 20,
    },
});

export default ActivityIcon;
