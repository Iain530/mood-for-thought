import register from './storage-service';
import { getLogs, newLog, saveLog } from './log-service';
import stepService from './step-service';
import {
    createDay
} from '../models';
import format from 'dateformat';
import {
    shiftDate,
    atMidnight,
    sortByDate,
} from '../utils/dates';
import Colors from '../constants/Colors';

const DAY_PREFIX = 'Day';
const DATE_KEY_FORMAT = 'dd/mm/yy';

const storageService = register(DAY_PREFIX);


const restoreDay = async (day) => {
    if (day !== null) {
        day.date = new Date(day.date);
        day.logs = await getLogs(day.logs);
    }
    return day;
};


export const getOrCreate = async (date) => {
    const day = await getDay(date);
    if (day !== null) {
        return day;
    }
    return createDay(date);
};

export const getDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    const day = await storageService.getData(key);
    return restoreDay(day);
};

export const getDays = async (dates) => {
    const dateKeys = dates.map(date => format(date, DATE_KEY_FORMAT));
    const loadingDays = Object.values(await storageService.getMultiData(dateKeys)).map(
        day => restoreDay(day)
    );
    const days = await Promise.all(loadingDays);
    days.sort(sortByDate('date'));
    return days;
};

export const getAllDays = async () => {
    const dayKeys = await storageService.getAllKeys();
    const loadingDays = Object.values(await storageService.getMultiData(dayKeys)).map(
        day => restoreDay(day)
    );
    const days = await Promise.all(loadingDays);
    days.sort(sortByDate('date'));
    return days;
};

export const saveDay = async (day) => {
    const key = format(day.date, DATE_KEY_FORMAT);
    day.logs.sort(sortByDate('time', true))
    day.logs = day.logs.map(log => (
        log.id
    ));
    const steps = await stepService.getStepsForDate(day.date);
    if (steps > day.steps) {
        day.steps = steps;
    }
    return storageService.setData(key, day);
};

export const removeDay = async (date) => {
    const key = format(date, DATE_KEY_FORMAT);
    return storageService.removeData(key);
};



export const createFakeData = async (days) => {
    for (let i = 1; i < days; i++) {
        const date = shiftDate(atMidnight(new Date()), -i);
        const day = await createDay(date);
        day.sleep.quality = Math.floor(Math.random() * 4);
        await saveDay(day);
        await createFakeLogs(date);
    }
};


const emotions = Object.keys(Colors.MoodColors);

const createFakeLogs = async (date) => {
    const numLogs = Math.ceil(Math.random() * 3);
    for (let i = 0; i < numLogs; i++) {
        const log = await newLog(date);
        log.mood = emotions[Math.floor(Math.random() * 5)];
        await saveLog(log);
    }
};
