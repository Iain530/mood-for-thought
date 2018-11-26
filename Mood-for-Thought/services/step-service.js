import {
    Pedometer
} from 'expo';
import {
    shiftDate,
    atMidnight,
    now,
} from '../utils/dates';


const isPedometerAvailable = async () => Pedometer.isAvailableAsync();

const getStepsForDate = async (date) => {
    // if (await isPedometerAvailable()) {
    //     const start = atMidnight(date);
    //     const end = shiftDate(start, 1);
    //     const result = await Pedometer.getStepCountAsync(start, end);
    //     if (result) {
    //         return result.steps;
    //     }
    // }
    return null;
};


const onStepsUpdate = (callback) => {
    return Pedometer.watchStepCount(async () => {
        const today = now();
        const steps = await getStepsForDate(today);
        callback(today, steps);
    });
};


export default {
    isPedometerAvailable,
    getStepsForDate,
    onStepsUpdate,
};
