import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import DayView from './DayView';

class DayList extends React.Component {
    render() {
        let i = 0;
        const daysList = this.props.days.map(day => (
            <DayView key={i++} day={day} />
        ));
        return (
            <View style={styles.daysListContainer}>
                {daysList}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    daysListContainer: {
        paddingBottom: 30,
    },
});


export default DayList;
