const tintColor = '#404040';
const backgroundColor = '#eee';

const headingTextColor = '#666';
const basicCardColor = '#d9d9d9';
const lighterTextColorDark = '#555';
const basicTextColorDark = '#444';
const largeTextColorDark = '#333';
const basicTextColorLight = '#eee';
const shadowColor = '#9c9c9c';
const floatingButtonColor = '#626262';

const activitySelectedColor = '#e08447';
const activitySelectedHighlight = '#ecd6b9';

const MoodColors = {
    angry: '#d9664b',
    joyful: '#e3d680',
    content: '#73b877',
    sad: '#6ea8c8',
    meh: '#bd87dd',
};

const opacity = 0.3;
const MoodColorsTransparent = {
    angry: `rgba(217, 102, 75, ${opacity})`,
    joyful: `rgba(227, 214, 128, ${opacity})`,
    content: `rgba(115, 184, 119, ${opacity})`,
    sad: `rgba(110, 168, 200, ${opacity})`,
    meh: `rgba(189, 135, 221, ${opacity})`,
};

export default {
    backgroundColor,
    activitySelectedColor,
    activitySelectedHighlight,
    basicTextColorDark,
    basicTextColorLight,
    largeTextColorDark,
    lighterTextColorDark,
    floatingButtonColor,
    MoodColors,
    MoodColorsTransparent,
    tintColor,
    headingTextColor,
    basicCardColor,
    shadowColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
};
