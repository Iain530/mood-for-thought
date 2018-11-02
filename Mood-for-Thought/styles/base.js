import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const moods = Object.keys(Colors.MoodColors);
const coloredMoods = {};
moods.forEach(mood => {
    coloredMoods[mood] = {
        backgroundColor: Colors.MoodColors[mood],
    };
});

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: Colors.basicTextColorDark,
        fontSize: 14,
    },
    textLight: {
        color: Colors.basicTextColorLight,
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    card: {
        flex: 1,
        padding: 10,
        marginTop: 5,
        marginLeft: Layout.sideMargin,
        marginRight: Layout.sideMargin,
        backgroundColor: Colors.basicCardColor,
        borderRadius: Layout.borderRadius,
    },
    moodIconLarge: {
        height: 40,
        width: 40,
        opacity: 0.7,
    },
    ...coloredMoods,
});
