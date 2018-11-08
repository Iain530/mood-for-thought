import { AsyncStorage } from 'react-native';
import AsyncLock from 'async-lock';

const lock = new AsyncLock();

/*
Service to get and retreive data from AsyncStorage using
an AsyncLock. Data is converted to json when stored

keys should have the format '@{keyname}:' to guarantee no
key is a prefix of another
*/
const storageService = (prefix) => ({
    /*
    Save data as json under the given key
    Returns true on success or false on error
    */
    async setData(key, data) {
        const prefixedKey = prefix + key;
        const success = await lock.acquire(prefixedKey, async () => {
            try {
                await AsyncStorage.setItem(prefixedKey, JSON.stringify(data));
                return true;
            } catch (err) {
                console.log(err); // eslint-disable-line no-console
            }
            return false;
        });
        return success;
    },

    /*
    Restore json data from given key
    Returns data object if successful otherwise
    null if key doesn't exist
    */
    async getData(key) {
        const prefixedKey = prefix + key;
        const data = await lock.acquire(prefixedKey, async () => {
            try {
                const data = await AsyncStorage.getItem(prefixedKey);
                if (data !== null) {
                    return JSON.parse(data);
                }
            } catch (err) {
                console.log(err); // eslint-disable-line no-console
            }
            return null;
        });
        return data;
    },

    /*
    Get an array of key value objects
    */
    async getMultiData(keyArray) {
        const prefixedArray = keyArray.map(key => prefix + key);
        const data = await lock.acquire(prefixedArray, async () => {
            try {
                const data = await AsyncStorage.multiGet(prefixedArray);
                if (data !== null) {
                    const result = {};
                    data.forEach(kv => {
                        result[kv[0]] = JSON.parse(kv[1]);
                    });
                    return result;
                }
            } catch (err) {
                console.log(err); // eslint-disable-line no-console
            }
            return [];
        });
        return data;
    },

    /*
    Get an array containing all keys with your prefix
    */
    async getAllKeys() {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            if (allKeys !== null) {
                return allKeys.filter(key => key.startsWith(prefix)).map(key => key.slice(prefix.length));
            }
        } catch (err) {
            console.log(err); // eslint-disable-line no-console
        }
        return [];
    },

    /*
    Delete the given key form storage
    */
    async removeData(key) {
        const prefixedKey = prefix + key;
        const success = await lock.acquire(prefixedKey, async () => {
            try {
                await AsyncStorage.removeItem(prefixedKey);
                return true;
            } catch (err) {
                console.log(err); // eslint-disable-line no-console
            }
            return false;
        });
        return success;
    },

    /*
    Get next id available for your prefix
    */
    async getNextId() {
        const idKey = prefix.slice(0, -1) + 'Ids:';
        const id = await lock.acquire(idKey, async () => {
            let id = await this.getData(idKey);
            if (typeof id === 'number') {
                id++;
                if (await this.setData(idKey, id)) {
                    return id;
                }
            } else if (id === null) {
                if (await this.setData(idKey, 0)) {
                    return 0;
                }
            }
            return null;
        });
        return id;
    }
});


const registered = [];

const register = (prefix) => {
    const formatted = '@' + prefix + ':';
    if (registered.indexOf(formatted) !== -1) {
        throw new Error('prefix already registered');
    }
    registered.push(formatted);
    return storageService(formatted);
};

export default register;
