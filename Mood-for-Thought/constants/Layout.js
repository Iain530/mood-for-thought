import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const sideMargin = width / 50;
const borderRadius = 10;

export default {
    sideMargin,
    borderRadius,
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
};
