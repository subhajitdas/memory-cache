'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

class CacheItem {
    constructor(key, value) {
        this._key = key;
        this._value = value;
    }

    get Key() {
        return this._key;
    }
    get Value() {
        return this._value;
    }
    set Value(value) {
        this._value = value;
    }
    get TimeoutCounter() {
        this._timeoutCounter;
    }
    set TimeoutCounter(value) {
        this._timeoutCounter = value;
    }
}

/**
 * Represents an in memory cache collection.
 */
class MemoryCache {
    /**
     * Creates a new in-memory cache collection.
     */
    constructor() {
        this._cacheStore = new Map();
    }
    /**
     * Number of items in cache currently.
     * @returns {Number}
     */
    get Size() {
        return this._cacheStore.size;
    }
    /**
     * Checks if an item exists in cache.
     * @param {*} key The unique key from the item.
     * @returns {boolean}
     */
    contains(key) {
        return this._cacheStore.has(key);
    }
    /**
     * Returns an entry from the cache.
     * @param {*} key A unique identifier for the cache entry to get.
     * @returns {*} A reference to the cache entry that is identified by key, if the entry exists; otherwise, null.
     */
    get(key) {
        let item = this._cacheStore.get(key);
        return item ? item.Value : null;
    }
    /**
     * Inserts a cache entry into the cache. 
     * If the specified entry does not exist in the cache, a new cache entry is inserted. 
     * If the specified entry already exists, its value is updated.
     * @param {*} key A unique identifier for the cache entry.
     * @param {*} value The value to store in the cache.
     * @param {Number} expirationTime Milisecounds after which the cache expires.
     * @param {function} onTimeoutCallback A callback function to notify when the item is removed from cache after timeout. 
     */
    set(key, value, expirationTime, onTimeoutCallback) {
        if (this.contains(key)) {
            this.remove(key);
        }

        let item = new CacheItem(key, value);
        if (!isNaN(expirationTime)) {
            item.TimeoutCounter = setTimeout(() => {
                this.remove(key);
                if (onTimeoutCallback && typeof onTimeoutCallback === 'function') {
                    onTimeoutCallback(key);
                }
            }, expirationTime);
        }
        this._cacheStore.set(key, item);
    }
    /**
     * Removes an item from the cache.
     * @param {*} key The unique identifier for the cache entry.
     */
    remove(key) {
        let item = this._cacheStore.get(key);
        if (item && item.TimeoutCounter) {
            clearTimeout(item.TimeoutCounter);
        }
        this._cacheStore.delete(key);
    }
    /**
     * Removes all items from the cache.
     */
    clear() {
        for (let item of this._cacheStore.values()) {
            if (item.TimeoutCounter) {
                clearTimeout(item.TimeoutCounter);
            }
        }
        this._cacheStore.clear();
    }
}

exports.MemoryCache = MemoryCache;
//# sourceMappingURL=index.js.map