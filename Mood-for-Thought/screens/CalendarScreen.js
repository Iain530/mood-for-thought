import React from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native';
import {
    getDay,
    getAllDays,
} from '../services/day-service';
import baseStyles from '../styles/base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors';
import { Svg } from 'expo';
import format from 'dateformat';

const MoodColors = Colors.MoodColors;

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

    getTimelineMarkerWidth() {
      console.log("width:", (Dimensions.get('window').width - 50) / (24 * 60));
      return (Dimensions.get('window').width - 50) / (24 * 60);
    }

    getTimelineMarkerPosition(time) {
      var hours = parseInt(time.split(':')[0]);
      var mins = parseInt(time.split(':')[1]);

      var markerWidth = this.getTimelineMarkerWidth();

      console.log(time, hours, mins);
      console.log((hours * 60 + mins) * markerWidth);
      return Math.floor(15 + (hours * 60 + mins) * markerWidth);
    }

    getDaySteps() {
      return this.state.day ? this.state.day.steps : 0;
    }

    getDaySleep() {
      return this.state.day ? this.state.day.steps : 0;
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
          let dateString = format(day.date, 'yyyy-mm-dd');
          markedDates = {
            ...markedDates,
            [dateString]: {
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

        var markedTimes = {};

        if (day) {
          day.logs.forEach((log) => {
            let timeString = format(log.time, 'HH:MM');
            markedTimes = {
              ...markedTimes,
              [timeString]: {
                color: MoodColors[log.mood]
              }
            }
          });
        }

        console.log(markedTimes);

        const moodTimelineWidth = Dimensions.get('window').width - 35;
        const moodTimelineHeight = 50;

        return (
          <ScrollView>
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
            </ScrollView>

            <View style={{padding: 10}}>
              <Text>Log Timeline</Text>

              <Svg height={75} width={moodTimelineWidth}>

              // timeline background
              <Svg.Rect
                x={15}
                y={15}
                width={moodTimelineWidth}
                height={moodTimelineHeight}
                fill={"#fff"}
              />

              // scale markings on timeline
              <Svg.Rect
                key={"scaleMarker6"}
                x={this.getTimelineMarkerPosition("06:00")}
                y={15}
                width={1}
                height={moodTimelineHeight}
                fill={'lightgrey'}
              />
              <Svg.Rect
                key={"scaleMarker12"}
                x={this.getTimelineMarkerPosition("12:00")}
                y={15}
                width={1}
                height={moodTimelineHeight}
                fill={'lightgrey'}
              />
              <Svg.Rect
                key={"scaleMarker18"}
                x={this.getTimelineMarkerPosition("18:00")}
                y={15}
                width={1}
                height={moodTimelineHeight}
                fill={'lightgrey'}
              />

              // log markings on timeline
              {
                Object.entries(markedTimes).reverse().map(([key, value]) => (
                  <Svg.Rect
                    key={key}
                    x={this.getTimelineMarkerPosition(key)}
                    y={10}
                    width={5}
                    height={moodTimelineHeight + 10}
                    fill={value.color}
                  />
                ))
              }
              </Svg>

              <View style={{flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'}}>
                <Text style={{color: 'grey'}}>00:00</Text>
                <Text style={{color: 'grey'}}>06:00</Text>
                <Text style={{color: 'grey'}}>12:00</Text>
                <Text style={{color: 'grey'}}>18:00</Text>
                <Text style={{color: 'grey'}}>00:00</Text>
              </View>

              <Text>You walked {this.getDaySteps()} steps and slept for {this.getDaySleep()} hours on this day.</Text>
            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
