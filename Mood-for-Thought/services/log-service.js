import { getOrCreate, saveDay } from './day-service';
import register from './storage-service';
import { createLog } from '../models';

const LOG_PREFIX = 'Log';
const storageService = register(LOG_PREFIX);

const restoreLog = (log) => {
    if (log !== null) {
        log.time = new Date(log.time);
    }
    return log;
};

export const getLog = async (id) => {
    return restoreLog(await storageService.getData(id));
};

export const saveLog = async (log) => {
    const day = await getOrCreate(log.time);
    if (!day.logs.map(saved => saved.id).includes(log.id)) {
        day.logs.push(log);
        await saveDay(day);
    }
    return storageService.setData(log.id, log);
};

export const newLog = async (time) => {
    const id = await storageService.getNextId();
    const log = {
        id,
        ...createLog(time),
    };
    return log;
};

export const getLogs = async (ids) => {
    return Object.values(await storageService.getMultiData(ids)).map(
        log => restoreLog(log)
    );
};
