import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import base from '../../../styles/base';
import {
    VictoryStack,
    VictoryBar
} from 'victory-native';



class MoodPercent extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.moodCounter;
    }

    // anger joy content sad meh

    

    render() {

        return(
            <View>
                <VictoryStack
                    colorScale={["tomato", "orange", "gold"]}
                    horizontal
                >
                <VictoryBar
                    data={[{x: "Anger", y:  this.props.moodCounter.anger }]}
                    barRatio={7}
                />
                <VictoryBar
                    data={[{x: "Joy", y: this.props.moodCounter.joyful}]}
                    barRatio={7}
                />
                <VictoryBar
                    data={[{x: "Content", y: this.props.moodCounter.content}]}
                    barRatio={7}
                />
                <VictoryBar
                    data={[{x: "Sad", y: this.props.moodCounter.sad}]}
                    barRatio={7}
                />
                <VictoryBar
                    data={[{x: "Meh", y: this.props.moodCounter.meh}]}
                    barRatio={7}
                />
                </VictoryStack>
            </View>
        );
    }

}



export default MoodPercent;