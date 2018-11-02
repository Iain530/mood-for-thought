import register from './storage-service';
import { createLog, createDay, createSleep } from '../models';
import format from 'dateformat';
import { shiftDate } from '../utils/dates';
import Colors from '../constants/Colors';

const DAY_PREFIX = 'Day';
const DATE_KEY_FORMAT = 'dd/mm/yy';

const storageService = register(DAY_PREFIX);

export const getOrCreate = async (date) => {
    const day = await getDay(date);
    if (day !== null) {
        return day;
    }
    return createDay([], null, null, date);
};

export const getDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    return (await storageService.getData(key));
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
    return (await storageService.setData(key, day));
};

export const removeDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    return (await storageService.removeData(key));
};





export const createFakeData = async (days) => {
    for (let i = 0; i < days; i++) {
        const date = shiftDate(new Date(), -i);
        const logs = createFakeLogs(date);
        const steps = Math.ceil(Math.random() * 12000);
        const sleep = createSleep(Math.floor(Math.random() * 4));
        const day = createDay(logs, steps, sleep, date);
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
