# memory-cache
A simple in memory cache.

#Current Version
1.0.0

#Install

#### [npm](https://www.npmjs.com/package/cache-in-memory)
```
npm install cache-in-memory
```

#Usage
``` javascript
import {MemoryCache} from 'cache-in-memory';

let cache = new MemoryCache();
cache.set('key1', 'value1');
cache.set('key2', 'value2', 1000);
cache.set('key3', 'value3', 2000, function(key) {
    console.log(`Removed entry for ${key}`);
});

console.log(`Size: ${cache.Size}`);
let value1 = cache.get('key1');
console.log(`Value 1: ${value1}`);
setTimeout(function(){
    let value2 = cache.get('key2');
    console.log(`Value 2: ${value2}`);
}, 1050);
cache.remove('key1');
cache.clear();
```

#API
##Constructor
Creates a new in-memory cache collection. 
``` javascript
new MemoryCache();
```
##Members
### Size
Number of items in cache currently. 
##Methods
###set(key, value, expirationTime, onTimeoutCallback)
Inserts a cache entry into the cache. If the specified entry does not exist in the cache, a new cache entry is inserted. If the specified entry already exists, its value is updated. 

####Parameters
|Name|Type|Description| 
|:---|:---|:---|
|key|any|A unique identifier for the cache entry.|
|value|any|The value to store in the cache.|
|expirationTime|Number|Milisecounds after which the cache expires.|
|onTimeoutCallback|function|A callback function to notify when the item is removed from cache after timeout.|

###get(key) → {*}
Returns an entry from the cache. If the entry doesn't exists returns null.

####Parameters
|Name|Type|Description| 
|:---|:---|:---|
|key|any|A unique identifier for the cache entry.

###contains(key) → {boolean}
Checks if an item exists in cache.

####Parameters
|Name|Type|Description| 
|:---|:---|:---|
|key|any|A unique identifier for the cache entry.

###remove(key)
Removes an entry from the cache.

####Parameters
|Name|Type|Description| 
|:---|:---|:---|
|key|any|A unique identifier for the cache entry.

###clear()
Removes all items from the cache.