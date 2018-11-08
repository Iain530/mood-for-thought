import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import {
    getDay,
    getAllDays,
} from '../services/day-service';
import baseStyles from '../styles/base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { MoodColors } from '../constants/Colors';


export default class CalendarScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           day: null,
           allDays: []
        }
     }

    static navigationOptions = {
        title: 'Calendar',
    };

    componentDidMount() {
        this.updateDetails(new Date());
        this.getAllDays();
    }

    async getAllDays() {
        this.setState({allDays: await getAllDays()});
    }

    async updateDetails(date) {
        this.setState({day: await getDay(date)});
    }

    mostCommonElement(array) {
      var occurences = {};
      var mc      = array[0],
          mcCount = 1;
      for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if(occurences[el] == null)
            occurences[el] = 1;
        else
            occurences[el]++;
        if(occurences[el] > mcCount) {
          mc = el;
          mcCount = occurences[el];
        }
      }
      return mc;
    }

    render() {
        const day  = this.state.day;
        const allDays = this.state.allDays;
        var date, logs, moods;

        { day ?
          date = day.date :
          date = null
        }

        { day ?
          logs = day.logs :
          logs = null
        }

        { logs ?
          moods = logs.map(log => log.mood) :
          moods = null
        }

        let markedDates = {};
        allDays.forEach((day) => {
          markedDates = {
            ...markedDates,
            [day.date.substring(0,10)]: {
              customStyles: {
                container: {
                  backgroundColor: MoodColors[this.mostCommonElement(day.logs.map((log) => log.mood))],
                  borderRadius: 10,
                  width: 48,
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                },
              },
            }
          };
        });

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
                markedDates={markedDates}
              />
              <View style={styles.getStartedContainer}>
                    { day ?
                      <Text style={styles.getStartedText}>{day.date}</Text> :
                      <Text style={styles.getStartedText}>No data to display for this day.</Text>
                    }
                    { day ?
                      <Text style={styles.getStartedText}>
                        {moods.map(mood => mood.toString())}
                      </Text> :
                      <Text style={styles.getStartedText}>No data to display for this day.</Text>
                    }
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
