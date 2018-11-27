import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import {
    getDay,
    getAllDays,
} from '../services/day-service';
import baseStyles from '../styles/base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { MoodColors } from '../constants/Colors';
import { Svg } from 'expo';

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
          let mostCommonMood = this.mostCommonElement(day.logs.map((log) => log.mood));
          markedDates = {
            ...markedDates,
            [day.date.substring(0,10)]: {
              customStyles: {
                container: {
                  backgroundColor: MoodColors[mostCommonMood],
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

        const moodTimelineWidth = Dimensions.get('window').width;

        var mostCommonMood;
        var moodTimelineColor;

        // console.log(day);

        { day ?
          mostCommonMood = this.mostCommonElement(day.logs.map((log) => log.mood)) :
          mostCommonMood = null
        }

        { mostCommonMood ?
          moodTimelineColor = MoodColors[mostCommonMood] :
          moodTimelineColor = "#fff"
        }

        // console.log(moodTimelineColor);

        let markedTimes = {};

        if (day) {
          day.logs.forEach((log) => {
            markedTimes = {
              ...markedTimes,
              [log.time.substring(11,16)]: {
                color: MoodColors[log.mood]
              }
            };
          });
          console.log(day.logs);
        }

        console.log(markedTimes);

        return (
            <ScrollView style={baseStyles.container}>
              <CalendarList
                horizontal={true}
                pagingEnabled={true}
                hideExtraDays={false}
                firstDay={1}
                disableMonthChange={false}
                onDayPress={(day) => {this.updateDetails(new Date(day.dateString))}}
                scrollEnabled={true}

                markingType={'custom'}
                markedDates={markedDates}
              />
              <Svg height={100} width={moodTimelineWidth}>
                <Svg.Rect
                  x={15}
                  y={15}
                  width={moodTimelineWidth - 30}
                  height={50}
                  fill={moodTimelineColor}
                />
              </Svg>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
