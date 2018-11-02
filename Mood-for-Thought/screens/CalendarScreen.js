import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import baseStyles from '../styles/base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           date: 'date'
        }
     }

    static navigationOptions = {
        title: 'Calendar',
    };

    componentDidMount = () => {
        this.updateDetails(new Date());
    }

    updateDetails = (date) => {
        this.setState({date: date});
        console.log(date);
    }

    render() {
        return (
            <ScrollView style={baseStyles.container}>
              <CalendarList
                horizontal={true}
                pagingEnabled={true}
                hideExtraDays={false}
                firstDay={1}
                disableMonthChange={false}
                onDayPress={(day) => {this.updateDetails(new Date(day.dateString))}}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}

                markingType={'custom'}
                markedDates={{
                  '2018-11-01': {
                    customStyles: {
                      container: {
                        backgroundColor: 'green',
                        borderRadius: 0,
                        width: 64,
                      },
                      text: {
                      },
                    },
                  },
                  '2018-11-08': {
                    customStyles: {
                      container: {
                        backgroundColor: 'green',
                        borderRadius: 0,
                        width: 64,
                      },
                      text: {
                      },
                    },
                  },
                  '2018-11-09': {
                    customStyles: {
                      container: {
                        backgroundColor: 'green',
                        borderRadius: 0,
                        width: 64,
                      },
                      text: {
                      },
                    }
                  }}}
              />
              <View style={styles.getStartedContainer}>
                  <Text style={styles.getStartedText}>{this.state.date.toString()}</Text>
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
