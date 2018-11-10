import { StyleSheet, Platform } from 'react-native';
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
    largeSideMargin: {
        marginLeft: Layout.sideMargin * 2,
        marginRight: Layout.sideMargin * 2,
    },
    fullMargin: {
        marginLeft: Layout.sideMargin,
        marginRight: Layout.sideMargin,
        marginTop: Layout.topBottomMargin,
        marginBottom: Layout.topBottomMargin,
    },
    largeFullMargin: {
        marginLeft: Layout.sideMargin * 2,
        marginRight: Layout.sideMargin * 2,
        marginTop: Layout.topBottomMargin,
        marginBottom: Layout.topBottomMargin,
    },
    headerText: {
        color: Colors.headingTextColor,
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
    dateContainer: {
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
    },
    dateHeader: {
        color: Colors.headingTextColor,
    },
    dateSubHeader: {
        color: Colors.headingTextColor,
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
    shadow: Platform.OS === 'ios' ? {
        shadowColor: Colors.shadowColor,
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.75,
    } : {
        elevation: 4,
    },
    ...coloredMoods,
});
