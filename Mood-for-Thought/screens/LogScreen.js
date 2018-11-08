import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { H3 } from 'native-base';
import {
    createFakeData,
    getAllDays,
} from '../services/day-service';
import DayList from '../components/DayList';
import MoodIcon from '../components/MoodIcon';
import baseStyles from '../styles/base';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import { capitalise } from '../utils/strings';


export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Mood Log',
    };

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            loading: true,
        };

    }

    componentDidMount() {
        this.fetchDays();
    }

    async fetchDays() {
        // await createFakeData(30);
        const days = await getAllDays();
        this.setState({
            days,
            loading: false,
        });
    }

    renderActionButton(mood) {
        return (
            <View style={baseStyles.horizontalContainer} key={mood}>
                <View style={[
                    baseStyles.card,
                    baseStyles.shadow,
                    baseStyles[mood],
                    baseStyles.sideMargin,
                ]}>
                    <H3 style={baseStyles.text}>{capitalise(mood)}</H3>
                </View>
                <View style={baseStyles.shadow}>
                    <MoodIcon
                        mood={mood}
                        size="extraLarge"
                    />
                </View>
            </View>
        );
    }

    render() {
        let i = 1;
        const actions = Object.keys(Colors.MoodColors).map((mood) => ({
            render: () => this.renderActionButton(mood),
            name: mood,
            position: i++,
        }));

        return (
            <View style={baseStyles.container}>
                <ScrollView style={baseStyles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        <DayList days={this.state.days} />
                    </View>
                </ScrollView>
                <FloatingAction
                    actions={actions}
                    openOnMount={true}
                    onPressItem={
                        (name) => {
                            console.log(`selected button: ${name}`);
                        }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
