import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import DayView from './DayView';

class DayList extends React.Component {
    render() {
        return (
            <View style={styles.daysListContainer}>
                <FlatList
                    data={this.props.days}
                    renderItem={({item}) => <DayView day={item} fetchDay={this.props.fetchDay} />}
                    keyExtractor = {(item) => item.date.toString()}
                />
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
