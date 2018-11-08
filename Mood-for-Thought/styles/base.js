import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export const light = mood => `${mood}Light`;

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
    sideMargin: {
        marginLeft: Layout.sideMargin,
        marginRight: Layout.sideMargin,
    },
    fullMargin: {
        marginLeft: Layout.sideMargin,
        marginRight: Layout.sideMargin,
        marginTop: Layout.topBottomMargin,
        marginBottom: Layout.topBottomMargin,
    },
    text: {
        color: Colors.basicTextColorDark,
    },
    largeText: {
        color: Colors.largeTextColorDark,
    },
    textLight: {
        color: Colors.basicTextColorLight,
    },
    center: {
        alignItems: 'center',
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    card: {
        padding: 10,
        backgroundColor: Colors.basicCardColor,
        borderRadius: Layout.borderRadius,
    },
    cardNoPad: {
        backgroundColor: Colors.basicCardColor,
        borderRadius: Layout.borderRadius,
    },
    moodIconLarge: {
        height: 40,
        borderRadius: 20,
        width: 40,
    },
    moodIconExtraLarge: {
        height: 50,
        width: 50,
    },
    shadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.75,
    },
    ...coloredMoods,
});
