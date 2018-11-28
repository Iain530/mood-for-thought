import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    H1,
    H2,
} from 'native-base';
import {
    VictoryStack,
    VictoryBar
} from 'victory-native';
import Colors from '../../../constants/Colors';
import baseStyles from '../../../styles/base';


class MoodPercent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labels:[],
            total: 0
        }
    }

    componentDidMount(){
        this.setState({total: Object.values(this.props.moodCounter).reduce((a,b) => a+b, 0)})
    }

    // anger joy content sad meh

    createLabels() {
        const labels = [];
    }


    
// width 800 too much
    render() {Text

        return(
            <View style={[
                baseStyles.card,
                baseStyles.largeSideMargin,
                baseStyles.shadow,
                baseStyles.center
            ]}>
                <VictoryStack
                    colorScale={Object.values(Colors.MoodColors)}
                    horizontal
                    responsive={true}
                    width={670}
                    height={100}

                >
                {
                    moods.map((mood, i) => (
                        (this.props.moodCounter[mood] > 0) ? 
                            <VictoryBar
                                key={i}
                                data={[{x: mood.charAt(0).toUpperCase()+mood.slice(1), y: this.props.moodCounter[mood]}]}
                                barRatio={7}
                                range={this.state.total}
                            />
                            : null
                    ))
                }
                </VictoryStack>
                <View style={[]}>
                    {
                        moods.map((mood, i) => (
                            (this.props.moodCounter[mood] > 0) ? 
                                <View style={[styles.percent]} key={i}>
                                    <H2 >{mood.charAt(0).toUpperCase()+mood.slice(1)}</H2>
                                    <H2>{Math.round((this.props.moodCounter[mood]/this.state.total)*100)}%</H2>
                                </View>
                                : null
                        ))
                    }
                </View>

            </View>
        );
    }

}

const moods = ["angry", "joyful", "content", "sad", "meh"];

const styles = StyleSheet.create({
    percent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    // cardContainer: {
    //     padding: 
    // }
});

export default MoodPercent;