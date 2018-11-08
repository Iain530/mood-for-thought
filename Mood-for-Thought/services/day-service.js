import register from './storage-service';
import { createLog, createDay } from '../models';
import format from 'dateformat';
import { shiftDate, atMidnight } from '../utils/dates';
import Colors from '../constants/Colors';

const DAY_PREFIX = 'Day';
const DATE_KEY_FORMAT = 'dd/mm/yy';

const storageService = register(DAY_PREFIX);

export const getOrCreate = async (date) => {
    const day = await getDay(date);
    if (day !== null) {
        return day;
    }
    return createDay(date);
};

export const getDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    return storageService.getData(key);
};

export const getDays = async (dates) => {
    const dateKeys = dates.map(date => format(date, DATE_KEY_FORMAT));
    return storageService.getMultiData(dateKeys);
};

export const getAllDays = async () => {
    const dayKeys = await storageService.getAllKeys();
    return Object.values(await storageService.getMultiData(dayKeys));
};

export const saveDay = async (day) => {
    const key = format(day.date, DATE_KEY_FORMAT);
    return storageService.setData(key, day);
};

export const removeDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    return storageService.removeData(key);
};





export const createFakeData = async (days) => {
    for (let i = 0; i < days; i++) {
        const date = shiftDate(atMidnight(new Date()), -i);
        const day = await createDay(date);
        day.sleep.quality = Math.floor(Math.random() * 4);
        const logs = createFakeLogs(date);
        day.logs = logs;
        await saveDay(day);
    }
};


const emotions = Object.keys(Colors.MoodColors);

const createFakeLogs = (date) => {
    const numLogs = Math.ceil(Math.random() * 3);
    const logs = [];
    for (let i = 0; i < numLogs; i++) {
        logs.push(createLog(emotions[Math.floor(Math.random() * 5)], [], date));
    }
    return logs;
};
