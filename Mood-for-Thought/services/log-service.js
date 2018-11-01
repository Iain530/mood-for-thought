import register from './storage-service';

const LOG_PREFIX = 'Log';
const storageService = register(LOG_PREFIX);

const logService = {
    async getLog(id) {
        return (await storageService.getData(id));
    },

    async getLogs(ids) {
        const notes = await storageService.getMultiData(ids);
        return notes.map(obj => obj.val);
    },

    async getAllLogs() {
        const noteKeys = await storageService.getAllKeys();
        const notes = await storageService.getMultiData(noteKeys);
        return notes.map(obj => obj.val);
    },

    async saveLog(id, data) {
        return (await storageService.setData(id, data));
    },

    async removeLog(id) {
        return (await storageService.removeData(id));
    },

    async getNextId() {
        const id = await storageService.getNextId();
        if (!id || typeof id !== 'number') {
            throw new Error(`Failed to get next id from key: ${LOG_PREFIX}`);
        }
        return id;
    },
};

export default logService;
