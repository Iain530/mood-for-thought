import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import base from '../../styles/base';
import ActivitySelector from '../ActivitySelector';
import MoodPercent from './graphs/MoodPercent';
import {
    getAllDays
} from '../../services/day-service.js';


const default_activities = [
    {"name": "Mobile", "icon": "mobile"},
    {"name": "Work", "icon": "breifcase"},
    {"name": "Shopping", "icon": "shopping-cart"},
    {"name": "Reading", "icon": "book"},
    {"name": "Alcohol", "icon": "glass"},
    {"name": "Coffee", "icon": "coffee"},
    {"name": "Sports", "icon": "futbol-o"},
    {"name": "Travel", "icon": "car"},
    {"name": "Sleep", "icon": "bed"},
    {"name": "Gaming", "icon": "gamepad"},   
];


class ActivityList extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            selectedActivity: null,
            allDays: [],
            moodCounter: {}
        }
    }

    componentDidMount() {
        this.getAllData();
        
    }

    async getAllData() {
        const allDays = await getAllDays();
        this.setState({allDays, });
        this.process(allDays, "Work")

    }

    toggleActivity = (name) => {
        this.setState({moodCounter: this.process(this.state.allDays, name)});
        this.setState({selectedActivity: name});

    }

    hasItem(list, item) {
        return list.includes(item);
    }

    process(allDays, activity) {       
        
        const moodCounter = {
            joyful:0,
            content:0,
            angry:0,
            sad:0,
            meh:0
        }

        allDays.forEach(day => {         
            day.logs.forEach(log => {
                
                if (this.hasItem(log.activities, activity)) {
                    moodCounter[log.mood] = moodCounter[log.mood]+1;
                }
            });
        });
            
        return moodCounter
        
    }


    render() {

        return (
            <View>
                {
                    this.state.allDays.length > 0 ?
                    <View>
                        <View style={[
                            styles.logCard,
                            styles.sectionContainer,
                            base.card,
                            base.largeSideMargin,
                        ]}>
                            <ActivitySelector
                                selected={default_activities}
                                onPress={this.toggleActivity}
                            />
                        </View>

                        {
                            this.state.selectedActivity != null ?
                            <MoodPercent 
                                moodCounter={this.state.moodCounter}
                                activity={this.state.selectedActivity}
                            />
                            : null
                        }
                         
                    </View>
                    : <View><ActivityIndicator style={{paddingTop:20}} size="large" color="#0000ff" /></View>
                    
                }

            </View>
        );
    }
}


const styles = StyleSheet.create({
    sectionContainer: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    logCard: {
        marginTop: 5,
    }
});


export default ActivityList;