const activities = [{
    name: 'Mobile',
    icon: 'mobile'
},
{
    name: 'Work',
    icon: 'briefcase'
},
{
    name: 'Shopping',
    icon: 'shopping-cart'
},
{
    name: 'Reading',
    icon: 'book'
},
{
    name: 'Alcohol',
    icon: 'glass',
    displayName: 'Drinking',
},
{
    name: 'Coffee',
    icon: 'coffee'
},
{
    name: 'Sports',
    icon: 'futbol-o'
},
{
    name: 'Travel',
    icon: 'car',
    displayName: 'Travelling'
},
{
    name: 'Sleep',
    icon: 'bed',
    displayName: 'Sleeping'
},
{
    name: 'Gaming',
    icon: 'gamepad'
},
];

const nameKeys = {};
activities.forEach(activity => {
    nameKeys[activity.name] = activity;
});


export const getActivityByName = name => nameKeys[name];
export default activities;
